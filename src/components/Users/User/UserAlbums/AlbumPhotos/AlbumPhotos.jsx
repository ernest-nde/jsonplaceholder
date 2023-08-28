import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import spinner from "../../../assets/spinner.svg";


export default function AlbumPhotos() {
    const { albumId } = useParams();

    const [albumPhotos, setAlbumPhotos] = useState({
        loading: true,
        error: false,
        photos: undefined
    });

    useEffect(() => {
        setAlbumPhotos({...AlbumPhotos, loading: true});

        fetch("https://jsonplaceholder.typicode.com/albums/" + albumId +"/photos")
        .then((response) => {
            if(response.ok) {
                return response.json();
            } else {
                throw new Error('Error fetching data');
            }
        })
        .then((data) => {
            setAlbumPhotos({loading: false, error: false, photos: data});
        })
        .catch(() => {
            setAlbumPhotos({...AlbumPhotos, error: true})
        });
    }, []);

    let content;

    if(albumPhotos.loading) {
        content = (
            <img 
                className="mx-auto mt-5"
                src={spinner} 
                alt="photos" 
            />
        )
    } else if(albumPhotos.error) {
        content = (
            <p className="text-center italic mt-5 text-red-500">Une erreur est survenue ...</p>
        );
    } else if(albumPhotos.photos?.length > 0) {
        content = (
            <div className="p-5 flex flex-wrap mx-auto justify-center">
                {albumPhotos.photos.map(photo => (
                <div
                    key={photo.id}
                    className="w-1/5 m-2 block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                    <div className="relative overflow-hidden bg-cover bg-no-repeat w-full">
                        <img
                        className="w-fit rounded-t-lg"
                        src={photo.url}
                        alt="" />
                    </div>
                    <div className="p-3">    
                        <p className="text-base text-neutral-600 dark:text-neutral-200 capitalize">
                        <span className="rounded-full bg-red-950 text-slate-200 p-1 mr-2"> {albumPhotos.photos.indexOf(photo) + 1} </span>
                         {photo.title}
                        </p>
                    </div>
                </div>
            ))}
            </div>
        )
    }

    return (
        <>
            <h1 className="mx-auto text-center text-3xl font-semibold">Photos List</h1>
            { content }
        </>
    )
}
