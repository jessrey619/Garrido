import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ModifyProduct = () => {
    const { productId } = useParams(); // Use correct variable name
    const nav = useNavigate();

    const [selectedItemData, setSelectedItemData] = useState(null);
    const [options, setOptions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('')
    const [itemName, setItemName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    const getCategoryNameById = (categoryId) => {
        const selectedCategory = options.find((option) => option.category_id === categoryId);
        return selectedCategory ? selectedCategory.category_name : '';
    };

    const handleCategoryChange = (event) => {
        const selectedCategoryId = event.target.value;
        setSelectedCategory(selectedCategoryId);
    };

    const handleItemNameChange = (event) => {
        setItemName(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleConfirmUpdate = () =>{
        const fetchData = async () => {
            try {
                const response = await axios.put(`http://127.0.0.1:5000/specProduct/${productId}`, 
                {
                category_id: selectedCategory,
                price: parseInt(price) || 0,
                product_id: productId,
                product_name: itemName,
                quantity: parseInt(quantity) || 0, 
                }
                );
                console.log(response.data);
                alert("Update Successful")
                nav("/view-inventory")
            } catch (error) {
               console.error('Error fetching data:', error);
            }
        };
      
        fetchData();
    }

    const handleConfirmDelete = () => {
        // Display a confirmation dialog
        const isConfirmed = window.confirm('Are you sure you want to delete this product?');
    
        // Check if the user confirmed the action
        if (isConfirmed) {
            const fetchData = async () => {
                try {
                    const response = await axios.delete(`http://127.0.0.1:5000/products/${productId}`);
                    console.log("Delete Successful: ", response);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
    
            fetchData();
            nav("/view-inventory")
        } else {
            // User canceled the action
            console.log('Delete canceled by user');
        }
    }
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/specProduct/${productId}`);
                setSelectedItemData(response.data)
                console.log(response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        
    }, [productId]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/tableCategories');
                setOptions(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);



    if (selectedItemData === null) {
        // You might want to render a loading state or handle the case when data is still being fetched
        return <div>Loading...</div>;
    }

    return (
        <>
            <div style={{display:'flex'}}>
                <div className="lefSide">
                    <span>Current Data</span>
                    <div className="header">
                        <div>
                            <span style={{fontWeight:'bold'}}>Product Name: </span> <span>{selectedItemData.product_name}</span> <br/>
                            <span style={{fontWeight:'bold'}}>Category: </span> <span>{getCategoryNameById(selectedItemData.category_id)}</span><br/>
                            <span style={{fontWeight:'bold'}}>Price: </span> <span>{selectedItemData.price}</span><br/>
                            <span style={{fontWeight:'bold'}}>Quantity: </span> <span>{selectedItemData.quantity}</span>
                        </div>
                    </div>
                </div>


                <div className="rightSide" style={{marginLeft:'2%'}}>
                    <span>New Data</span>
                    <div className="header">
                        <div>
                            <span style={{fontWeight:'bold'}}>Product Name: </span> 
                            <span>
                                <input
                                    id="itemName"
                                    placeholder="Item Name"
                                    value={itemName}
                                    onChange={handleItemNameChange}
                                /></span> <br/>
                            <span style={{fontWeight:'bold'}}>Category: </span>
                                <span>
                                    <select
                                        onChange={handleCategoryChange}
                                        value={selectedCategory}
                                        placeholder="Category"
                                    >
                                        <option value="">Select a category</option>
                                        {options.map((option) => (
                                            <option key={option.category_id} value={option.category_id}>
                                                {option.category_name}
                                            </option>
                                        ))}
                                    </select>
                                </span><br/>

                            <span style={{fontWeight:'bold'}}>Price: </span> 
                            <span>
                                <input
                                id="price"
                                placeholder="Price"
                                value={price}
                                onChange={handlePriceChange}
                            /></span><br/>
                            <span style={{fontWeight:'bold'}}>Quantity: </span>
                            <span>
                                <input
                                    id="quantity"
                                    placeholder="Quantity"
                                    type="number"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <button className="cancel">Cancel</button>
            <button className="confirm" onClick={handleConfirmUpdate}>Confirm Modify</button>
            
            
            <br/>
            <button style={{marginTop:'5%', backgroundColor:'red'}} onClick={handleConfirmDelete} >Delete Product From Inventory</button>
        </>
    );
};
