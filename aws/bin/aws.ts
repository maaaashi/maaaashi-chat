import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { ChatAppStack } from '../lib/aws-stack'

const app = new cdk.App()
new ChatAppStack(app, 'ChatAppStack')
