# DynamoDB 設計書

## メイン

|         | pk             | sk             | value        |
| ------- | -------------- | -------------- | ------------ |
| Channel | Channel-{uuid} | Channel-{uuid} | ChannelValue |
| Chat    | Channel-{uuid} | Chat-{uuid}    | ChatValue    |

## SI

|      | pk  | sk   | usage |
| ---- | --- | ---- | ----- |
| LSI1 | -   | type | 取得  |
