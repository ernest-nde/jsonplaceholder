import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";


export default function UserPosts() {
  const { id } = useParams();

  const [userPosts, setUserPosts] = useState({
    error: false,
    posts: undefined
  });

  useEffect(() => {

    fetch("https://jsonplaceholder.typicode.com/users/" + id +"/posts/")
    .then(response => {
      if(response.ok) {
        return response.json();
      } else {
        throw new Error('Error occured during the process');
      }
    })
    .then(data => {
      setUserPosts({error: false, posts: data});
    })
    .catch(() => {
      setUserPosts({...userPosts, error: true});
    })

  }, []);

  let content;

  if(userPosts.error) {
    content = (
        <p className="text-center italic mt-5 text-red-500">Une erreur est survenue ...</p>
    );
  } else if(userPosts.posts?.length > 0) {
    content = (
      <nav>
        {userPosts.posts.map(post => (
          <NavLink
            to = {"/posts/" + post.id}
            key={post.id}
            className="shadow-md shadow-green-100 border-solid border-slate-300 border m-2 p-1 rounded-md flex justify-between hover:bg-blue-50"
          >
            {post.title}
          </NavLink>
        ))}
      </nav>
    )
  } else if(userPosts.posts?.length === 0) { 
      content = (
          <p className="text-center italic mt-5 text-orange-500">Aucune donnée touvrée ...</p>
      )
  }
  
  return (
    <div className="border-red-100 border-solid border">
      <h2 className="text-green-600 text-lg font-semibold m-1"> Current Posts List </h2>
      {content}
    </div>
  )
}
