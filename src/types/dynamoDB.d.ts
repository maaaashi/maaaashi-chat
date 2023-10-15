declare module 'DynamoDB-Module' {
  export type Table = {
    pk: string
    sk: string
    type: 'channel' | 'chat'
    value: string
    createdAt: string
  }

  export type ChannelValue = {
    name: string
    username: string
  }

  export type ChatValue = {
    content: string
    username: string
  }
}
