import axios from "axios";
import { useEffect, useState } from "react";

export const UpdateStock = () => {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState();
    const [stockAmount, setStockAmount] = useState('');
    const [selectedItemData, setSelectedItemData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/products');
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleItemChange = (event) => {
        const selectedItemId = event.target.value;
        setSelectedItem(selectedItemId);
    };

    useEffect(() => {
        if (selectedItem !== null) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://127.0.0.1:5000/specProduct/${selectedItem}`);
                    setSelectedItemData(response.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData();
        }
    }, [selectedItem]);

    const handleSubmit = () => {
        // Check if a valid item is selected
        if (selectedItemData.length === 0) {
            console.error('No item selected.');
            return;
        }
        // Create a new object with updated quantity
        const updatedStockData = {
            category_id: selectedItemData.category_id,
            price: selectedItemData.price,
            product_id: selectedItemData.product_id,
            product_name: selectedItemData.product_name,
            quantity: parseInt(stockAmount) || 0, // Ensure it's a valid number
        };
        // Now you can use the updatedStockData object for further processing or API calls
        console.log(updatedStockData);
        // Add your logic to send the updated data to the server if needed

        const fetchData = async () => {
            try {
                const response = await axios.put(`http://127.0.0.1:5000/specProduct/${selectedItem}`, updatedStockData);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    };

    const handleStockAmountChange = (event) => {
        const amount = event.target.value;
        setStockAmount(amount);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ width: '50%', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <label>
                    <div className="theTable" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <select
                            key="select"
                            onChange={handleItemChange}
                            value={selectedItem}
                            style={{ marginBottom: '10px', padding: '12px', width: '100%', boxSizing: 'border-box', fontSize: '16px' }}
                        >
                            <option value="">Select an item</option>
                            {items.map((item) => (
                                <option key={item.product_id} value={item.product_id}>
                                    {item.product_name}
                                </option>
                            ))}
                        </select>

                        <input
                            type="number"
                            name="inputBox"
                            id="inputBox"
                            value={stockAmount}
                            onChange={handleStockAmountChange}
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
                </label>
            </div>
        </div>
    );
};
