import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import React from 'react';
import useAuth from '@modules/auth/useAuth';
import { useGetNotifications } from '@api/user/query/useGetNotifications';
import { H1, SizableText, YStack } from 'tamagui';
import { GetNotificationsResponse, Notification } from '@api/responses';
import NotificationCard from '@components/notification/NotificationCard';

const EditProfilePage = () => {
  const { user } = useAuth();



  return (
    <YStack padding="$4" height="100%">
      <H1 marginVertical="$4" fontSize={24} fontWeight="800">
        Edit Profile
      </H1>

      <ScrollView bounces>
        <YStack space="$3">

        </YStack>
      </ScrollView>
    </YStack>
  );
};

export default EditProfilePage;