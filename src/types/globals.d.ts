declare namespace NodeJS {
  // 環境変数名の定義
  interface ProcessEnv {
    readonly GITHUB_ID: string
    readonly GITHUB_SECRET: string
    readonly NEXT_PUBLIC_GRAPHQL_ENDPOINT: string
    readonly NEXT_PUBLIC_GRAPHQL_REGION: string
    readonly NEXT_PUBLIC_GRAPHQL_APIKEY: string
  }
}
