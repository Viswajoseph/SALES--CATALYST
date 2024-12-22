import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
import '../style/ASMPage.css';

Chart.register(...registerables);

function ASMPage() {
  const [salesOfficers, setSalesOfficers] = useState([]);
  const [reports, setReports] = useState([]);
  const [newOfficer, setNewOfficer] = useState({ name: '', email: '' });
  const [monthlyData, setMonthlyData] = useState([11000, 15000, 17000, 13000, 16000, 18000, 20000]);
  const [quarterlyData, setQuarterlyData] = useState([45000, 48000, 50000, 52000]);
  const [confirmedBills, setConfirmedBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [chatVisible, setChatVisible] = useState(false);

  const toggleChat = () => {
    setChatVisible(!chatVisible);
  };

  const sendMessage = async () => {
    if (!chatInput.trim()) return;
    const userMessage = { sender: 'user', text: chatInput };
    setChatMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post('http://localhost:5000/api/chat', {
        message: chatInput,
      });
      const botMessage = { sender: 'bot', text: response.data.reply };
      setChatMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setChatInput('');
  };

  const handleAddSalesOfficer = () => {
    setSalesOfficers([...salesOfficers, newOfficer]);
    setNewOfficer({ name: '', email: '' });
  };

  const handleViewReports = () => {
    setReports([
      { id: 1, title: 'Monthly Sales Report', date: 'October 2024' },
      { id: 2, title: 'Quarterly Performance', date: 'Q3 2024' },
    ]);
  };

  useEffect(() => {
    // Fetch confirmed bills from MongoDB
    const fetchConfirmedBills = async () => {
      try {
        const response = await axios.get('http://localhost:5000/orders');
        setConfirmedBills(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    // Fetch products from MongoDB
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchConfirmedBills();
    fetchProducts();
  }, []);

  const handleBillClick = (bill) => {
    setSelectedBill(bill);
  };

  const closeModal = () => {
    setSelectedBill(null);
  };

  const handleAddProduct = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/products', newProduct);
      setProducts([...products, response.data]);
      setNewProduct({ name: '', price: '' });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const monthlyChart = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Monthly Sales (Rs.)',
        data: monthlyData,
        backgroundColor: '#007bff',
      },
    ],
  };

  const quarterlyChart = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Quarterly Sales (Rs.)',
        data: quarterlyData,
        backgroundColor: '#28a745',
      },
    ],
  };

  return (
    <div className="asm-container">
      <h2 className="asm-title">Area Sales Manager Dashboard</h2>

      {/* Create Sales Officer Section */}
      <div className="asm-section">
        <h3>Create New Sales Officer</h3>
        <input
          type="text"
          placeholder="Name"
          value={newOfficer.name}
          onChange={(e) => setNewOfficer({ ...newOfficer, name: e.target.value })}
          className="asm-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={newOfficer.email}
          onChange={(e) => setNewOfficer({ ...newOfficer, email: e.target.value })}
          className="asm-input"
        />
        <button onClick={handleAddSalesOfficer} className="asm-button">
          Add Sales Officer
        </button>
      </div>

      {/* Monthly Sales Report */}
      <div className="asm-section">
        <h3>Monthly Sales Report</h3>
        <Bar data={monthlyChart} />
      </div>

      {/* Quarterly Sales Report */}
      <div className="asm-section">
        <h3>Quarterly Sales Report</h3>
        <Bar data={quarterlyChart} />
      </div>

      {/* View Reports Section */}
      <div className="asm-section">
        <h3>Sales Reports</h3>
        <button onClick={handleViewReports} className="asm-button">View Reports</button>
        <ul className="asm-report-list">
          {reports.map((report) => (
            <li key={report.id} className="asm-report-item">
              {report.title} - {report.date}
            </li>
          ))}
        </ul>
      </div>
      {/* Chatbot Section */}
      <div className="chatbot-container">
        <button className="chatbot-toggle" onClick={toggleChat}>
          💬
        </button>
        {chatVisible && (
          <div className="chatbot-window">
            <div className="chatbot-messages">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`chatbot-message ${
                    msg.sender === 'user' ? 'chatbot-user' : 'chatbot-bot'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="chatbot-input-container">
              <input
                type="text"
                placeholder="Type your message..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="chatbot-input"
              />
              <button onClick={sendMessage} className="chatbot-send">
                Send
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Sales Officers List */}
      <div className="asm-section">
        <h3>Sales Officers</h3>
        <ul className="asm-sales-officer-list">
          {salesOfficers.map((officer, index) => (
            <li key={index} className="asm-sales-officer-item">
              {officer.name} ({officer.email})
            </li>
          ))}
        </ul>
      </div>

      {/* Confirmed Bills Section */}
      <div className="asm-section">
        <h3>Confirmed Bills</h3>
        <ul className="asm-bills-list">
          {confirmedBills.map((bill) => (
            <li key={bill._id} className="asm-bill-item" onClick={() => handleBillClick(bill)}>
              Date: {new Date(bill.date).toLocaleDateString()} | Amount: Rs.{bill.price}
            </li>
          ))}
        </ul>
      </div>

      {/* Add Product Section */}
      <div className="asm-section">
        <h3>Add New Product</h3>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="asm-input"
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
          className="asm-input"
        />
        <button onClick={handleAddProduct} className="asm-button">
          Add Product
        </button>
      </div>

      {/* Product List Section */}
        <div className="asm-section">
        <h3>Available Products</h3>
        <ul className="asm-product-list">
            {products && products.length > 0 ? (
            products.map((product) => (
                <li key={product._id} className="asm-product-item">
                {product.name} - Rs.{product.price}
                </li>
            ))
            ) : (
            <li>No products available</li>
            )}
        </ul>
        </div>
      {/* Modal for Bill Details */}
      {selectedBill && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Bill Details</h3>
            <p><strong>Shop Name:</strong> {selectedBill.shopName}</p>
            <p><strong>Product:</strong> {selectedBill.product}</p>
            <p><strong>Quantity:</strong> {selectedBill.quantity}</p>
            <p><strong>Price:</strong> Rs.{selectedBill.price}</p>
            <p><strong>Date:</strong> {new Date(selectedBill.date).toLocaleDateString()}</p>
            <button onClick={closeModal} className="asm-button">Close</button>
          </div>
        </div>
        
      )}
    </div>
    
  );
}

export default ASMPage;
