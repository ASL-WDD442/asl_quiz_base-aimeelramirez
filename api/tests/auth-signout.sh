#!/bin/bash


ACCESS_TOKEN="7a1d4fd0-fb32-11eb-baf9-4729e2529efe"

API="${API_ORIGIN:-http://localhost:4000/}"
URL_PATH="api/users"
curl "${API}${URL_PATH}" \
  --include \
  --request DELETE \
  --header "Authorization: Token token=$ACCESS_TOKEN"

echo