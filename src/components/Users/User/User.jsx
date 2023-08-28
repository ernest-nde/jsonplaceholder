import { useState, useEffect } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import spinner from "../assets/spinner.svg";

export default function User() {
  const { id } = useParams();

  const [userData, setUserData] = useState({
    loading: false,
    error: false,
    data: undefined
  });

  useEffect(() => {
    setUserData({...userData, loading: true});

    fetch("https://jsonplaceholder.typicode.com/users/" + id)
    .then(response => {
      if(response.ok) {
        return response.json();
      }
    })
    .then(data => {
      setUserData({loading: false, error: false, data:data});
    })
    .catch(()=>{setUserData({loading:false , error :true, data: undefined})});

  }, []);
  
  let content;
  if(userData.loading) {
    content = (
      <img 
          className="mx-auto mt-5"
          src={spinner} 
          alt="all users" 
      />
    )
  } else if(userData.error) {
    content = (
      <p className="text-center italic mt-5 text-red-500">Une erreur est survenue ...</p>
    )
  } else if(userData.data) {
    content = (
      <>
        <div className="m-3 border-solid border-slate-300 h-fit border-2 w-1/3">
          <div className="m-2">
            <h4 className="font-bold text-black">Basic user informations</h4>
            <ul>
              <li className="pl-4"> <span className="font-semibold text-orange-300">Name : </span>{userData.data.name} </li>
              <li className="pl-4"> <span className="font-semibold text-orange-300">Username : </span>{userData.data.username} </li>
            </ul>
          </div>
          <div className="m-2">
            <h4 className="font-bold text-black">User Contact</h4>
            <ul>
              <li className="pl-4"> <span className="font-semibold text-orange-300">E-mail : </span>{userData.data.email} </li>
              <li className="pl-4"> <span className="font-semibold text-orange-300">Phone : </span>{userData.data.phone} </li>
              <li className="pl-4"> <span className="font-semibold text-orange-300">Website : </span>{userData.data.website} </li>
            </ul>
          </div>
          <div className="m-2">
            <h4 className="font-bold text-black">User Address</h4>
            <ul>
              <li className="pl-4"> <span className="font-semibold text-orange-300">Street : </span> {userData.data.address.street} </li>
              <li className="pl-4"> <span className="font-semibold text-orange-300">Suite : </span> {userData.data.address.suite} </li>
              <li className="pl-4"> <span className="font-semibold text-orange-300">City : </span> {userData.data.address.city} </li>
              <li className="pl-4"> <span className="font-semibold text-orange-300">Zip Code : </span> {userData.data.address.zipcode} </li>
              <li className="pl-4"> <span className="font-semibold text-orange-300">Latitude : </span> {userData.data.address.geo.lat} </li>
              <li className="pl-4"> <span className="font-semibold text-orange-300">Longitude : </span> {userData.data.address.geo.lng} </li>
            </ul>
          </div>
          <div className="m-2">
            <h4 className="font-bold text-black">Company informations</h4>
            <ul>
            <li className="pl-4"> <span className="font-semibold text-orange-300"> Name : </span>{userData.data.company.name} </li>
            <li className="pl-4"> <span className="font-semibold text-orange-300"> Catch Phrase : </span>{userData.data.company.catchPhrase} </li>
            <li className="pl-4"> <span className="font-semibold text-orange-300"> Business Services : </span>{userData.data.company.bs} </li>
            </ul>
          </div>
        </div>
        <div className="m-3 border-solid border-slate-300 h-1/4 overflow-scroll border-2 w-2/3">
          <div className="bg-green-300 block mx-auto w-full h-fit">
            <nav className="flex items-center justify-center">
              <NavLink 
                to= {"/users/" + userData.data.id + "/todos"}
                
                className={
                  ({isActive}) => `${isActive && "bg-amber-400 font-semibold italic"} mx-1 p-2`
                }
              >
                Todos
              </NavLink>
              <NavLink 
                to= {"/users/" + userData.data.id + "/albums"}
                className={({isActive}) => `${isActive && "bg-amber-400 font-semibold italic"} mx-1 p-2`}
              >
                Albums
              </NavLink>
              <NavLink 
                to= {"/users/" + userData.data.id + "/posts"}
                className={({isActive}) => `${isActive && "bg-amber-400 font-semibold italic"} mx-1 p-2`}
              >
                Posts
              </NavLink>
            </nav>
          </div>
          <div className="p-2 m-3 block mx-auto w-full h-fit">
            <Outlet />
          </div>
        </div>
      </>
      
    )
  }

  return (
    <div className="m-4 p-5 flex">
      {content}
    </div>
  )
}
