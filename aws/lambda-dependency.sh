for dir in lib/appsync/lambdaDataSource/*; do
  (cd "$dir" && npm ci && tsc ./*.ts)
done
