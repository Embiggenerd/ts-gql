docker run --name postgresql -itd  \
  --env 'DB_USER=gql' --env 'DB_PASS=gql' \
  --env 'DB_NAME=jwt-auth-example' \
  --publish 5432:5432 \
  sameersbn/postgresql:10-2