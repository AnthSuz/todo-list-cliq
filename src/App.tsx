import React, { useState } from 'react';
import './App.css';
import { CheckCircleOutline, HighlightOff } from '@material-ui/icons';

interface Todo {
  title: string,
  completed: boolean,
  id: number
}

function App() {
  const [input, setInput] = useState<string>('')
  const [todoList, setTodoList] = useState<Todo[]>([])

  /**
   * Function for add task on todo-list
   */
  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    setTodoList((prev) => [
      {
        title: input,
        completed: false,
        id: prev && prev[0] ? prev[0].id + 1 : 0
      },
      ...prev,
    ])
    setInput('')
  }

  /**
   * Function for completed task on todo-list
   */
    const completedTask = (i: number) => {
      const stockTodoList = [...todoList];
      stockTodoList[i].completed = !stockTodoList[i].completed
      setTodoList(stockTodoList)
  }

  /**
   * Function for delete task on todo-list
   */
    const deleteTask = (id: number) => {
    const stockTodoList = [...todoList];
    stockTodoList.splice(todoList.findIndex((t) => t.id === id), 1)
    setTodoList(stockTodoList)
  }

  return (
    <div className="App">
      <header className="App-header">
        Todo-List for Cliq
      </header>
      <form onSubmit={(e) => addTask(e)}>
        <input value={input} onChange={((e) => setInput(e.target.value))} />
        <button disabled={!input.trim()} type="submit">Button</button>
      </form>

      <div>
        {todoList.length ? todoList.map((todo, index) => {
          return (
            <span key={index} className="Task">
              <p className={todo.completed ? 'TaskCompleted' : ''}>{todo.title}</p>
              <CheckCircleOutline className="CheckIcon" onClick={() => completedTask(index)} />
              <HighlightOff className="DeleteIcon" onClick={() => deleteTask(todo.id)} />
            </span>
          )
        }) : <p>No task.</p>}
      </div>
    </div>
  );
}

export default App;
