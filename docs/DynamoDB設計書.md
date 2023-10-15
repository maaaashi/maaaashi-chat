# DynamoDB 設計書

## メイン

|         | pk             | sk             | value        | type    | createdAt        |
| ------- | -------------- | -------------- | ------------ | ------- | ---------------- |
| Channel | Channel-{uuid} | Channel-{uuid} | ChannelValue | channel | Date.toISOString |
| Chat    | Channel-{uuid} | Chat-{uuid}    | ChatValue    | chat    | Date.toISOString |

## SI

|     | pk   | sk        | usage |
| --- | ---- | --------- | ----- |
| GS1 | type | createdAt | 取得  |

## Value

| name         | value                                 |
| ------------ | ------------------------------------- |
| ChannelValue | { name: string, username: string }    |
| ChatValue    | { username: string, content: string } |
