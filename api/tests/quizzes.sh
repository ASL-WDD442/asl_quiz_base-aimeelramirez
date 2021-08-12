API="${API_ORIGIN:-http://localhost:4000/}"
URL_PATH="quizzes"
curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  # --header "Authorization: Token token=$TOKEN"

echo