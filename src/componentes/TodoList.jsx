import React from 'react';
import {TodoItem} from './TodoItem';

export function TodoList({todos, toggleTodo}){
    return ( 
    <ul>
        
        {todos.map((aTodo)=>(
            <TodoItem key={aTodo.id} todo={aTodo} prioridad={aTodo.prioridad} toggleTodo={toggleTodo}/>
      
        ))}
    </ul>
    );
}