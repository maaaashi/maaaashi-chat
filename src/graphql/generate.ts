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
  createChannel?: Maybe<DynamoDbData>;
  deleteChannel?: Maybe<DynamoDbData>;
  putProfile?: Maybe<DynamoDbData>;
  sendMessage?: Maybe<DynamoDbData>;
  updateChannel?: Maybe<DynamoDbData>;
};


export type MutationCreateChannelArgs = {
  input: DynamoDbInput;
};


export type MutationDeleteChannelArgs = {
  pk: Scalars['String']['input'];
  sk: Scalars['String']['input'];
};


export type MutationPutProfileArgs = {
  input: DynamoDbInput;
};


export type MutationSendMessageArgs = {
  input: DynamoDbInput;
};


export type MutationUpdateChannelArgs = {
  input: DynamoDbInput;
};

export type Query = {
  __typename?: 'Query';
  createUploadUrl: Scalars['String']['output'];
  getProfile?: Maybe<DynamoDbData>;
  listData: Array<DynamoDbData>;
  listTypeData: Array<DynamoDbData>;
};


export type QueryCreateUploadUrlArgs = {
  filename: Scalars['String']['input'];
};


export type QueryGetProfileArgs = {
  pk: Scalars['String']['input'];
  type: Scalars['String']['input'];
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
  onCreateChannel?: Maybe<DynamoDbData>;
  onDeleteChannel?: Maybe<DynamoDbData>;
  onUpdateChannel?: Maybe<DynamoDbData>;
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

export type CreateChannelMutationVariables = Exact<{
  input: DynamoDbInput;
}>;


export type CreateChannelMutation = { __typename?: 'Mutation', createChannel?: { __typename?: 'DynamoDBData', pk: string, sk: string, value: string, createdAt: string } | null };

export type UpdateChannelMutationVariables = Exact<{
  input: DynamoDbInput;
}>;


export type UpdateChannelMutation = { __typename?: 'Mutation', updateChannel?: { __typename?: 'DynamoDBData', pk: string, sk: string, value: string, createdAt: string } | null };

export type DeleteChannelMutationVariables = Exact<{
  pk: Scalars['String']['input'];
  sk: Scalars['String']['input'];
}>;


export type DeleteChannelMutation = { __typename?: 'Mutation', deleteChannel?: { __typename?: 'DynamoDBData', pk: string, sk: string, value: string, createdAt: string } | null };

export type OnCreateChannelSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnCreateChannelSubscription = { __typename?: 'Subscription', onCreateChannel?: { __typename?: 'DynamoDBData', pk: string, sk: string, value: string, createdAt: string } | null };

export type OnUpdateChannelSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnUpdateChannelSubscription = { __typename?: 'Subscription', onUpdateChannel?: { __typename?: 'DynamoDBData', pk: string, sk: string, value: string, createdAt: string } | null };

export type OnDeleteChannelSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnDeleteChannelSubscription = { __typename?: 'Subscription', onDeleteChannel?: { __typename?: 'DynamoDBData', pk: string, sk: string, value: string, createdAt: string } | null };

export type PutProfileMutationVariables = Exact<{
  input: DynamoDbInput;
}>;


export type PutProfileMutation = { __typename?: 'Mutation', putProfile?: { __typename?: 'DynamoDBData', pk: string, sk: string, value: string, createdAt: string } | null };

export type GetProfileQueryVariables = Exact<{
  pk: Scalars['String']['input'];
}>;


export type GetProfileQuery = { __typename?: 'Query', getProfile?: { __typename?: 'DynamoDBData', pk: string, sk: string, value: string, createdAt: string } | null };

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
export const CreateChannelDocument = gql`
    mutation CreateChannel($input: DynamoDBInput!) {
  createChannel(input: $input) {
    ...AllData
  }
}
    ${AllDataFragmentDoc}`;
export type CreateChannelMutationFn = Apollo.MutationFunction<CreateChannelMutation, CreateChannelMutationVariables>;

/**
 * __useCreateChannelMutation__
 *
 * To run a mutation, you first call `useCreateChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChannelMutation, { data, loading, error }] = useCreateChannelMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateChannelMutation(baseOptions?: Apollo.MutationHookOptions<CreateChannelMutation, CreateChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChannelMutation, CreateChannelMutationVariables>(CreateChannelDocument, options);
      }
export type CreateChannelMutationHookResult = ReturnType<typeof useCreateChannelMutation>;
export type CreateChannelMutationResult = Apollo.MutationResult<CreateChannelMutation>;
export type CreateChannelMutationOptions = Apollo.BaseMutationOptions<CreateChannelMutation, CreateChannelMutationVariables>;
export const UpdateChannelDocument = gql`
    mutation UpdateChannel($input: DynamoDBInput!) {
  updateChannel(input: $input) {
    ...AllData
  }
}
    ${AllDataFragmentDoc}`;
export type UpdateChannelMutationFn = Apollo.MutationFunction<UpdateChannelMutation, UpdateChannelMutationVariables>;

/**
 * __useUpdateChannelMutation__
 *
 * To run a mutation, you first call `useUpdateChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChannelMutation, { data, loading, error }] = useUpdateChannelMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateChannelMutation(baseOptions?: Apollo.MutationHookOptions<UpdateChannelMutation, UpdateChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateChannelMutation, UpdateChannelMutationVariables>(UpdateChannelDocument, options);
      }
export type UpdateChannelMutationHookResult = ReturnType<typeof useUpdateChannelMutation>;
export type UpdateChannelMutationResult = Apollo.MutationResult<UpdateChannelMutation>;
export type UpdateChannelMutationOptions = Apollo.BaseMutationOptions<UpdateChannelMutation, UpdateChannelMutationVariables>;
export const DeleteChannelDocument = gql`
    mutation DeleteChannel($pk: String!, $sk: String!) {
  deleteChannel(pk: $pk, sk: $sk) {
    ...AllData
  }
}
    ${AllDataFragmentDoc}`;
export type DeleteChannelMutationFn = Apollo.MutationFunction<DeleteChannelMutation, DeleteChannelMutationVariables>;

/**
 * __useDeleteChannelMutation__
 *
 * To run a mutation, you first call `useDeleteChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteChannelMutation, { data, loading, error }] = useDeleteChannelMutation({
 *   variables: {
 *      pk: // value for 'pk'
 *      sk: // value for 'sk'
 *   },
 * });
 */
export function useDeleteChannelMutation(baseOptions?: Apollo.MutationHookOptions<DeleteChannelMutation, DeleteChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteChannelMutation, DeleteChannelMutationVariables>(DeleteChannelDocument, options);
      }
export type DeleteChannelMutationHookResult = ReturnType<typeof useDeleteChannelMutation>;
export type DeleteChannelMutationResult = Apollo.MutationResult<DeleteChannelMutation>;
export type DeleteChannelMutationOptions = Apollo.BaseMutationOptions<DeleteChannelMutation, DeleteChannelMutationVariables>;
export const OnCreateChannelDocument = gql`
    subscription OnCreateChannel {
  onCreateChannel {
    ...AllData
  }
}
    ${AllDataFragmentDoc}`;

/**
 * __useOnCreateChannelSubscription__
 *
 * To run a query within a React component, call `useOnCreateChannelSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnCreateChannelSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnCreateChannelSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnCreateChannelSubscription(baseOptions?: Apollo.SubscriptionHookOptions<OnCreateChannelSubscription, OnCreateChannelSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnCreateChannelSubscription, OnCreateChannelSubscriptionVariables>(OnCreateChannelDocument, options);
      }
export type OnCreateChannelSubscriptionHookResult = ReturnType<typeof useOnCreateChannelSubscription>;
export type OnCreateChannelSubscriptionResult = Apollo.SubscriptionResult<OnCreateChannelSubscription>;
export const OnUpdateChannelDocument = gql`
    subscription OnUpdateChannel {
  onUpdateChannel {
    ...AllData
  }
}
    ${AllDataFragmentDoc}`;

/**
 * __useOnUpdateChannelSubscription__
 *
 * To run a query within a React component, call `useOnUpdateChannelSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnUpdateChannelSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnUpdateChannelSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnUpdateChannelSubscription(baseOptions?: Apollo.SubscriptionHookOptions<OnUpdateChannelSubscription, OnUpdateChannelSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnUpdateChannelSubscription, OnUpdateChannelSubscriptionVariables>(OnUpdateChannelDocument, options);
      }
export type OnUpdateChannelSubscriptionHookResult = ReturnType<typeof useOnUpdateChannelSubscription>;
export type OnUpdateChannelSubscriptionResult = Apollo.SubscriptionResult<OnUpdateChannelSubscription>;
export const OnDeleteChannelDocument = gql`
    subscription OnDeleteChannel {
  onDeleteChannel {
    ...AllData
  }
}
    ${AllDataFragmentDoc}`;

/**
 * __useOnDeleteChannelSubscription__
 *
 * To run a query within a React component, call `useOnDeleteChannelSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnDeleteChannelSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnDeleteChannelSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnDeleteChannelSubscription(baseOptions?: Apollo.SubscriptionHookOptions<OnDeleteChannelSubscription, OnDeleteChannelSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnDeleteChannelSubscription, OnDeleteChannelSubscriptionVariables>(OnDeleteChannelDocument, options);
      }
export type OnDeleteChannelSubscriptionHookResult = ReturnType<typeof useOnDeleteChannelSubscription>;
export type OnDeleteChannelSubscriptionResult = Apollo.SubscriptionResult<OnDeleteChannelSubscription>;
export const PutProfileDocument = gql`
    mutation PutProfile($input: DynamoDBInput!) {
  putProfile(input: $input) {
    ...AllData
  }
}
    ${AllDataFragmentDoc}`;
export type PutProfileMutationFn = Apollo.MutationFunction<PutProfileMutation, PutProfileMutationVariables>;

/**
 * __usePutProfileMutation__
 *
 * To run a mutation, you first call `usePutProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePutProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [putProfileMutation, { data, loading, error }] = usePutProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePutProfileMutation(baseOptions?: Apollo.MutationHookOptions<PutProfileMutation, PutProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PutProfileMutation, PutProfileMutationVariables>(PutProfileDocument, options);
      }
export type PutProfileMutationHookResult = ReturnType<typeof usePutProfileMutation>;
export type PutProfileMutationResult = Apollo.MutationResult<PutProfileMutation>;
export type PutProfileMutationOptions = Apollo.BaseMutationOptions<PutProfileMutation, PutProfileMutationVariables>;
export const GetProfileDocument = gql`
    query GetProfile($pk: String!) {
  getProfile(pk: $pk, type: "profile") {
    ...AllData
  }
}
    ${AllDataFragmentDoc}`;

/**
 * __useGetProfileQuery__
 *
 * To run a query within a React component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileQuery({
 *   variables: {
 *      pk: // value for 'pk'
 *   },
 * });
 */
export function useGetProfileQuery(baseOptions: Apollo.QueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
      }
export function useGetProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
        }
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>;
export type GetProfileLazyQueryHookResult = ReturnType<typeof useGetProfileLazyQuery>;
export type GetProfileQueryResult = Apollo.QueryResult<GetProfileQuery, GetProfileQueryVariables>;