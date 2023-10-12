import { createAuthLink, AuthOptions } from 'aws-appsync-auth-link'
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link'
import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client/core'

const {
  NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  NEXT_PUBLIC_GRAPHQL_REGION,
  NEXT_PUBLIC_GRAPHQL_APIKEY,
} = process.env

const url = NEXT_PUBLIC_GRAPHQL_ENDPOINT
const region = NEXT_PUBLIC_GRAPHQL_REGION
const auth: AuthOptions = {
  type: 'API_KEY',
  apiKey: NEXT_PUBLIC_GRAPHQL_APIKEY,
}

const link = ApolloLink.from([
  createAuthLink({ url, region, auth }),
  createSubscriptionHandshakeLink({ url, region, auth }),
])

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})
