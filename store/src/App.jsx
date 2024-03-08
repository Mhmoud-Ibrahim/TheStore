import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./components/Layout"
import Notfound from "./components/Notfound"
import Products from "./components/Products"
import Home from "./components/Home"
import Clients from "./components/Clients"
import ClientCart from "./components/ClientCart"
function App() {
  const routers = createBrowserRouter([
    {path:'',element:<Layout/>,children:[
      {index:true,element:<Home/>},
      {path:'/',element:<Home/>},
      {path:'products',element:<Products/>},
      {path:'clients',element:<Clients/>},
      {path:'cart',element:<ClientCart/>},
      {path:'*',element:<Notfound/>},
    ]}
  ])
  return <RouterProvider router={routers} ></RouterProvider>
}

export default App
