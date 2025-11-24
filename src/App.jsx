import { useEffect, useState } from 'react'
import TodoList from './compornent/TodoList';
import TodoInput from './compornent/TodoInput';
import './App.css'

function App() {
  const [todos, setTodos] = useState(()=> {
    //localStorage에 'todos'라는 이름으로 저장된게 있는지 확인
    const saved = localStorage.getItem("todos");

    if(saved){
      //JSON 문자열을 다시 객체 또는 배열로 변환해서 반환
      return JSON.parse(saved)
    }
    //없으면 그냥 빈 배열로 반환
    return []
  });


  // todos 상태가 바뀔 때 마다 localStorage에 저장 
  useEffect(()=>{
    //원래 배열 객체를 문자열로 바꿔서 저장
    localStorage.setItem("todos", JSON.stringify(todos));
  },[todos]);


  function addTodo(newTodo){
    setTodos([
      ...todos, 
      { 
        // UUID 겹치지 않는 고유한 아이디를 만들때 사용
        id: crypto.randomUUID(),
        text: newTodo, 
        done: false,
        isEditing: false
      }]);
    // 새 항목 추가 시 완료 상태는 flase 
  }


  //수정모드 전환 함수 (수정 버튼 클릭 시)
  function toggleEdit (id){
    const editTodos = todos.map((item)=> {
      if(item.id === id){
        return {...item, isEditing: !item.isEditing}
      }
      return item;
    });
    setTodos(editTodos)
  }

  // 수정완료 함수(저장버튼 클릭 시 발생되는 이벤트)
  function updateTodo (id, newText){
    const updateTodos = todos.map((item)=>{
      if(item.id === id) {
        return {
          ...item, 
          text: newText,
          isEditing: false
          //텍스트를 변경 + isEditing false로 변경
        }
      }
      return item;
    }) 
    setTodos(updateTodos)
  }


  // 할일 완료 상태 이벤트(체크박스)
  function toggleTodo(id) {
    const newTodos = todos.map((item)=> {
      if(item.id === id) { //해당 id가 내가 클릭한 id면 체크가 된 상태로 바꿔줘야함
        return {...item, done: !item.done} //원래 내용은 그대로 두고 done 속성만 반대로 바꿔줌
      }
      return item;
    });

    setTodos(newTodos) //새 배열로 상태 업데이트
  }





  //할일 삭제 함수 filter 함수로 변경
  //filter: 배열을 하나씩 훑으면서 조건에 맞는 거만 새 배열로 반환을 시킴
  //이 자리에 값(item)이 있지만 우린 안쓸 거에요
  //즉 값은 필요 없고 위치(index)만 필요할때
  
  function deleteTodo(id){
    setTodos(todos.filter((item) => item.id !== id))
  }
  
  


  return (
    <div className='app'>
      <h1 className='title'>오늘의 할일</h1>
        <div className="contents">
          {/* 인풋 추가 */}
          <TodoInput onAdd = {addTodo} />

          {/* 목록 */}
          <TodoList todos={todos} Delete={deleteTodo} onToggle={toggleTodo} onEdit={toggleEdit} onUpdate={updateTodo}/>
        </div>
        <p className='copy'>@haeun</p>
     </div>
  )
}

export default App
