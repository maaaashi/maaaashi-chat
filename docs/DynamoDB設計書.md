# DynamoDB 設計書

## メイン

|         | pk             | sk             | type    | value        | createdAt        |
| ------- | -------------- | -------------- | ------- | ------------ | ---------------- |
| Channel | Channel-{uuid} | Channel-{uuid} | channel | ChannelValue | Date.toISOString |
| Chat    | Channel-{uuid} | Chat-{uuid}    | chat    | ChatValue    | Date.toISOString |

## SI

|     | pk   | sk        | usage |
| --- | ---- | --------- | ----- |
| GS1 | type | createdAt | 取得  |
| LS1 | -    | type      | 取得  |

## Value

| name         | value                                                   |
| ------------ | ------------------------------------------------------- |
| ChannelValue | { name: string, username: string }                      |
| ChatValue    | { username: string, imageUrl: string, content: string } |
