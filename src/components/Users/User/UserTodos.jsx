import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


export default function UserTodos() {
  const params = useParams();

  const [todoData, setTodoData] = useState({
    error: false,
    data: undefined
  });

  
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/" + params.id +"/todos/")
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error fetching todos');
      }
    })
    .then(data => {
      setTodoData({error: false, data: data});
    })
    .catch(() => { 
      setTodoData({...todoData, error : true});
    });
  }, []);


  let content;

  if(todoData.error) {
    content = (
        <p className="text-center italic mt-5 text-red-500">Une erreur est survenue ...</p>
    );
  } else if(todoData.data?.length > 0) {
    content = (
      <ul>
        {todoData.data.map(todo => (
          <li 
            key={todo.id}
            className="shadow-md shadow-green-100 border-solid border-slate-300 border m-2 p-1 rounded-md flex justify-between"
          >
            <span> {todo.title} </span>
            <span className={`${todo.completed ? "text-green-600" : "text-red-600"} italic text-sm font-light`}> {todo.completed ? "Completed" : "Not completed"}</span>
          </li>
        ))}
      </ul>
    )
  } else if(todoData.data?.length === 0) { 
      content = (
          <p className="text-center italic mt-5 text-orange-500">Aucune donnée touvrée ...</p>
      )
  }


  return (
    <div className="border-red-100 border-solid border">
      <h2 className="text-green-600 text-lg font-semibold m-1"> Current user Todos List </h2>
      {content}
    </div>
  )
}
