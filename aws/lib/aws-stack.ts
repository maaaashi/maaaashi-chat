import { CfnOutput, Duration, Expiration, Stack, StackProps } from 'aws-cdk-lib'
import {
  AuthorizationType,
  GraphqlApi,
  KeyCondition,
  MappingTemplate,
  Resolver,
  SchemaFile,
} from 'aws-cdk-lib/aws-appsync'
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb'
import { Construct } from 'constructs'
import path = require('path')

export class ChatAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const api = new GraphqlApi(this, 'ChatAppApi', {
      name: 'ChatApp-AppSync',
      schema: SchemaFile.fromAsset(
        path.join(__dirname, '../graphql/generate.graphql')
      ),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: AuthorizationType.API_KEY,
          apiKeyConfig: {
            name: 'appsync apikey',
            description: 'appsync apikey with chat app',
            expires: Expiration.after(Duration.days(7)),
          },
        },
      },
    })

    const table = new Table(this, 'TodoTable', {
      tableName: 'ChatAppTable',
      billingMode: BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: 'pk',
        type: AttributeType.STRING,
      },
      sortKey: {
        name: 'sk',
        type: AttributeType.STRING,
      },
    })

    // table.addLocalSecondaryIndex({
    //   indexName: 'LSI1',
    //   sortKey: {
    //     name: 'type',
    //     type: AttributeType.STRING,
    //   },
    // })

    const dynamodbDatasource = api.addDynamoDbDataSource(
      'DynamoDBDataSource',
      table
    )

    dynamodbDatasource.createResolver('ListChannelsResolver', {
      typeName: 'Query',
      fieldName: 'listChannels',
      requestMappingTemplate: MappingTemplate.dynamoDbQuery(
        KeyCondition.beginsWith('pk', 'pk')
      ),
      responseMappingTemplate: MappingTemplate.dynamoDbResultList(),
    })

    new CfnOutput(this, 'GraphQL Endpoint', {
      value: api.graphqlUrl,
    })

    new CfnOutput(this, 'GraphQL APIKEY', {
      value: api.apiKey ?? '',
    })
  }
}
