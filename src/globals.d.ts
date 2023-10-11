declare namespace NodeJS {
  // 環境変数名の定義
  interface ProcessEnv {
    readonly NEXT_AUTH_AWS_ACCESS_KEY: string
    readonly NEXT_AUTH_AWS_SECRET_KEY: string
    readonly NEXT_AUTH_AWS_REGION: string
    readonly GITHUB_ID: string
    readonly GITHUB_SECRET: string
    readonly GOOGLE_CLIENT_ID: string
    readonly GOOGLE_SECRET: string
    readonly COGNITO_CLIENT_ID: string
    readonly COGNITO_ISSUER: string
  }
}
