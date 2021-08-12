/**
 Quizzes:
 id
name
type (public, private)
userId
 */

module.exports = () => {
    const Quiz = [
        {
            id: 0,
            name: "Lyrics",
            type: "public",
            userId: ""
        },
        {
            id: 1,
            name: "Personal Playlist",
            type: "private",
            userId: ""
        }
    ]
    return Quiz;
}