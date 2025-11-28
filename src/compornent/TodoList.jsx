import {useState} from "react";
import { useContext } from "react";
import TodoItem from "./TodoItem"
import { TodoContext } from "../Context/TodoContext";


function TodoList({ todos}) {
  // const {todos, Delete, onToggle, onEdit, onUpdate} = useContext(TodoContext);
  const [filter, setFilter] = useState("전체");
  


  function filterTodos(){
    if(filter === "전체") {
      return todos;
    } else if(filter === "미완료") {
      return todos.filter(todo => !todo.done); //미완료일때
    } else if (filter === "완료") {
      return todos.filter(todo => todo.done);
    }
  }

  const todosShow = filterTodos();

  return (
    <div>
        <h2 className='list-title'>할일 목록</h2>
        <div className="filter-wrap">
          <button className={`filter-btn ${filter === "전체" ? "active" : ""}`} onClick={()=> setFilter("전체")}>전체</button>
          <button className={`filter-btn ${filter === "미완료" ? "active" : ""}`} onClick={()=> setFilter("미완료")}>얼른해</button>
          <button className={`filter-btn ${filter === "완료" ? "active" : ""}`} onClick={()=> setFilter("완료")}>다한 거</button>
        </div>

        {
          todosShow.length > 0 ?
          <ul className='todo-list'>
            {todosShow.map((item) => {
              return (
                <TodoItem 
                item={item}
                />
              )
            })}
          </ul>
          :
          <p className='empty-list'>할 일 적으세요</p>
        }
        
     </div>
  )
}

export default TodoList
