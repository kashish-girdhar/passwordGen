import { useState,useCallback,useEffect,useRef } from 'react'

function App() {
  const [length,setLength]=useState(8);
  const [numberAllowed,setNumberAllowed]=useState(false);
  const [characterAllowed,setCharacterAllowed]=useState(false);
  const[password,setPassword]=useState("")

  //useRef hook it takes the refernce 
  const passwordRef=useRef(null)
  //usecallback carries functions and dependencies it memories the function 
  const passwordGenertor=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed){
      str+="0123456789"
    }
    if(characterAllowed){
      str+="!@#$%^&*()`{}[]|\~=+_-"
    }
    for(let i=0;i<=length;i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setPassword(pass)
    },[length,numberAllowed,characterAllowed,setPassword])

    const copyPasswordToClip=useCallback(()=>{
      passwordRef.current?.select();
      passwordRef.current?.setSelectionRange(0,999);
      window.navigator.clipboard.writeText(password)
    },
  [password])

//jb bhi page reload hoga tbhi useEffect hook use hoga
    useEffect(()=>{passwordGenertor()},[length,numberAllowed,characterAllowed,passwordGenertor])

  return (
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-white text-center my-3'>Password generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text"
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={passwordRef}
        />
        <button onClick={copyPasswordToClip}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shink-0'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type='range'
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}/>
          <label>Length : {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type='checkbox'
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={()=>{
            setNumberAllowed((prev)=>!prev);
          }}/>
          <label htmlFor='numberInput'>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type='checkbox'
          defaultChecked={characterAllowed}
          id="charInput"
          onChange={()=>{
            setCharacterAllowed((prev)=>!prev);
          }}/>
          <label htmlFor='charInput'>Character</label>
        </div>
      </div>
     </div>
  )
}

export default App
