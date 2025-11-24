import {useState} from "react";


function TodoList({todos, Delete, onToggle, onEdit, onUpdate}) {

  const [filter, setFilter] = useState("전체");
  const [editText, setEditText] = useState("");


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

              const edit = item.isEditing;

              const editView = (
              <li key={item.id} id={item.id}>

                {/* 수정중 화면 */}
               <input type="text" className="edit-input" value={editText} onChange={(e)=> setEditText(e.target.value)} />
               <button className="save-btn" onClick={()=> {onUpdate(item.id, editText)}}>저장</button>
               <button className="cancel-btn" onClick={()=> {onEdit(item.id)}}>취소</button>
              </li>
              )


              {/* 리스트 출력화면  */}
              const normalView = (
              <li key={item.id} id={item.id}>

                <input type="checkbox" checked={item.done} onChange={()=> onToggle(item.id)}/>
                {/* 조건문, 삼항연산자형식 */}
                {
                 item.done
                  ? <del>{item.text}</del>
                  : <span>{item.text}</span>
                }
              <button className="edit-btn" 
              onClick={
                ()=>{
                  onEdit(item.id); //수정중 화면으로 전환시키는 것 상태를 변화시키는 (isEditing -> true)
                  setEditText(item.text);//수정할 때 기존 텍스트를 기존창에 넣는 요소
                }
                
              }
              >다시 쓸래</button>
              <button className="delete-btn" onClick={()=> Delete(item.id)}>안할래</button>
              </li>

              );

              return( edit ?  editView : normalView)
            })}
          </ul>
          :
          <p className='empty-list'>할 일 적으세요</p>
        }
        
     </div>
  )
}

export default TodoList
