import { useState, useCallback, useEffect,useRef } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [character,setCharacter] = useState(false);

  const [password,setPassword] = useState("")

  //copy:: useRef hook
  const passwordRef = useRef(null) 


  //password generate//memory me bhej rhe
  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "0123456789"
    if(character) str += "!@#$%^&*{}[]()?_-~"

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  },[length,numberAllowed,character,setPassword])

  //copying the passowrd to the clipboard
  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,100)
    window.navigator.clipboard.writeText(password)
  },[password])

  //run karne ka goal
  useEffect(()=>{
    passwordGenerator()
  },[length , numberAllowed,character,passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700' >TEST

      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text"
        value = {password}
        className= 'outline-none w-full py-1 px-3'
        placeholder='Password'
        readOnly
        ref={passwordRef} />

        <button 
        onClick = {copyPasswordToClipboard}    className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
      </div>


      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range"
          min = {6}
          max= {100}
          value = {length}
          className = 'cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}} />
          <label>Length:{length}</label>
        </div>
        <div className = 'flex items-center gap-x-1'>
          <input type="checkbox" 
          defaultChecked = {numberAllowed}
          id='numberInput'
          onChange={()=>{
            setNumberAllowed((prev)=>!prev);
          }}/>
          <label>Numbers</label>
        </div>
        <div className = 'flex items-center gap-x-1'>
          <input type="checkbox" 
          defaultChecked = {character}
          id='charInput'
          onChange={()=>{
            setCharacter((prev)=>!prev);//previous jo value hai usko change kardo
          }}/>
          <label>Characters</label>
        </div>
      
      </div>
      </div>
    </>
  )
}

export default App
