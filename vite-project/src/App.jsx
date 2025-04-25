import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './assets/Components/Home'
import Cart from './assets/Components/Cart'
import { ContextProvider } from './assets/Components/Context'
function App() {
const router = createBrowserRouter([
  {
    path :"/",
    element : <Home/>
  },
  {
    path :"/Cart",
    element : <Cart/>
  }
])
  return (
    <ContextProvider>   
      <RouterProvider router={router}/> 
    </ContextProvider>
    
  )
}

export default App
