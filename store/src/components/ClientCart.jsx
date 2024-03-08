import axios from "axios"
import { useEffect, useState } from "react";
import   Swal from 'sweetalert2'
import AOS from 'aos';
import 'aos/dist/aos.css';
function ClientCart() {
  const [carts,setCarts]=useState([])
  const [numberOfCarts,setNumberOfCarts]=useState(0)
  //get carts
  
  function setreload(){
    window.location.reload()
  }
const getcarts =()=>{
  axios.get(`http://localhost:3000/carts`)
  .then(result => {
    setNumberOfCarts(result.data.length);
    setCarts(result.data)
  })
  .catch(error => console.log(error))
}
//delete cart
const deleteCart =(id)=>{
  axios.delete(`http://localhost:3000/deletecart/${id}`)
  .then(result => {
    console.log(result.data);
    Swal.fire({
      icon: "success",
      text: `${result.data.message}`,
      showConfirmButton:false,
      timer:2000
    });
    setTimeout(setreload,1800)
  })
  .catch(error => console.log(error))
}

//delete all carts
const deleteAllCarts =()=>{
  axios.delete(`http://localhost:3000/deleteall`)
  .then(result => {
    console.log(result.data);
    Swal.fire({
      icon: "success",
      text: `${result.data.message}`,
      showConfirmButton:false,
      timer:2000
    });
    setTimeout(setreload,1800)
  })
  .catch(error => console.log(error))
}
useEffect(()=>{
  getcarts();
  AOS.init();
},[])
  return <>
  <div className="container mt-4">
    <div className="row g-4 w-75 m-auto mt-5">
      <div className="bg-second rounded-1 py-1 w-75 m-auto 
       d-flex justify-content-around"
       data-aos="zoom-in-down" 
       data-aos-duration="2500"data-aos-easing="ease-in-out"
       >
        <h4 className="text-dark"> number of carts: <span className="text-danger fw-bold">{numberOfCarts}</span> cart</h4>
        <button onClick={deleteAllCarts}
         className="btn btn-outline-danger btn-sm position-relative ">Clear all
          <i className="fas fa-trash text-danger" ></i>
          <span  className="badge position-absolute  bg-main">warning!</span>
          </button>
      </div>
      {carts?.map((cart)=><div  key={cart._id}
       className="cart bg-main shadow border border-success
        shadow rounded-1 py-3  border-2 d-flex justify-content-around" 
        data-aos="fade-right" 
        data-aos-duration="1000"data-aos-easing="ease-in-out"
        >
        <h4 className="text-dark fw-bold">ID: 
        <span className="text-success " >{cart._id.slice(0,6)}</span></h4>
        <h4 className="text-muted fw-bold">{cart.title}</h4>
        <h4 className="text-muted fw-bold">{cart.price}</h4>
        <h4 className="text-muted fw-bold">{cart.count}</h4>
        <div>
          <button onClick={()=>deleteCart(cart._id)} className="btn btn-sm btn-outline-danger mb-2">delete  <i className="fas fa-trash text-danger" ></i>  </button>
        </div>
      </div>  )}
      
    </div>
  </div>
  
  </>
}

export default ClientCart
