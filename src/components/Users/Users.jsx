import { useState, useEffect } from "react";
import spinner from "./assets/spinner.svg";
import { Link } from "react-router-dom";


export default function Users() {
    const [APIState, setAPIState] = useState({
        loading: false,
        error: false,
        data: undefined
    });

    useEffect(() => {
        setAPIState({...APIState, loading: true});

        fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => {
            if(response.ok) {
                return response.json();
            } else {
                throw new Error('Error');
            }
        })
        .then(data => {
            setAPIState({loading: false, error: false, data:data});
        })
        .catch(() => {
            setAPIState({loading: false, error: true, data: undefined})
        })
    }, []);

    let content;

    if(APIState.loading) {
        content = (
            <img 
                className="mx-auto mt-5"
                src={spinner} 
                alt="all users" 
            />
        )
    } else if(APIState.error) {
        content = (
            <p className="text-center italic mt-5 text-red-500">Une erreur est survenue ...</p>
        )
    } else if(APIState.data?.length > 0) {
        content = (
            <table className="min-w-full table-auto">
                <thead className="justify-between">
                <tr className="bg-slate-500">
                <th className="px-16 py-2">
                        <span className="text-slate-100"></span>
                    </th>
                    <th className="px-16 py-2">
                        <span className="text-slate-100">Name</span>
                    </th>
                    <th className="px-16 py-2">
                        <span className="text-slate-100">User Name</span>
                    </th>
                </tr>
                </thead>
                <tbody className="bg-gray-200">
                    {APIState.data.map(item => (
                        <tr 
                            key={item.id}
                            className="bg-white border-4 border-gray-200"
                        >
                            <td className="px-16 py-2 w-fit  items-center"> 
                                <Link 
                                    to= {"/users/" + item.id}
                                >
                                    Visit
                                </Link> 
                            </td>
                            <td className="px-16 py-2 w-fit items-center">{ item.name }</td>
                            <td className="px-16 py-2 w-fit items-center">{ item.username }</td>
                        </tr>   
                    ))}
                </tbody>
            </table>
        )
    } else if(APIState.data?.length === 0) {
        
        content = (
            <p className="text-center italic mt-5 text-orange-500">Aucune donnée touvrée ...</p>
        )
    }

    return (
        <div>
            <h1 className="mt-11 text-3xl font-semibold text-center h1t-10">All Users</h1>
            
            { content }
        </div>
    )
}
