import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Card from './components/card'

function App() {
 let myObj = {
        username:"Ashish",
        age:21
    }
let newArr = [1,2,3,4]
  return (
    <>
     <h1 className='bg-green-400 text-black p-4 rounded-xl mb-4'>Tailwind Test</h1>
    <Card username = "chaiaurcode" someObject = {newArr} />
    <Card username = "hitesh" />
    <Card username = "Ashish" btnText = "visit Me"/>
    {/* now i want the names to be different in different cards:::props */}
    </>
  )
}

export default App
