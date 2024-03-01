import './reset.css';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import CheckAllRemaining from './components/CheckAllRemaining';
import TodoFilter from './components/TodoFilter';
import ClearCompletedBtn from './components/ClearCompletedBtn';
import { useEffect, useState } from 'react';

function App() {

let[todos,setTodos]=useState([]);

useEffect(() => {
  fetch('http://localhost:3001/todos')
    .then(res => res.json())
    .then(todos => setTodos(todos))
    .catch(error => console.error('Error fetching todos:', error));
}, []);


let addTodo=(todo)=>{
  ///update data at server side
  fetch('http://localhost:3001/todos', {
    method : "POST",
    headers :{
      'Content-Type' :'application/json'
    },
    body : JSON.stringify(todo)
  })

  //update data at client side
  setTodos(prevState=>[...prevState,todo])
}

let deleteTodo = (todoId) => {
  //delete data at server side
  fetch(`http://localhost:3001/todos?id=${todoId}`, {
    method: "DELETE"
  })
  //delete data at client side
  setTodos(prevState => {
    return prevState.filter(todo => {
      return todo.id !== todoId
    });
  })
}

let updateTodo =(todo)=>{
  console.log(todo)
  //server
  fetch(`http://localhost:3001/todos?id=${todo.id}`, {
    method : "PATCH",
    headers :{
      'Content-Type' :'application/json'
    },
    body : JSON.stringify(todo)
  })
  //client
  setTodos(prevState => {
    return prevState.map(t => {
      if(t.id===todo.id){
        return todo
      }
      return t;
    });
  })
}

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>

        <TodoForm addTodo={addTodo}/>
        

        <TodoList todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo}/>
      

        <CheckAllRemaining/>
        

            
        <div className="other-buttons-container">
        <TodoFilter/>
        <ClearCompletedBtn/>
        
        </div>
      </div>
    </div>
  );
}

export default App;
