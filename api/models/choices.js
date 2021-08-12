

// Choices:
// id
// value
// type(correct, incorrect)
// questionId

module.exports = () => {
    const Choice = [
        {
            id: 0,
            value: "",
            type: "correct",
            questionId: ""
        },
        {
            id: 1,
            name: "Personal Playlist",
            type: "private",
            userId: ""
        }
    ]
    return Choice;
}