import { createContext, useState, useEffect } from "react";

const context = createContext();

const ContextProvider = ({ children }) => {

    const [cart, setcart] = useState(() => {
        try {
            const content = localStorage.getItem("cart")

            if(content && content !== undefined){
                return JSON.parse(content)
            }
            return []

        } catch (error) {
            console.log("Error ocuurs")
            return[]
        }
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    return (
        <context.Provider value={{ cart, setcart }}>
            {children}
        </context.Provider>
    );
}

export default context;
export { ContextProvider };
