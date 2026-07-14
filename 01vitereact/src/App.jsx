import Chai from "./chai"

function App() {
  const username = "chai aur code"
  return (
    // <Chai/>
    // i can export only one elemrnt
    // <h1></h1>
    //but ek element me bohot sare element ho skte hai
    // <div>
    //   <Chai/>
    //   <h1>chai aur react</h1>
    //   <p>test para</p>
    // </div>

    //FRAGMENT
      <>
       <Chai/>
      <h1>chai aur react {username}</h1>
      {/* evaluated expression, treated as variable */}
      <p>test para</p>
      </>
  )
}

export default App





// /* evaluated expression,treated as variable*/ moved out of the <h1> tag
// Previously it sat right after {username} but outside the curly braces — that made it plain JSX text, so it was literally printing on the page inside your heading. It's now a proper JSX comment {/* ... */} placed on its own line, so it's ignored at runtime and only visible to you in the code.
// Nothing else was actively running before, so nothing else needed disabling
// All the other unused blocks (<h1></h1>, the <div> wrapper version, <Chai/> alone) were already commented out by you — those are correctly non-executing and just serve as your notes/history of what you tried. I left them as-is since removing them would lose your revision trail.