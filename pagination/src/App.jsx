import { useEffect } from 'react'
import './index.css'
import { useState } from 'react'






const App = () => {
 const[products, setProducts]=useState([])

const fetchProducts = async ()=>{
  const res = await fetch ("https://dummyjson.com/products?limit=100")
  const data = await res.json()

  if(data && data.products){
    setProducts(data.products)
  }
}
console.log(products);
useEffect(()=>{
  fetchProducts()
},[])

  return (
    <div>
      {
        products.length>0 && <div className='"products'>{products.map((item)=>{
          return (
            <span className='products__single' key={item.id}>
              <img src={item.thumbnail} alt={item.title} />
              <span>{item.title}</span>
            </span>
          )
        })}</div>
      }
    </div>
  )
}

export default App