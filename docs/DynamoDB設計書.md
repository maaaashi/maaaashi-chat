# DynamoDB 設計書

## メイン

|         | pk             | sk             | type    | value        |
| ------- | -------------- | -------------- | ------- | ------------ |
| Channel | Channel-{uuid} | Channel-{uuid} | channel | ChannelValue |
| Chat    | Channel-{uuid} | Chat-{uuid}    | chat    | ChatValue    |

## SI

|      | pk  | sk   | usage |
| ---- | --- | ---- | ----- |
| LSI1 | -   | type | 取得  |
