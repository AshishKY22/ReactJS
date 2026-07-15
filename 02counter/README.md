# ReactJS

A collection of small React projects and experiments, built while learning React fundamentals — from basic components to understanding what React does under the hood.

## Projects

### 01basicreact
A Create React App setup covering the fundamentals of functional components.
**What I learned:**
- Creating and exporting a functional component (`Chai`)
- Importing a child component into a parent (`App`) and rendering it
- Using JSX fragments (`<>...</>`) to return multiple elements from one component

### 01vitereact
A React app scaffolded with Vite, exploring JSX rules more deeply.
**What I learned:**
- JSX components can only return a single root element — solved using Fragments (`<>...</>`) instead of wrapping everything in an extra `<div>`
- Embedding JavaScript expressions inside JSX using `{}` (e.g. rendering a variable like `username`)
- The difference between a JSX comment (`{/* ... */}`) and plain text — writing a comment incorrectly can make it render literally on the page

### 02counter
A Vite + React counter app focused on React's `useState` hook.
**What I learned:**
- `useState` returns an array: the current state value and a setter function, pulled out via array destructuring
- Why a plain variable (`let counter = 15`) doesn't work for UI updates — React only re-renders when the setter function is called
- Writing event handler functions (`addValue`, `removeValue`) and adding bounds checks so the counter stays within a min/max range
- Passing a function *reference* to `onClick` (`onClick={addValue}`) instead of accidentally calling it immediately (`onClick={addValue()}`)

### customReact
A from-scratch implementation of React's core rendering logic, without using the React library itself.
**What I learned:**
- How a React element is really just a plain JS object (`{ type, props, children }`)
- How React translates that object into real DOM nodes using `document.createElement`
- Looping through `props` to set attributes on the DOM element (while skipping `children`, since that's handled separately)
- A closer look at what React abstracts away for us — turning declarative JSX into imperative DOM operations

## Tech Stack
- React (Create React App & Vite)
- Vanilla JavaScript (for `customReact`)

## Getting Started
Each project folder (except `customReact`) is a standalone React app:

\`\`\`bash
cd <project-folder>
npm install
npm run dev   # or npm start for 01basicreact
\`\`\`

For `customReact`, just open `index.html` in a browser.
