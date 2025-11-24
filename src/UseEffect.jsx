// import { useState } from 'react'
import { useState, useEffect } from 'react'
// import './App.css'

const Timer = ()=>{
    useEffect(()=> {
        const timer = setInterval(()=>{
            console.log('타이머 돌아가는 중 ing...')
        }, 1000);

        return ()=> {
            clearInterval(timer);
            
        }
    });

    return(
        <>
        <p>타이머 시작!</p>
        </>
    )
}

function UseEffect() {
  useEffect(()=>{
    console.log('처음만 실행')
  },[]);


  const [showTimer, setShowTimer] = useState(false);

  return (
    
    <>
        {/* showTimer가 true 일때만 <Timer/> 보여주는 것 */}
        {showTimer && <Timer />}
        <button onClick={()=> setShowTimer(!showTimer)}>
            토글 버튼
        </button>
    </>
  )
}

export default UseEffect
