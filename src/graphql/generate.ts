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

export type Channel = {
  __typename?: 'Channel';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Chat = {
  __typename?: 'Chat';
  channelId: Scalars['String']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  userName: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  listChannelChats: Array<Chat>;
  listChannels: Array<Channel>;
};


export type QueryListChannelChatsArgs = {
  channelId: Scalars['String']['input'];
};

export type ListChannelsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListChannelsQuery = { __typename?: 'Query', listChannels: Array<{ __typename?: 'Channel', id: string, name: string }> };


export const ListChannelsDocument = gql`
    query ListChannels {
  listChannels {
    id
    name
  }
}
    `;

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
 *   },
 * });
 */
export function useListChannelsQuery(baseOptions?: Apollo.QueryHookOptions<ListChannelsQuery, ListChannelsQueryVariables>) {
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