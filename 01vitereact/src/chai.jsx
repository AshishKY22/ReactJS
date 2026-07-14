function Chai(){
    // a simple functional component, no props used
    return(
        <h2>chai is ready</h2>
    )
}

export default Chai
// default export — this is why "import Chai from './chai'" (no curly braces) 
// works in App.jsx. If this were a NAMED export instead 
// (export const Chai = ...), you'd need: import { Chai } from './chai'