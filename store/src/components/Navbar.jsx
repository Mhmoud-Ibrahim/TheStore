import {Link}from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
function Navbar() {

  //animation navbar
document.addEventListener('scroll',()=>{
  let windoheight = window.scrollY
  const navbar = document.querySelector('.navbar')
  if(windoheight > 0){
   navbar.classList.replace('bg-second','bg-main')
   navbar.classList.replace('py-0','py-2')
  }else{
    document.querySelector('.navbar').classList.replace('bg-main','bg-second')
    navbar.classList.replace('py-2','py-0')
  }
})
//animation navbar

  useEffect(()=>{
    AOS.init();
  },[])
  return <>
   <nav className="navbar navbar-expand-lg navbar-light bg-second py-0 darkColor  fixed-top shadow">
  <div className="container">
    <Link data-aos="zoom-in-down" data-aos-duration="1500" className="navbar-brand " to="/">Store
    <i className='fas fa-house  fa-1x text-main' ></i>
    </Link>

    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
     data-bs-target="#navbarNav" aria-controls="navbarNav" 
     aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"> </span>
    </button>

    <div className="collapse navbar-collapse " id="navbarNav">
      
      <ul className="navbar-nav  m-auto">
        <li data-aos="zoom-in-down" data-aos-duration="200" 
        className="nav-item">
        <Link className="nav-link active text-main" aria-current="page"
          to="/">Home
        </Link>
        </li>

        <li data-aos="zoom-in-down" data-aos-duration="500"  
        className="nav-item">
        <Link className="nav-link " to="products">Products
        </Link>
        </li>
        <li data-aos="zoom-in-down" data-aos-duration="1100"
        className="nav-item">
        <Link className="nav-link" to="clients">Clients
        </Link>
        </li>
        <li data-aos="zoom-in-down" data-aos-duration="2000"
        className="nav-item">
        <Link className="nav-link" to="print">dddd
        </Link>
        </li>
        <li data-aos="zoom-in-down" data-aos-duration="2000"
        className="nav-item">
        <Link className="nav-link" to="cart">Cart
        </Link>
        </li>
        <li data-aos="zoom-in-down" data-aos-duration="2300"
        className="nav-item">
        <Link className="nav-link" to="contact">Contact
        </Link>
        </li>
      </ul>
    
    </div>
  </div>
</nav>
  </>
}

export default Navbar
