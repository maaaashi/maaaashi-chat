import { CfnOutput, Duration, Expiration, Stack, StackProps } from 'aws-cdk-lib'
import {
  AuthorizationType,
  Code,
  FunctionRuntime,
  GraphqlApi,
  KeyCondition,
  MappingTemplate,
  PrimaryKey,
  Resolver,
  SchemaFile,
  Values,
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

    const table = new Table(this, 'ChatAppTable', {
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

    table.addGlobalSecondaryIndex({
      indexName: 'GS1',
      partitionKey: {
        name: 'type',
        type: AttributeType.STRING,
      },
      sortKey: {
        name: 'createdAt',
        type: AttributeType.STRING,
      },
    })

    table.addLocalSecondaryIndex({
      indexName: 'LS1',
      sortKey: {
        name: 'type',
        type: AttributeType.STRING,
      },
    })

    const dynamodbDatasource = api.addDynamoDbDataSource(
      'DynamoDBDataSource',
      table
    )

    dynamodbDatasource.createResolver('ListChannelsResolver', {
      typeName: 'Query',
      fieldName: 'listData',
      requestMappingTemplate: MappingTemplate.dynamoDbQuery(
        KeyCondition.eq('type', 'type').and(
          KeyCondition.le('createdAt', 'createdAt')
        ),
        'GS1'
      ),
      responseMappingTemplate: MappingTemplate.dynamoDbResultList(),
    })

    dynamodbDatasource.createResolver('ListChatResolver', {
      typeName: 'Query',
      fieldName: 'listTypeData',
      requestMappingTemplate: MappingTemplate.dynamoDbQuery(
        KeyCondition.eq('pk', 'pk').and(KeyCondition.eq('type', 'type')),
        'LS1'
      ),
      responseMappingTemplate: MappingTemplate.dynamoDbResultList(),
    })

    dynamodbDatasource.createResolver('SendMessageResolver', {
      typeName: 'Mutation',
      fieldName: 'sendMessage',
      requestMappingTemplate: MappingTemplate.dynamoDbPutItem(
        PrimaryKey.partition('pk').is('input.pk').sort('sk').is('input.sk'),
        Values.attribute('type')
          .is('$ctx.args.input.type')
          .attribute('value')
          .is('$ctx.args.input.value')
          .attribute('createdAt')
          .is('$ctx.args.input.createdAt')
      ),
      responseMappingTemplate: MappingTemplate.dynamoDbResultItem(),
    })

    dynamodbDatasource.createResolver('createChannelResolver', {
      typeName: 'Mutation',
      fieldName: 'createChannel',
      requestMappingTemplate: MappingTemplate.dynamoDbPutItem(
        PrimaryKey.partition('pk').is('input.pk').sort('sk').is('input.sk'),
        Values.attribute('type')
          .is('$ctx.args.input.type')
          .attribute('value')
          .is('$ctx.args.input.value')
          .attribute('createdAt')
          .is('$ctx.args.input.createdAt')
      ),
      responseMappingTemplate: MappingTemplate.dynamoDbResultItem(),
    })

    dynamodbDatasource.createResolver('updateChannelResolver', {
      typeName: 'Mutation',
      fieldName: 'updateChannel',
      requestMappingTemplate: MappingTemplate.dynamoDbPutItem(
        PrimaryKey.partition('pk').is('input.pk').sort('sk').is('input.sk'),
        Values.attribute('type')
          .is('$ctx.args.input.type')
          .attribute('value')
          .is('$ctx.args.input.value')
          .attribute('createdAt')
          .is('$ctx.args.input.createdAt')
      ),
      responseMappingTemplate: MappingTemplate.dynamoDbResultItem(),
    })

    dynamodbDatasource.createResolver('deleteChannelResolver', {
      typeName: 'Mutation',
      fieldName: 'deleteChannel',
      runtime: FunctionRuntime.JS_1_0_0,
      code: Code.fromAsset(
        path.join(__dirname, './appsync/funcitonCode/deleteDynamoDBData.js')
      ),
    })

    dynamodbDatasource.createResolver('putProfileResolver', {
      typeName: 'Mutation',
      fieldName: 'putProfile',
      requestMappingTemplate: MappingTemplate.dynamoDbPutItem(
        PrimaryKey.partition('pk').is('input.pk').sort('sk').is('input.sk'),
        Values.attribute('type')
          .is('$ctx.args.input.type')
          .attribute('value')
          .is('$ctx.args.input.value')
          .attribute('createdAt')
          .is('$ctx.args.input.createdAt')
      ),
      responseMappingTemplate: MappingTemplate.dynamoDbResultItem(),
    })

    dynamodbDatasource.createResolver('getProfileResolver', {
      typeName: 'Query',
      fieldName: 'getProfile',
      requestMappingTemplate: MappingTemplate.dynamoDbQuery(
        KeyCondition.eq('pk', 'pk').and(KeyCondition.eq('type', 'type')),
        'LS1'
      ),
      responseMappingTemplate: MappingTemplate.dynamoDbResultItem(),
    })

    new CfnOutput(this, 'GraphQL Endpoint', {
      value: api.graphqlUrl,
    })

    new CfnOutput(this, 'GraphQL APIKEY', {
      value: api.apiKey ?? '',
    })
  }
}
