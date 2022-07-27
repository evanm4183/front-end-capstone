export const LikeButton = ({like, dislike, getLikeStatus, likeObj}) => {

    const postLike = () => {
        return fetch(`http://localhost:8088/likes`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            }, 
            body: JSON.stringify(likeObj)
        })
    }

    if (like.length === 0 && dislike.length > 0) { //post has been disliked
        return (
            <button 
                onClick={() => {
                    postLike()
                    .then(() => {
                        return fetch(`http://localhost:8088/dislikes/${dislike[0].id}`, {
                            method: "DELETE"
                        })
                    })
                    .then(() => {getLikeStatus()})
                }}
            >Like</button>
        )
    } else if (like.length > 0) { //post has been liked
        return (
            <button 
                onClick={() => {
                    fetch(`http://localhost:8088/likes/${like[0].id}`, {
                        method: "DELETE"
                    })
                    .then(() => {getLikeStatus()})
                }}
            >Unlike</button>
        )
    } else { //post has been neither liked nor disliked
        return (
            <button 
                onClick={() => {
                    postLike()
                    .then(() => {getLikeStatus()})
                }}
            >Like</button>
        )
    }
}