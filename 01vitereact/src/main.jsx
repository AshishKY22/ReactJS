import React, { StrictMode } from 'react'  
// React: needed whenever you manually call React.createElement() (like below)
// StrictMode: a wrapper component that helps catch potential bugs/deprecated 
// patterns in dev mode (doesn't render any visible UI itself)

import { createRoot } from 'react-dom/client'  
// createRoot: React 18+ way to mount a React app to a real DOM node
// (replaces old ReactDOM.render from React 17 and earlier)

import App from './App.jsx'  
// default import — works because App.jsx does `export default App`
// MISTAKE TO AVOID: import path casing must match actual filename on 
// case-sensitive systems (Linux/most build tools)


function MyApp(){
    // a normal functional component — just a JS function returning JSX
    return (
        <div>
            <h1>Custon App !</h1>
            {/* typo: "Custon" should probably be "Custom" — not a bug, just a spelling mistake */}
        </div>
    )
}


const ReactElement = {
    // this is a HAND-WRITTEN plain JavaScript object meant to *mimic* 
    // what React.createElement() produces internally
    type:'a',        // the tag name this "element" represents
    props:{
        href:'https://google.com',
        target:'_blank'
    },
    children:'click me to visit google'
}
// MISTAKE TO AVOID: this object CANNOT be passed directly to render().
// Real React elements have an internal $$typeof: Symbol.for('react.element') 
// marker that React checks for. A plain object like this will NOT work 
// if you try createRoot(...).render(ReactElement) — React will reject it 
// or throw an error. This is only useful to *illustrate* what an element 
// looks like conceptually, not to actually render.


const anotherElement = (
    <a href="https:/google.com" target='_blank'>Visit Google</a>
)
// MISTAKE: "https:/google.com" — only ONE slash after https:
// should be "https://google.com" (two slashes)
// This is JSX — gets compiled to a createElement/jsx() call automatically 
// by the build tool, so you don't need `React` imported for JSX syntax itself


const anotherUser = "chai aur react"
// just a plain string variable


const reactElement = React.createElement(
    'a',/*tags leta hai*/
    // 1st argument: tag/type — "kya banega" (what HTML tag or component)
    
    {href:'https://google.com', target:'_blank'},/*attributes leta hai*/
    // 2nd argument: props object — attributes for that tag
    
    'click me to visit google'/*text*/,
    // 3rd argument: first child (text content)
    
    anotherUser/*variables comes here*/
    // 4th argument: SECOND child — React.createElement can take 
    // MULTIPLE children after the props object: 
    // createElement(type, props, child1, child2, child3, ...)
    // So this <a> tag will render BOTH "click me to visit google" 
    // AND "chai aur react" as sibling text nodes inside the same <a>
)
// NOTE: since `React` is imported at the top now, this line works correctly
// (earlier version was missing the React import — that was the original bug)


createRoot(document.getElementById('root')).render(
    // document.getElementById('root') — grabs the actual <div id="root"> 
    // from index.html where the app gets mounted

    //can also work:: MyApp():: as it is a function
    // MISTAKE TO AVOID: calling MyApp() directly runs the function and 
    // returns JSX — it CAN work for simple cases, but it's NOT the same 
    // as using <MyApp/>. Using <MyApp/> lets React treat it as a proper 
    // component (with its own lifecycle, hooks, re-renders etc).
    // MyApp() just inlines the returned JSX once, with no component identity.

    // <App/>
    // anotherElement
    //<MyApp/>
    reactElement
    // IMPORTANT: whatever is NOT commented out here is what actually 
    // renders on the page. Right now only `reactElement` renders — 
    // App, MyApp, and anotherElement are all commented out, so NONE 
    // of their content will show up in the browser, even if that code 
    // has no errors. This was the root cause of your "App.jsx changes 
    // aren't showing" issue earlier — you have to swap which line is active.
)