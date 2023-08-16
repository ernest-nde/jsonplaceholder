import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";

export default function UserAlbums() {
  const params = useParams();

  const [userAlbums, setUserAlbums] = useState({
    error: false,
    albums: undefined
  });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/" + params.id +"/albums/")
    .then(response => {
      if(response.ok) {
        return response.json();
      } else {
        throw new Error('Error occured during the process');
      }
    })
    .then(data => {
      setUserAlbums({error: false, albums: data});
    })
    .catch(() => {
      setUserAlbums({...userAlbums, error: true});
    })
  }, []);

  let content;

  if(userAlbums.error) {
    content = (
        <p className="text-center italic mt-5 text-red-500">Une erreur est survenue ...</p>
    );
  } else if(userAlbums.albums?.length > 0) {
    content = (
      <nav>
        {userAlbums.albums.map(album => (
          <NavLink
            to = {"/albums/" + album.id + "/photos/"}
            key={album.id}
            className="shadow-md shadow-green-100 border-solid border-slate-300 border m-2 p-1 rounded-md flex justify-between hover:bg-blue-50"
          >
              {album.title}
            </NavLink>
        ))}
      </nav>
    )
  } else if(userAlbums.albums?.length === 0) { 
      content = (
          <p className="text-center italic mt-5 text-orange-500">Aucune donnée touvrée ...</p>
      )
  }

  return (
    <div className="border-red-100 border-solid border">
      <h2 className="text-green-600 text-lg font-semibold m-1"> Current Albums List </h2>
      {content}
    </div>
  )
}
