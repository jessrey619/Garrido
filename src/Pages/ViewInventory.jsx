import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios';

export const ViewInventory = () => {
    const [products, setProducts] = useState([]);
    const nav = useNavigate()

    useEffect(() => {
      const fetchData = async () => {
        try {
          // Make a GET request using axios
          const response = await axios.get('http://127.0.0.1:5000/products');
  
          // Update state with the data received from the server
          setProducts(response.data);
        } catch (error) {
          // Handle errors if the request fails
          console.error('Error fetching data:', error);
        }
      };
      // Call the fetchData function when the component mounts
      fetchData();
    }, []);

    const handleItemClick = (productId) => {
      nav(`/modifyProduct/${productId}`)
    }
  
    return (
      <div style={{marginLeft:'10%', marginTop:'5%'}}>
      <div style={{display:'flex', fontWeight:'bold', marginBottom:'10px', width:'80%', backgroundColor:'red'}}>
                  <div style={{textAlign:'center', marginRight: '10px', width:'25%'}}>
                    Name</div>
                    <div style={{textAlign:'center', marginRight: '10px', width:'25%'}}>
                    Category</div>
                    <div style={{textAlign:'center', marginRight: '10px', width:'25%'}}>
                    Price</div>
                    <div style={{textAlign:'center', marginRight: '10px', width:'25%'}}>
                    Stock</div>
      </div>
      <div>
        {products.map((product) => (
          <div key={product.product_id}>
            <button
            key={product.product_id}
            className='appListLinkToAppointment'
            onClick={()=>{handleItemClick(product.product_id)}}
            style={{
              width:'80%'
            }}
          >
            <div
              key={product.product_id}
              className='appListItem'
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <div className='appListTxtForDate' style={{ marginRight: '10px', width: '25%' }}>
                {product.product_name}
              </div>
              <div className='appListTxtForDate' style={{ marginRight: '10px', width: '25%' }}>
                {product.category_name}
              </div>
              <div className='appListTxtForDate' style={{ marginRight: '10px', width: '25%' }}>
                {product.price}
              </div>
              <div className='appListTxtForDate2' style={{ textAlign: 'center', width: '25%' }}>
                {product.stock_status}
              </div>
            </div>
          </button>
          </div>
        
          
        ))}
      </div>
      
      </div>
      
    );
}