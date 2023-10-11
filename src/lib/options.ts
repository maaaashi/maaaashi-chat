import { DynamoDB, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import { NextAuthOptions } from 'next-auth'
// import { DynamoDBAdapter } from '@auth/dynamodb-adapter'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CognitoProvider from 'next-auth/providers/cognito'

const {
  NEXT_AUTH_AWS_ACCESS_KEY: accessKeyId,
  NEXT_AUTH_AWS_SECRET_KEY: secretAccessKey,
  NEXT_AUTH_AWS_REGION: region,
  GITHUB_ID,
  GITHUB_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_SECRET,
  NODE_ENV,
  COGNITO_CLIENT_ID,
  COGNITO_ISSUER,
} = process.env

const config: DynamoDBClientConfig = {
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region,
}

const client = DynamoDBDocument.from(new DynamoDB(config), {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
})

export const options: NextAuthOptions = {
  debug: NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  providers: [
    GithubProvider({
      clientId: GITHUB_ID ?? '',
      clientSecret: GITHUB_SECRET ?? '',
    }),
    // GoogleProvider({
    //   clientId: GOOGLE_CLIENT_ID ?? '',
    //   clientSecret: GOOGLE_SECRET ?? '',
    // }),
    // CognitoProvider({
    //   clientId: COGNITO_CLIENT_ID ?? '',
    //   clientSecret: '',
    //   issuer: COGNITO_ISSUER ?? '',
    //   client: {
    //     token_endpoint_auth_method: 'none',
    //   },
    // }),
  ],
  // adapter: DynamoDBAdapter(client, {
  //   tableName: 'chat-app',
  // }),
}
