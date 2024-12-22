import React, { useState, useEffect } from 'react';
import '../style/sales-officer.css';
import axios from 'axios';

// Dummy data for routes and shops (unchanged)
const routesData = {
  ganapathy: [
    { id: 1, name: 'Jai home needs', ownerName: 'Ravi', gstNumber: '29ABCDE1234F2Z5', phone: '9876543210', address: '123 Ganapathy St' },
    { id: 2, name: 'City Cake Shop', ownerName: 'Sita', gstNumber: '29ABCDE1234F2Z6', phone: '8765432109', address: '456 Ganapathy Ave' },
    { id: 3, name: 'Ganapathy Sweets', ownerName: 'Mohammed', gstNumber: '29ABCDE1234F2Z7', phone: '7654321098', address: '789 Ganapathy Blvd' },
    { id: 4, name: 'Bakers Corner', ownerName: 'Lakshmi', gstNumber: '29ABCDE1234F2Z8', phone: '6543210987', address: '101 Ganapathy Road' },
    { id: 5, name: 'Fresh Juice Shop', ownerName: 'Rohan', gstNumber: '29ABCDE1234F2Z9', phone: '5432109876', address: '102 Ganapathy Lane' },
   ],
    Gandhipuram: [
    { id: 6, name: 'Tasty Treats', ownerName: 'Arjun', gstNumber: '29ABCDE1234F2Z10', phone: '7654321098', address: '789 Gandhi St' },
    { id: 7, name: 'Sweet Delights', ownerName: 'Anita', gstNumber: '29ABCDE1234F2Z11', phone: '6543210987', address: '101 Gandhi Ave' },
    { id: 8, name: 'Gandhipuram Bakes', ownerName: 'Pooja', gstNumber: '29ABCDE1234F2Z12', phone: '5432109876', address: '123 Gandhi Blvd' },
    { id: 9, name: 'Gandhi Grocery Store', ownerName: 'Vikram', gstNumber: '29ABCDE1234F2Z13', phone: '4321098765', address: '234 Gandhi Road' },
    { id: 10, name: 'Beverages & More', ownerName: 'Rakesh', gstNumber: '29ABCDE1234F2Z14', phone: '3210987654', address: '345 Gandhi Lane' },
  ],
  Saravanampatti: [
    { id: 11, name: 'Annanagar Bakery', ownerName: 'Suresh', gstNumber: '29ABCDE1234F2Z15', phone: '2109876543', address: '456 Anna St' },
    { id: 12, name: 'Bakers Delight', ownerName: 'Neha', gstNumber: '29ABCDE1234F2Z16', phone: '1098765432', address: '567 Anna Ave' },
    { id: 13, name: 'Juice Junction', ownerName: 'Kiran', gstNumber: '29ABCDE1234F2Z17', phone: '0987654321', address: '678 Anna Blvd' },
    { id: 14, name: 'Sweets & Treats', ownerName: 'Ajay', gstNumber: '29ABCDE1234F2Z18', phone: '9876543210', address: '789 Anna Road' },
    { id: 15, name: 'Snack Corner', ownerName: 'Gita', gstNumber: '29ABCDE1234F2Z19', phone: '8765432109', address: '890 Anna Lane' },
  ],
  Singanallur: [
    { id: 16, name: 'Trichy Pastry Shop', ownerName: 'Sam', gstNumber: '29ABCDE1234F2Z20', phone: '7654321098', address: '123 Trichy St' },
    { id: 17, name: 'Trichy Sweets', ownerName: 'Anjali', gstNumber: '29ABCDE1234F2Z21', phone: '6543210987', address: '456 Trichy Ave' },
    { id: 18, name: 'Baker Street', ownerName: 'Raj', gstNumber: '29ABCDE1234F2Z22', phone: '5432109876', address: '789 Trichy Blvd' },
    { id: 19, name: 'Trichy Juice Shop', ownerName: 'Shivani', gstNumber: '29ABCDE1234F2Z23', phone: '4321098765', address: '101 Trichy Road' },
    { id: 20, name: 'Cafe Trichy', ownerName: 'Karan', gstNumber: '29ABCDE1234F2Z24', phone: '3210987654', address: '202 Trichy Lane' },
  ],
  Mettupalayam: [
    { id: 21, name: 'Madurai Snack House', ownerName: 'Surya', gstNumber: '29ABCDE1234F2Z25', phone: '2109876543', address: '456 Madurai St' },
    { id: 22, name: 'Madurai Tea Shop', ownerName: 'Aditi', gstNumber: '29ABCDE1234F2Z26', phone: '1098765432', address: '567 Madurai Ave' },
    { id: 23, name: 'Madurai Sweets', ownerName: 'Venu', gstNumber: '29ABCDE1234F2Z27', phone: '0987654321', address: '678 Madurai Blvd' },
    { id: 24, name: 'Madurai Bakery', ownerName: 'Gopal', gstNumber: '29ABCDE1234F2Z28', phone: '9876543210', address: '789 Madurai Road' },
    { id: 25, name: 'Madurai Bakes', ownerName: 'Lata', gstNumber: '29ABCDE1234F2Z29', phone: '8765432109', address: '890 Madurai Lane' },
  ],
  };

// ShopDetails component stays the same
const ShopDetails = ({ shop, onAddOrder, onClose, productPrices }) => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Calculate total price based on selected product and quantity
  const price = selectedProduct ? productPrices[selectedProduct] * quantity : 0;

  const handleAddOrder = () => {
    if (selectedProduct && quantity > 0) {
      onAddOrder(shop.name, selectedProduct, quantity, price);
      setSelectedProduct('');
      setQuantity(1);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h3>{shop.name}</h3>
        <p>Owner Name: {shop.ownerName}</p>
        <p>GST Number: {shop.gstNumber}</p>
        <p>Owner Phone: {shop.phone}</p>
        <p>Address: {shop.address}</p>

        <h4>Add Order</h4>
        <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
          <option value="">Select a product</option>
          {Object.keys(productPrices).map((product) => (
            <option key={product} value={product}>{product}</option>
          ))}
        </select>

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
          placeholder="Quantity"
        />

        {selectedProduct && <p>Price: ₹{productPrices[selectedProduct]} each</p>}
        <p>Total Price: ₹{price}</p>

        <button onClick={handleAddOrder}>Add Order</button>
      </div>
    </div>
  );
};

const SalesOfficerPage = () => {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedShop, setSelectedShop] = useState(null);
  const [products, setProducts] = useState([]); // Store products from API
  const [productPrices, setProductPrices] = useState({}); // Store product prices in a map

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        const productData = response.data;

        // Create a productPrices mapping from the fetched products
        const prices = productData.reduce((acc, product) => {
          acc[product.name] = product.price;
          return acc;
        }, {});
        
        setProducts(productData); // Set products from MongoDB
        setProductPrices(prices); // Set product prices mapping
      } catch (error) {
        console.error('Error fetching products:', error);
        alert('Failed to fetch products');
      }
    };

    fetchProducts();
  }, []);

  const handleRouteClick = (route) => {
    setSelectedRoute(route);
    setSelectedShop(null);
  };

  const handleShopClick = (shop) => {
    setSelectedShop(shop);
  };

  const handleAddOrder = async (shopName, product, quantity, price) => {
    try {
      const orderData = { shopName, product, quantity, price };
      const response = await axios.post('http://localhost:5000/orders', orderData);

      if (response.status === 201) {
        alert(`Order placed for ${quantity} x ${product} at ${shopName} for ₹${price}. ${response.data.message}`);
      } else {
        alert('Failed to place order.');
      }
    } catch (error) {
      console.error('Error saving order:', error);
      alert('There was an error saving the order. Please try again.');
    }
    setSelectedShop(null);
    setSelectedRoute(null);
  };

  const closeModal = () => {
    setSelectedShop(null);
  };

  return (
    <div className="sales-officer-page">
      <h1>Sales Officer Page</h1>
      <h2>Select Route</h2>
      <ul className="route-selection">
        {Object.keys(routesData).map((routeKey) => (
          <li key={routeKey}>
            <button onClick={() => handleRouteClick(routeKey)}>
              {routeKey.charAt(0).toUpperCase() + routeKey.slice(1)}
            </button>
          </li>
        ))}
      </ul>

      {selectedRoute && (
        <div className="route-shops">
          <h2>Shops in {selectedRoute.charAt(0).toUpperCase() + selectedRoute.slice(1)}</h2>
          <ul>
            {routesData[selectedRoute]?.map((shop) => (
              <li key={shop.id}>
                <button onClick={() => handleShopClick(shop)}>
                  {shop.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedShop && (
        <ShopDetails
          shop={selectedShop}
          onAddOrder={handleAddOrder}
          onClose={closeModal}
          productPrices={productPrices} // Pass the productPrices to ShopDetails
        />
      )}
    </div>
  );
};

export default SalesOfficerPage;
