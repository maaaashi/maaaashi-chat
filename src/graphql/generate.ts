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

export type AllDataFragment = { __typename?: 'DynamoDBData', pk: string, sk: string, value: string, createdAt: string };

export type ListChannelsQueryVariables = Exact<{
  createdAt: Scalars['String']['input'];
}>;


export type ListChannelsQuery = { __typename?: 'Query', listData: Array<{ __typename?: 'DynamoDBData', pk: string, sk: string, value: string, createdAt: string }> };

export type ListChannelChatsQueryVariables = Exact<{
  channelId: Scalars['String']['input'];
}>;


export type ListChannelChatsQuery = { __typename?: 'Query', listTypeData: Array<{ __typename?: 'DynamoDBData', pk: string, sk: string, value: string, createdAt: string }> };

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