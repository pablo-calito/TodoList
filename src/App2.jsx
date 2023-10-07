import React, {Fragment, useState, useRef, useEffect} from 'react';
import {TodoList} from './componentes/TodoList'

export function App2(){
    const [todos, setTodos] = useState([
        {id:1, task: 'Tarea 1', completed:false,prioridad:"Baja"},
    ]);

    const todoTaskRef = useRef();
    const todoPrio = useRef();

    useEffect(() =>{
        const storedTodos = JSON.parse(localStorage.getItem("todoApp.todos"));
        if (storedTodos){
            setTodos(storedTodos);
        }
    },[]);

    useEffect(()=>{
        localStorage.setItem('todoApp.todos', JSON.stringify(todos));
    },[todos])

    const toggleTodo = (id) =>{
        const newTodos = [...todos];
        const todo = newTodos.find((todo)=>todo.id === id);
        todo.completed = !todo.completed;
        setTodos(newTodos);
    }
  
    const handleTodoAdd = () => {
        const task = todoTaskRef.current.value;
        const prio = todoPrio.current.value
        if (task === "" ) return;
        setTodos((prevTodos) => {
            let idActual = prevTodos.length+1;
            return [...prevTodos, {id:idActual , task,completed:false,prioridad:prio}]
        })
    }
    const handleClearAll = () => {
        const newTodos = todos.filter((todos) => !todos.completed);
        setTodos(newTodos);
    }

    return (
        <Fragment>
            <TodoList todos={todos} toggleTodo={toggleTodo}/>
         
            <input ref={todoTaskRef} type="text" placeholder="Nueva Tarea" />
            <button onClick={handleTodoAdd}>+</button>
            <button onClick={handleClearAll}>-</button>
            <select style={{margin:"5px"}}  ref={todoPrio}>
                <option value="">Seleccione una Prioridad</option>
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
            </select>
            <div>Te quedan {todos.filter((todo) => !todo.completed).length} tareas por terminar.</div>
        </Fragment>
    )
}