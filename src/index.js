import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import ToDoList from "./Components/ToDoList/ToDoList";

ReactDOM.render(
    <div>
        <ToDoList />
    </div> , document.getElementById('root'));

serviceWorker.unregister();
