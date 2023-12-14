import axios from "axios";
import { useEffect, useState } from "react";

export const AddToInventory = () => {
    const [options, setOptions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();
    const [itemName, setItemName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

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

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/products', {
                p_product_name: itemName,
                p_price: parseFloat(price),
                p_quantity: parseInt(quantity),
                p_category_id: parseInt(selectedCategory),
            });

            console.log('Product added successfully:', response.data);
            // Optionally, you can reset the form fields after successful submission
            setItemName('');
            setPrice('');
            setQuantity('');
            setSelectedCategory('');
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ width: '50%', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <input
                    id="itemName"
                    placeholder="Item Name"
                    value={itemName}
                    onChange={handleItemNameChange}
                    style={{ marginBottom: '10px', padding: '12px', width: '100%', boxSizing: 'border-box', fontSize: '16px' }}
                />
                <select
                    onChange={handleCategoryChange}
                    value={selectedCategory}
                    placeholder="Category"
                    style={{ marginBottom: '10px', padding: '12px', width: '100%', boxSizing: 'border-box', fontSize: '16px' }}
                >
                    <option value="">Select a category</option>
                    {options.map((option) => (
                        <option key={option.category_id} value={option.category_id}>
                            {option.category_name}
                        </option>
                    ))}
                </select>
                <input
                    id="price"
                    placeholder="Price"
                    value={price}
                    onChange={handlePriceChange}
                    style={{ marginBottom: '10px', padding: '12px', width: '100%', boxSizing: 'border-box', fontSize: '16px' }}
                />
                <input
                    id="quantity"
                    placeholder="Quantity"
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    style={{ marginBottom: '10px', padding: '12px', width: '100%', boxSizing: 'border-box', fontSize: '16px' }}
                />
                <button
                    onClick={handleSubmit}
                    style={{
                        padding: '12px',
                        width: '100%',
                        backgroundColor: '#4CAF50',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '5px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};
