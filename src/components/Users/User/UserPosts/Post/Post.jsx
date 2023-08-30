import { useEffect, useState } from "react";
import { useParams } from "react-router";
import spinner from "../../../assets/spinner.svg";
import Comments from "./Comments/Comments";


useParams
export default function Post() {
    const { id } = useParams();

    const [postContent, setPostContent] = useState({
        loading: false,
        error: false,
        post: undefined
    });

    useEffect(() => {
        setPostContent({...postContent, loading: true});

        fetch("https://jsonplaceholder.typicode.com/posts/" + id)
        .then(response => {
            if(response.ok) {
                return response.json();
            } else {
                throw new Error("Un problème est survenu");
            }
        })
        .then(post => {
            setPostContent({loading: false, error: false, post});
        })
        .catch(() => {
            setPostContent({loading: false, error: true, post: undefined});
        });
    }, []);

    let content;

    if(postContent.loading) {
        content = (
            <img 
                className="mx-auto mt-5"
                src={spinner} 
                alt="all users" 
            />
        )
    } else if(postContent.error) {
        content = (
            <p className="text-center italic mt-5 text-red-500">Une erreur est survenue ...</p>
        )
    } else if(postContent.post) {
        content=  (
            <div className="p-10 border-green-300 border border-solid mt-5 ml-auto mr-auto w-4/5 rounded-xl shadow-sm hover:shadow-md"> 
                <h2 className="mt-3 mb-3">Title : <span className="underline">{postContent.post.title}</span> </h2>
                <p>{postContent.post.body}</p>

                <div className="mt-10">
                    <h4 className="font-bold">Comments</h4>
                    <Comments postId={postContent.post.id} />
                </div>
            </div>
        )
    }

    return (
        <>
            {content}
        </>
    )
}
