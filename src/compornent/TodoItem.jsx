import {useState} from "react";
import { useContext } from "react";
import { TodoContext } from "../Context/TodoContext";


function TodoItem({item}){
    const {deleteTodo,
            toggleTodo,
            toggleEdit,
            updateTodo} = useContext(TodoContext);
    const edit = item.isEditing;
    const [editText, setEditText] = useState("");

    const editView = (
          <li key={item.id} id={item.id}>

            {/* 수정중 화면 */}
           <input type="text" className="edit-input" value={editText} onChange={(e)=> setEditText(e.target.value)} />
           <button className="save-btn" onClick={()=> {updateTodo(item.id, editText)}}>저장</button>
           <button className="cancel-btn" onClick={()=> {toggleEdit(item.id)}}>취소</button>
          </li>
          )


          {/* 리스트 출력화면  */}
          const normalView = (
          <li key={item.id} id={item.id}>

            <input type="checkbox" checked={item.done} onChange={()=> toggleTodo(item.id)}/>
            {/* 조건문, 삼항연산자형식 */}
            {
             item.done
              ? <del>{item.text}</del>
              : <span>{item.text}</span>
            }
          <button className="edit-btn" 
          onClick={
            ()=>{
              toggleEdit(item.id); //수정중 화면으로 전환시키는 것 상태를 변화시키는 (isEditing -> true)
              setEditText(item.text);//수정할 때 기존 텍스트를 기존창에 넣는 요소
            }
            
          }
          >다시 쓸래</button>
          <button className="delete-btn" onClick={()=> deleteTodo(item.id)}>안할래</button>
          </li>

          );

    return (
        ( edit ?  editView : normalView)
    )
}

export default TodoItem;