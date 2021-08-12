#!/bin/bash
#https://www.keycdn.com/support/popular-curl-examples
#curl -X POST http://localhost:4000/auth/login -d 'username=yourusername&password=yourpassword'
#  curl --request GET http://localhost:4000/

USERNAME="mike"
PASSWORD="abc123"
ACCESS_TOKEN="7a1d4fd0-fb32-11eb-baf9-4729e2529efe"
API="${API_ORIGIN:-http://localhost:4000/}"
URL_PATH="auth/login"
curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Authorization:$ACCESS_TOKEN" \
  --data '{
      "username": "'"${USERNAME}"'",
      "password": "'"${PASSWORD}"'"
  }'

echo
