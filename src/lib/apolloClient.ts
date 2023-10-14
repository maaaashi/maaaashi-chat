import { createAuthLink, AuthOptions } from 'aws-appsync-auth-link'
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link'
import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client/core'

const url = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT
const region = process.env.NEXT_PUBLIC_GRAPHQL_REGION
const auth: AuthOptions = {
  type: 'API_KEY',
  apiKey: process.env.NEXT_PUBLIC_GRAPHQL_APIKEY,
}

const link = ApolloLink.from([
  createAuthLink({ url, region, auth }),
  createSubscriptionHandshakeLink({ url, region, auth }),
])

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})
