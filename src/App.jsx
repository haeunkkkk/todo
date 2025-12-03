import { useEffect, useReducer } from 'react'
import { TodoContext } from './Context/TodoContext';
import TodoList from './compornent/TodoList';
import TodoInput from './compornent/TodoInput';
import './App.css'

const todosReducer = (state, action)=> {
  switch(action.type) {
    // 추카
    case 'ADD':
    return [
      ...state, {
          id: crypto.randomUUID(),
          text: action.payload, 
          done: false,
          isEditing: false
      }
    ]
    // 삭제
    case 'DELETE' :
      return state.filter((item) => item.id !== action.payload)

    case 'TOGGLE' :
      return  state.map((item)=> {
      if(item.id === action.payload) { 
        return {...item, done: !item.done} 
      }
      return item;
    });

    case 'TOGGLE_EDIT': return state.map((item)=> {
      if(item.id === action.payload){
        return {...item, isEditing: !item.isEditing}
      }
      return item;
    });

    case 'UPDATE_TODO': return state.map((item)=>{
      if(item.id === action.payload.id) {
        return {
          ...item, 
          text: action.payload.text,
          isEditing: false
        }
      }
      return item;
    }) 

  }
}

function App() {
  let initialTodos = [];
    const saved = localStorage.getItem("todos");

    if(saved){
      initialTodos = JSON.parse(saved);
    }
    //없으면 그냥 빈 배열 [] 출력한다는 것

    const [todos, dispatch] = useReducer(todosReducer, initialTodos)

  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos));
  },[todos]);


  function addTodo(newTodo){
    dispatch ({
      type: 'ADD',
      payload: newTodo,
    })
  }


  function toggleEdit (id){
    dispatch ({
      type: 'TOGGLE_EDIT',
      payload: id,
    })
  }

  function updateTodo (id, newText){
    dispatch ({
      type: 'UPDATE_TODO',
      payload: {
        id: id,
        text: newText
      }
    })
  }

  function toggleTodo(id) {
    dispatch({
      type: 'TOGGLE',
      payload: id,
    })
  }


  
  function deleteTodo(id){
    dispatch({
      type: 'DELETE',
      payload: id,
    })
  }
  
  


  return (
    <div className='app'>
      <h1 className='title'>오늘의 할일</h1>
        <div className="contents">
         
          <TodoInput onAdd = {addTodo} />

   
          <TodoContext.Provider value={{
            deleteTodo,
            toggleTodo,
            toggleEdit,
            updateTodo
          }}>
            <TodoList todos={todos} />
          </TodoContext.Provider>
        </div>
        <p className='copy'>@haeun</p>
     </div>
  )
}

export default App
