export const DislikeButton = ({like, dislike, getLikeStatus, likeObj}) => {

    const postDislike = () => {
        return fetch(`http://localhost:8088/dislikes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(likeObj)
        })
    }

    if (dislike.length === 0 && like.length > 0) { //post has been liked
        return (
            <button 
                onClick={() => {
                    postDislike()
                    .then(() => {
                        return fetch(`http://localhost:8088/likes/${like[0].id}`, {
                            method: "DELETE"
                        })
                    })
                    .then(() => {getLikeStatus()})
                }}
            >Dislike</button>
        )
    } else if (dislike.length > 0) { //post has been disliked
        return (
            <button 
                onClick={() => {
                    fetch(`http://localhost:8088/dislikes/${dislike[0].id}`, {
                        method: "DELETE"
                    })
                    .then(() => {getLikeStatus()})
                }}
            >Undislike</button>
        )
    } else { //post has been neither liked nor disliked
        return (
            <button 
                onClick={() => {
                    postDislike()
                    .then(() => {getLikeStatus()})
                }}
            >Dislike</button>
        )
    }
}