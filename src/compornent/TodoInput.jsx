import { useState } from 'react'

function TodoInput ({onAdd}) {
  const [newText, setNewText] = useState("");
  
  function addNewText(){
    //trim()
    if(newText.trim() === "") {
      return setNewText("")
    }
    onAdd(newText)
    setNewText('')
  }

  // keypress, keyDown, keyUp 
  //enter 키 이벤트 처리
  function keyDown(e){
    if(e.key === 'Enter') {
      addNewText()
      //이벤트 키가 enter키면 addNewText() 함수 호출
    }
  }


  return (
      <div>
        <h2 className='list-title'>할일 추가</h2>
        <div className='input-wrap'>
          <input type="text" placeholder='할일을 입력해주세요' value={newText} onChange={(e)=> setNewText(e.target.value)} className='input-add' onKeyDown={keyDown}/>
          <button onClick={addNewText}>추가하기</button>
        </div>
      </div>
  )
}


export default TodoInput
