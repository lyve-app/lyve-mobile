import { formatNumber } from '@utils/formatNumber';
import React from 'react';
import { XStack, YStack, H2, Avatar, Separator, Button, H3, SizableText } from 'tamagui';
import FollowStats from './FollowStats';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { User } from '@api/responses';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  followerCount?: number | undefined;
  followingCount?: number | undefined;
}

const ProfileHeader: React.FC<{ user: User }> = ({ user }) => {
  return (
    <YStack
      height={340}
      backgroundColor="$color.accentDark"
      borderBottomEndRadius="$4"
      borderBottomStartRadius="$4"
      padding="$4">
      <SafeAreaView
        style={{
          height: '100%',
          flexDirection: 'column',
        }}>
        <XStack alignItems="center">
          <Avatar circular size="$7">
            <Avatar.Image
              accessibilityLabel="Nate Wienert"
              src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?&w=100&h=100&dpr=2&q=80"
            />
            <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
          </Avatar>

          <FollowStats followerCount={user?.followerCount} followingCount={user?.followingCount} />
        </XStack>
        <YStack justifyContent="flex-start" gap="$2" maxWidth="90%" paddingVertical="$3">
          <YStack>
            <H3 fontWeight="700">{user?.dispname}</H3>
            <SizableText opacity={0.8}>@{user?.username}</SizableText>
          </YStack>
          <SizableText>{user?.bio.substring(0, 100)}</SizableText>
        </YStack>

        {/* Button component in profile header*/}
        <XStack justifyContent="space-between">
          <Button
            onPress={() => console.log('Edit Profile View')}
            backgroundColor="#A372F9"
            maxWidth="40%"
            borderRadius="$10"
            fontSize={18}>
            Edit Profile
          </Button>

          <Button
            onPress={() => router.push(`/profile/${user.id}/settings`)}
            backgroundColor="#A372F9"
            minWidth="20%"
            borderRadius="$10"
            icon={<Feather name="settings" size={24} color="white" />}
          />
        </XStack>
      </SafeAreaView>
    </YStack>
  );
};

export default ProfileHeader;
