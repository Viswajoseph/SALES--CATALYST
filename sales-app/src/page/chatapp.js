import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages([...messages, userMessage]);

        try {
    const response = await axios.post('http://localhost:5000/api/chat', { message: input });
    const botMessage = { role: 'bot', content: response.data.reply };
    setMessages((prev) => [...prev, botMessage]);
} catch (error) {
    console.error('Error communicating with the server:', error.response ? error.response.data : error.message);
    const errorMessage = { role: 'bot', content: 'Error: Unable to fetch a response. Please try again later.' };
    setMessages((prev) => [...prev, errorMessage]);
}

        setInput('');
    };

    return (
        <div className="App">
            <h1>Sales Efficiency Chatbot</h1>
            <div className="chatbox">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.role}>
                        <p>{msg.content}</p>
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default App;
