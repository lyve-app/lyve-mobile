import { View, Text } from 'react-native';
import React from 'react';
import { YStack, XStack, H1, Button, H2 } from 'tamagui';
import { Feather } from '@expo/vector-icons';

const SettingsPage: React.FC<{ userid: string }> = ({ userid }) => {
  return (
    <View>
      <YStack height="100%" padding="$4">
        <XStack alignItems="center">
          <Button
            icon={<Feather name="chevron-left" size={24} color="white" />}
            backgroundColor="black"></Button>
          <H1 fontSize={32}>Settings</H1>
        </XStack>

        <H2 mt="$10" fontSize={24} mb="$3">
          Account
        </H2>
        <YStack height="20%" borderRadius={30} backgroundColor="green"></YStack>
      </YStack>
    </View>
  );
};

export default SettingsPage;
