import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type DynamoDbData = {
  __typename?: 'DynamoDBData';
  createdAt: Scalars['String']['output'];
  pk: Scalars['String']['output'];
  sk: Scalars['String']['output'];
  type: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type DynamoDbInput = {
  createdAt: Scalars['String']['input'];
  pk: Scalars['String']['input'];
  sk: Scalars['String']['input'];
  type: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  sendMessage?: Maybe<DynamoDbData>;
};


export type MutationSendMessageArgs = {
  input: DynamoDbInput;
};

export type Query = {
  __typename?: 'Query';
  listData: Array<DynamoDbData>;
  listTypeData: Array<DynamoDbData>;
};


export type QueryListDataArgs = {
  createdAt: Scalars['String']['input'];
  type: Scalars['String']['input'];
};


export type QueryListTypeDataArgs = {
  pk: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  onChat?: Maybe<DynamoDbData>;
};


export type SubscriptionOnChatArgs = {
  pk: Scalars['String']['input'];
};

export type AllDataFragment = { __typename?: 'DynamoDBData', pk: string, sk: string, value: string, createdAt: string };

export type ListChannelsQueryVariables = Exact<{
  createdAt: Scalars['String']['input'];
}>;


export type ListChannelsQuery = { __typename?: 'Query', listData: Array<{ __typename?: 'DynamoDBData', pk: string, sk: string, value: string, createdAt: string }> };

export type ListChannelChatsQueryVariables = Exact<{
  channelId: Scalars['String']['input'];
}>;


export type ListChannelChatsQuery = { __typename?: 'Query', listTypeData: Array<{ __typename?: 'DynamoDBData', pk: string, sk: string, value: string, createdAt: string }> };

export type SendMessageMutationVariables = Exact<{
  input: DynamoDbInput;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage?: { __typename?: 'DynamoDBData', pk: string, sk: string, value: string, createdAt: string } | null };

export type OnChatSubscriptionVariables = Exact<{
  pk: Scalars['String']['input'];
}>;


export type OnChatSubscription = { __typename?: 'Subscription', onChat?: { __typename?: 'DynamoDBData', pk: string, sk: string, value: string, createdAt: string } | null };

export const AllDataFragmentDoc = gql`
    fragment AllData on DynamoDBData {
  pk
  sk
  value
  createdAt
}
    `;
export const ListChannelsDocument = gql`
    query ListChannels($createdAt: String!) {
  listData(type: "channel", createdAt: $createdAt) {
    ...AllData
  }
}
    ${AllDataFragmentDoc}`;

/**
 * __useListChannelsQuery__
 *
 * To run a query within a React component, call `useListChannelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListChannelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListChannelsQuery({
 *   variables: {
 *      createdAt: // value for 'createdAt'
 *   },
 * });
 */
export function useListChannelsQuery(baseOptions: Apollo.QueryHookOptions<ListChannelsQuery, ListChannelsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListChannelsQuery, ListChannelsQueryVariables>(ListChannelsDocument, options);
      }
export function useListChannelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListChannelsQuery, ListChannelsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListChannelsQuery, ListChannelsQueryVariables>(ListChannelsDocument, options);
        }
export type ListChannelsQueryHookResult = ReturnType<typeof useListChannelsQuery>;
export type ListChannelsLazyQueryHookResult = ReturnType<typeof useListChannelsLazyQuery>;
export type ListChannelsQueryResult = Apollo.QueryResult<ListChannelsQuery, ListChannelsQueryVariables>;
export const ListChannelChatsDocument = gql`
    query ListChannelChats($channelId: String!) {
  listTypeData(pk: $channelId, type: "chat") {
    ...AllData
  }
}
    ${AllDataFragmentDoc}`;

/**
 * __useListChannelChatsQuery__
 *
 * To run a query within a React component, call `useListChannelChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListChannelChatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListChannelChatsQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useListChannelChatsQuery(baseOptions: Apollo.QueryHookOptions<ListChannelChatsQuery, ListChannelChatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListChannelChatsQuery, ListChannelChatsQueryVariables>(ListChannelChatsDocument, options);
      }
export function useListChannelChatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListChannelChatsQuery, ListChannelChatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListChannelChatsQuery, ListChannelChatsQueryVariables>(ListChannelChatsDocument, options);
        }
export type ListChannelChatsQueryHookResult = ReturnType<typeof useListChannelChatsQuery>;
export type ListChannelChatsLazyQueryHookResult = ReturnType<typeof useListChannelChatsLazyQuery>;
export type ListChannelChatsQueryResult = Apollo.QueryResult<ListChannelChatsQuery, ListChannelChatsQueryVariables>;
export const SendMessageDocument = gql`
    mutation SendMessage($input: DynamoDBInput!) {
  sendMessage(input: $input) {
    ...AllData
  }
}
    ${AllDataFragmentDoc}`;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const OnChatDocument = gql`
    subscription OnChat($pk: String!) {
  onChat(pk: $pk) {
    ...AllData
  }
}
    ${AllDataFragmentDoc}`;

/**
 * __useOnChatSubscription__
 *
 * To run a query within a React component, call `useOnChatSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnChatSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnChatSubscription({
 *   variables: {
 *      pk: // value for 'pk'
 *   },
 * });
 */
export function useOnChatSubscription(baseOptions: Apollo.SubscriptionHookOptions<OnChatSubscription, OnChatSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnChatSubscription, OnChatSubscriptionVariables>(OnChatDocument, options);
      }
export type OnChatSubscriptionHookResult = ReturnType<typeof useOnChatSubscription>;
export type OnChatSubscriptionResult = Apollo.SubscriptionResult<OnChatSubscription>;