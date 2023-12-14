import React from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const nav = useNavigate();
  const buttonStyle = {
    margin: "0 10px",
    padding: "12px 24px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#ffffff", // Text color
    background: "#4CAF50", // Green background color
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontFamily: "'Poppins', sans-serif", // Use the Poppins font
    // Add any other styling you desire
  };
  
  

  const containerStyle = {
    display: "flex",
    flexDirection: "row", // Align buttons horizontally
    alignItems: "center",
    justifyContent: "center",
    margin:"20px"
    
  };

  const handleViewInventory = () => {
    nav("/view-inventory");
  };

  const handleAddToInventory = () => {
    nav("/add-to-inventory");
  };

  const handleUpdateStock = () => {
    nav("/update-stock");
  };

  return (
    <div style={containerStyle}>
      <button style={buttonStyle} onClick={handleViewInventory}>
        View Inventory
      </button>
      <button style={buttonStyle} onClick={handleAddToInventory}>
        Add To Inventory
      </button>
      <button style={buttonStyle} onClick={handleUpdateStock}>
        Update Stock
      </button>
    </div>
  );
};
