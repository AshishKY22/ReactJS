import { useState } from 'react'
// useState is a React Hook — lets a functional component "remember" 
// values across re-renders. Without it, a normal `let` variable would 
// reset to its initial value every time the component re-renders.

import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
// these are unused in the current JSX below — imported but never 
// rendered anywhere. Not an error, just dead imports (safe to remove 
// later if you don't plan to use them, keeps the file cleaner)

import './App.css'
// CSS import — Vite bundles this automatically, applies globally 
// to this component (and technically to the whole app, since CSS 
// isn't scoped by default in plain .css imports)


function App() {

  //using hooks
  //changing the state::propagated to our dom::UI
  let [counter,ashishCounter] = useState(15/*default value anything*/) 
  // useState(15) returns an ARRAY with exactly 2 items:
  //   [0] -> current state value (here: counter, starts at 15)
  //   [1] -> a function to UPDATE that state (here: ashishCounter)
  // Array destructuring pulls both out in one line.
  // Calling ashishCounter(...) is the ONLY correct way to update 
  // `counter` — it tells React "re-render this component with 
  // the new value."
  // MISTAKE TO AVOID: `let` here doesn't mean you can do counter++ 
  // or counter = counter + 1 directly and expect the UI to update — 
  // React has NO IDEA a plain variable reassignment happened, so 
  // the screen won't re-render. Only calling the setter function 
  // (ashishCounter) triggers a re-render.

  //let counter = 15;
  // ^ this commented line shows what NOT to do — a plain variable 
  // like this would reset to 15 on every re-render and manually 
  // changing it would never update the UI, since React wouldn't 
  // know to re-render.

  const addValue = ()=>{
    // console.log("Value added",Math.random());
    // console.log("clicked",Math.random());
    
    // counter = counter + 1;
    // ^ commented out correctly — direct mutation like this does 
    // NOT work with useState. It would either throw an error 
    // (since counter is meant to be treated as read-only state) 
    // or simply not reflect on screen even if it doesn't error.

    if(counter <= 19){
       ashishCounter(counter + 1);
       // calls the state setter with the new value -> triggers re-render
       // MISTAKE TO WATCH: using `counter` directly here (instead of 
       // a functional update like ashishCounter(prev => prev + 1)) 
       // can cause stale/incorrect values if addValue is called 
       // multiple times rapidly before a re-render completes (state 
       // batching issue). Works fine for simple single clicks though.
    }
    // NOTE: condition allows adding when counter <= 19, so max 
    // reachable value is 20 (19 + 1). If you intended the max to 
    // be 19, this condition should be `counter < 19`.
  }

  const removeValue = ()=>{
    if(counter > 0){
       ashishCounter(counter - 1);
    }
    // similar note: no upper safety net here other than >0 check, 
    // this one is fine — stops exactly at 0
  }

  return (
    <>
      <h1>Chai aur React</h1>
      <h2>Counter value: {counter}</h2>
      {/* {counter} inserts the current state value as text */}

      <button onClick={addValue}>Add Value{counter}</button>
      {/* onClick={addValue} — passes the FUNCTION REFERENCE, not 
          calling it immediately. 
          MISTAKE TO AVOID: onClick={addValue()} would call the 
          function immediately on render (not on click) and cause 
          bugs/infinite loops in some cases — always pass the 
          reference, not the invocation, unless wrapped in an 
          arrow function like onClick={() => addValue()} */}

      <br />
      <button onClick={removeValue}>Remove Value {counter}</button>
      <p>{counter}</p>
      {/* just displaying counter again, redundant with h2 above 
          but harmless — useful for confirming state updates 
          visually in multiple places */}
    </>
  )
}

export default App