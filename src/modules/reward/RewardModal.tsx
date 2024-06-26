import RewardItem from '@components/reward/RewardItem';
import { rewardMap } from '@modules/reward/rewardMap';
import { useRewardModalStore } from '@modules/reward/stores/useRewardModalStore';
import { RewardType } from '@modules/reward/types';
import useSocket from '@modules/ws/useSocket';
import React from 'react';
import { ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import { XStack, YStack } from 'tamagui';

const RewardModal: React.FC = () => {
  const { socket } = useSocket();
  const { visible } = useRewardModalStore((state) => ({ visible: state.visible }));

  const close = () => {
    useRewardModalStore.getState().close();
  };

  const handlePress = (type: RewardType) => {
    if (socket) {
      close();
      console.log(type);
      socket.emit('send_reward', { msg: '', reward: { type } }, (ack) => {
        if (ack) {
          if (ack.success) {
            Toast.show({
              type: 'success',
              text1: 'Your reward was sent successfully!',
              text2: 'Want to send another?',
            });
          } else {
            if (ack.error[0])
              Toast.show({
                type: 'error',
                text1: ack.error[0].name,
                text2: ack.error[0].msg,
              });
          }
        }
      });
    }
  };

  return (
    <Modal
      isVisible={visible}
      backdropOpacity={0}
      onBackdropPress={close}
      propagateSwipe
      swipeDirection={['down']}
      onSwipeComplete={close}
      style={{ flex: 1, margin: 0, justifyContent: 'flex-end' }}>
      <YStack
        borderTopStartRadius="$5"
        borderTopEndRadius="$5"
        backgroundColor="$primaryDark"
        height="40%"
        alignItems="center"
        justifyContent="center">
        <XStack
          width="$14"
          height="$0.5"
          backgroundColor="$textWashedOut"
          borderRadius="$12"
          marginVertical="$3"
        />

        <ScrollView style={{ flex: 1, width: '100%' }} bounces>
          <XStack
            flexWrap="wrap"
            justifyContent="space-evenly"
            paddingHorizontal="$5"
            paddingTop="$4"
            rowGap="$4"
            columnGap="$0.25">
            {Object.entries(rewardMap).map(([key, value]) => {
              return (
                <RewardItem
                  onPress={() => {
                    handlePress(key as RewardType);
                  }}
                  key={key}
                  uri={value.asset}
                  coins={value.cost}
                />
              );
            })}
          </XStack>
        </ScrollView>
      </YStack>
    </Modal>
  );
};

export default RewardModal;
