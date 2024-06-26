import { SearchResponse, User } from '@api/responses';
import { usePaginatedSearch } from '@api/search/query/usePaginatedSearch';
import UserSearchResultCard from '@components/search/UserSearchResultCard';
import SearchBar from '@modules/search/SearchBar';
import SearchHistory from '@modules/search/SearchHistory';
import { useSearchHistoryStore } from '@modules/search/stores/useSearchHistoryStore';
import { useSearchQueryStore } from '@modules/search/stores/useSearchQueryStore';
import { FlashList } from '@shopify/flash-list';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard } from 'react-native';
import { XStack, YStack } from 'tamagui';

const SearchPage = () => {
  const [query, setQuery] = useState<string>('');

  const { fetchNextPage, refetch, isRefetching, data, isSuccess, isFetching } = usePaginatedSearch(
    {
      query,
      limit: '20',
    },
    { enabled: !!query }
  );

  const [searchResults, setSearchResults] = useState<NonNullable<SearchResponse['data']>>({
    result: {
      users: [],
    },
    hasNext: false,
    nextCursor: '',
  });

  const handleSearch = async (query: string) => {
    if (useSearchQueryStore.getState().query !== query) {
      useSearchQueryStore.getState().setQuery(query);
    }
    setQuery(query);

    await useSearchHistoryStore.getState().addItem(query);
  };

  useEffect(() => {
    if (data && isSuccess) {
      const newResults = data.pages[0]?.data?.result.users ?? [];
      const lastPage = data.pages[data.pages.length - 1]!.data;
      setSearchResults(() => ({
        result: { users: newResults },
        hasNext: lastPage?.hasNext || false,
        nextCursor: lastPage?.nextCursor || '',
      }));
    }
  }, [data, isSuccess]);

  useFocusEffect(
    useCallback(() => {
      useSearchQueryStore.getState().setQuery('');
    }, [])
  );

  const handleRefresh = () => {
    refetch();
  };

  const renderItem = useCallback(
    ({
      item,
    }: {
      item: Pick<User, 'id' | 'username' | 'dispname' | 'avatar_url' | 'followerCount'> & {
        subscribed: boolean;
      };
    }) => (
      <YStack mb="$5">
        <UserSearchResultCard user={item} />
      </YStack>
    ),
    [searchResults, data]
  );

  const keyExtractor = useCallback(
    (
      item: Pick<User, 'id' | 'username' | 'dispname' | 'avatar_url' | 'followerCount'> & {
        subscribed: boolean;
      }
    ) => item.id,
    [searchResults, data]
  );

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <YStack height="100%" backgroundColor="$color.background" p="$4">
          <XStack paddingBottom="$6">
            <SearchBar onSearch={handleSearch} />
          </XStack>
          <YStack space="$4" flex={1}>
            <SearchHistory onPress={handleSearch} />

            <YStack flex={1} paddingBottom="$10">
              <FlashList
                bounces
                showsVerticalScrollIndicator={false}
                data={searchResults.result.users}
                numColumns={1}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                onEndReached={() => !isFetching && fetchNextPage()}
                onEndReachedThreshold={0.3}
                onRefresh={handleRefresh}
                refreshing={isRefetching}
                estimatedItemSize={100}
              />
            </YStack>
          </YStack>
        </YStack>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SearchPage;
