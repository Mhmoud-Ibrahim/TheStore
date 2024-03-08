import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'
import   Swal from 'sweetalert2'
import { Typewriter } from 'react-simple-typewriter'
import AOS from 'aos';
import 'aos/dist/aos.css';
function Products() {
  const[title,setTitle]=useState('')
  const[price,setPrice]=useState('')
  const[count,setCount]=useState('')
  const[products,setProducts]=useState([])
  let addform =  document.querySelector('.addproduct')
  let updateform =  document.querySelector('.updateproduct')
 
 const [produdtId,setId]=useState('')
 
 function setreload(){
  window.location.reload()
}
  //set product
   const setproduct = (e)=>{
    e.preventDefault()
    axios.post(`http://localhost:3000/addProduct`,{title,price,count})
    .then(result => {
      if(title && price && count !== null) {
         Swal.fire({
        icon: "success",
        text: `${result.data.message}`,
        showConfirmButton:false,
        timer:2000
      });
      setTimeout(setreload,2000) 
      } else{
        Swal.fire({
          icon: "error",
          text: `data is empty`,
          showConfirmButton:false,
          timer:2000
        });
      }
     }
      
    )
     .catch(err => console.log(err)
     )
   }
   //get products
   const getproducts = ()=>{
    axios.get(`http://localhost:3000/product`)
    .then(result => {
      setProducts(result.data)  
    })
    .catch(err => console.log(err))
   }
   //update product
    const getproductforupdate =(id)=>{
      addform.classList.add('d-none')
      updateform.classList.remove('d-none')
    axios.get(`http://localhost:3000/oneproduct/${id}`,{title,price,count})
    .then(result =>{
      setId(id) 
      setTitle(result.data.title)
      setPrice(result.data.price)
      setCount(result.data.count)
    })
    .catch(err => console.log(err))
    }

    function choosentr(e){
    const td = e.target.parentElement.parentElement
      td.classList.add('table-success')}
    
   const update = (e)=>{
    e.preventDefault();
    axios.put(`http://localhost:3000/update/${produdtId}`,{title,price,count})
    .then(result => {
      console.log(result);
      Swal.fire({
        icon: "success",
        text: `${result.data.message}`,
        showConfirmButton:false,
        timer:2000
      });
      if(result.data.message == 'product is updated successfully'){
        window.location.reload()
      }
      addform.classList.remove('d-none')
      updateform.classList.add('d-none')
    })
     .catch(err => {
      Swal.fire({
        icon: "error",
        text: `${err}`,
        showConfirmButton:false,
        timer:2000
      });
     }
     )}
   // delete product
   const deleteProduct = (id)=>{
    axios.delete(`http://localhost:3000/deleteproduct/`+id)
    .then(result =>{
      console.log(result)
      Swal.fire({
        icon: "success",
        text: `${result.data.message}`,
        showConfirmButton:false,
        timer:2000
      }); 
      setTimeout(setreload,2000) 
    })
    .catch(err => console.log(err))
   }
   //refresh product 
   const refreshproduct = ()=>{
     let refreshicon = document.querySelector('.fa-refresh')
     refreshicon.classList.add('fa-danger')
     window.location.reload()
   }
    //// 
    function addToCart (id){
      axios.post('http://localhost:3000/addToCart/'+id)
      .then(result =>{
        console.log(result.data);
        Swal.fire({
          icon: "success",
          text: `${result.data.message}`,
          showConfirmButton:false,
          timer:2000
        });
        
      })
      .catch(err => console.log(err))
    }


   useEffect(()=>{
    getproducts()
    AOS.init();
   },[])
  return <>
  <div data-aos="zoom-in-right" 
       data-aos-duration="1000"data-aos-easing="ease-in-out" className="container-fluid m-auto w-100">
    <div className="row">
      <div id="productTable" className="col-md-7 vh-100 overflow-auto  mt-5">
      <h3 
      className="position-fixed" > 
      <Typewriter  words={['All Product']}
      loop={5}
      delaySpeed={5000}
      typeSpeed={100} />
      </h3>
    
      
  <table className="table table-border border-dark rounded-1 
  bg-main text-center mt-5">
    <thead >
      <tr >
      <th>code</th>
      <th>title</th>
      <th>price</th>
      <th>count</th>
      <th>acion</th>
      </tr>
    </thead>
    <tbody>
    {products?.map((product)=> <tr onClick={choosentr} 
    key={product._id}>
      <td>{product._id.slice(5,10)}</td>
      <td>{product?.title}</td>
      <td>{product?.price}</td>
      <td>{product?.count}</td>
      <td  className="d-flex justify-content-around  ">
        <button onClick={()=>deleteProduct(product._id)} 
        className="btn btn-sm cursor  btn-danger">delete 
        <i className="fas fa-trash text-light" ></i>
    </button>
    <button onClick={()=>addToCart(product._id)}>addtocart</button>
        <button   onClick={()=>getproductforupdate(product._id)}
         className="btn btn-sm cursof  btn-warning">update
          <i onClick={choosentr} className="fas fa-gears"></i></button>
        <i onClick={refreshproduct} className="fas fa-refresh cursor   
         " ></i>
      
      </td>
    </tr>)}
     
    </tbody>
  </table>
        
      </div>
      {/* add form */}
      <div className="col-md-5 mt-5  py-3">
      <div className="container addproduct  bg-second py-3 ">
      <h3 
      > 
      <Typewriter  words={['add a new product']}
      loop={5}
      delaySpeed={5000}
      typeSpeed={100} />
      </h3>
        <form onSubmit={setproduct}>
          <label htmlFor="title" className="">product name</label>
          <input type="text" name="title" id="title" placeholder="title..."
          className="form-control mb-2 border-2 shadow "
          onChange={(e)=>setTitle(e.target.value)}
          />
          <label htmlFor="price" className="">price</label>
          <input type="number" name="price" id="price"  placeholder="price..."
          className="form-control mb-2 border-2 shadow "
          onChange={(e)=>setPrice(e.target.value)}
          />
          <label htmlFor="count" className="">count </label>
          <input type="number" name="count" id="count" placeholder="count..."
          className="form-control mb-2 border-2 shadow "
          onChange={(e)=>setCount(e.target.value)}
          />

        <div className="w-50 m-auto text-center ">
        <button className="btn btn-outline-success py-1 mt-1 px-5 mb-2 ">add+</button>
          <i onClick={refreshproduct} className="fas fa-refresh cursor text-primary mx-5 shadow fa-1x" ></i>
        </div>
        </form>
        <div className="btns d-flex justify-content-end w-100 ">
      <Link to={'/'} className="btn btn-sm btn-success cursof px-3">Out</Link>
      <Link to={'/clients'} className="btn btn-sm mx-3 cursof btn-main px-2">Clients</Link>
        </div>
      </div>
      {/* update form */}
      <div className="container updateproduct d-none bg-second py-3 ">
      <h3> 
      <Typewriter  words={['Update Product']}
      loop={5}
      delaySpeed={2500}
      typeSpeed={100} />
      </h3>
      
        <form onSubmit={update}>
          <label htmlFor="title" className="">product name</label>
          <input type="text" name="title" id="title" placeholder="title..."
          className="form-control mb-2 border-2 shadow "
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          />
          <label htmlFor="price" className="">price</label>
          <input type="number" name="price" id="price"  placeholder="price..."
          className="form-control mb-2 border-2 shadow "
          value={price}
          onChange={(e)=>setPrice(e.target.value)}
          />
          <label htmlFor="count" className="">count </label>
          <input type="number" name="count" id="count" placeholder="count..."
          className="form-control mb-2 border-2 shadow "
          value={count}
          onChange={(e)=>setCount(e.target.value)}
          />

        <div className="w-50 m-auto text-center ">
        <button className="btn btn-outline-success py-1 mt-1 px-5 mb-2 ">update</button>
          <i onClick={refreshproduct} className="fas fa-refresh cursor text-primary mx-5 shadow fa-1x" ></i>
        </div>
        </form>
        <div className="btns d-flex justify-content-end w-100 ">
      <Link to={'/'} className="btn btn-sm btn-success cursof px-3">Out</Link>
      <Link to={'/clients'} className="btn btn-sm mx-3 cursof btn-main px-2">Clients</Link>
        </div>
      </div>
    
      
      </div>
    </div>
  </div>
  </>
}

export default Products
