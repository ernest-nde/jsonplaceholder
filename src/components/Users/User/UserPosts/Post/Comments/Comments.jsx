import { useEffect, useState } from "react"


export default function Comments({postId}) {
    const [postComments, setPostComments] = useState({
        error: false,
        comments: undefined
    });

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/comments?postId=" + postId)
        .then(response => {
            if(response.ok) {
                return response.json();
            } else {
                throw new Error();
            }
        })
        .then(comments => {
            setPostComments({error: false, comments});
        })
        .catch(() => {
            setPostComments({error: true, comments: undefined});
        })
    });

    let allComments;

    if(postComments.error) {
        allComments = (
            <p className="text-center italic mt-5 text-red-500">Une erreur est survenue ...</p>
        );
    } else if(postComments.comments?.length > 0) {
        allComments = (
            <div className="h-1/2 overflow-scroll">
                {postComments.comments.map(comment => (
                    <div 
                        key={comment.id}
                        className="border-solid border-red-400 border rounded-md m-3 p-2"
                    > 
                        <p> {comment.body} </p>
                        <div className="flex flex-row gap-2">
                            <span className="border border-solid border-orange-500 bg-orange-300 px-2 rounded-lg capitalize"> {comment.name} </span>
                            <span className="border border-solid border-orange-500 bg-orange-300 px-2 rounded-lg lowercase"> {comment.email} </span>
                        </div>
                    </div>
                ))}
            </div>
        );
    } else if(postComments.comments?.length === 0) {
        allComments = (
            <p className="text-center italic mt-5 text-orange-500">Aucune commentaire touvré ...</p>
        )
    }

    return (
        <>
            {allComments}
        </>
    )
}
