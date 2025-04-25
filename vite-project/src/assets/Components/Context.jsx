import { createContext,useState } from "react";

const context = createContext();

const ContextProvider = ({children}) =>{
const [cart, setcart] = useState([])
const [quantity, setquantity] = useState(1)

    return <>
     <context.Provider value={{cart,setcart,setquantity,quantity}}>
    {children}
    </context.Provider>
    </>
}

export default context 
export {ContextProvider}