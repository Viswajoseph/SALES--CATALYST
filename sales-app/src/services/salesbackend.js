const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios'); // Import axios
const OpenAI = require('openai');
const Groq = require("groq-sdk");
const { MongoClient } = require('mongodb');


const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://new:new@data.rnukr.mongodb.net/?retryWrites=true&w=majority&appName=Data', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Order Schema
const orderSchema = new mongoose.Schema({
  shopName: String,
  product: String,
  quantity: Number,
  price: Number,
  date: { type: Date, default: Date.now },
});

const openai = new OpenAI({
    apiKey: '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',
  });

const Order = mongoose.model('Order', orderSchema);

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const Product = mongoose.model('Product', productSchema);

// Routes for Orders
app.post('/orders', async (req, res) => {
  const { shopName, product, quantity, price } = req.body;

  try {
    const newOrder = new Order({ shopName, product, quantity, price });
    await newOrder.save();
    res.status(201).json({ message: 'Order saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save order', error });
  }
});

app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error });
  }
});

// Routes for Products
app.post('/api/products', async (req, res) => {
  const { name, price } = req.body;

  try {
    const newProduct = new Product({ name, price });
    await newProduct.save();
    res.status(201).json({ message: 'Product saved successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save product', error });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch products', error });
  }
});

app.get('/api/products/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch product', error });
  }
});

app.put('/api/products/:productId', async (req, res) => {
  const { productId } = req.params;
  const { name, price } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, price },
      { new: true }
    );
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product', error });
  }
});

app.delete('/api/products/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndRemove(productId);
    if (deletedProduct) {
      res.status(200).json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error });
  }
});


// // Chatbot Route
// app.post('/api/chat', async (req, res) => {
//     const { message } = req.body;
  
//     if (!message) {
//       return res.status(400).json({ reply: 'Message is required.' });
//     }
  
//     try {
//       // Create a chat completion
//       const completion = await openai.chat.completions.create({
//         model: 'gpt-3.5-turbo', // Replace with a valid model name if needed
//         messages: [
//           { role: 'system', content: 'You are a helpful assistant.' },
//           { role: 'user', content: message },
//         ],
//       });
  
//       // Extract the assistant's reply
//       const reply = completion.choices[0].message.content;
//       res.json({ reply });
//     } catch (error) {
//       console.error('Error with OpenAI API:', error.message);
//       res.status(500).json({ reply: 'Something went wrong. Please try again later.' });
//     }
//   });



// Chatbot Route
// app.post('/api/chat', async (req, res) => {
//   const { message } = req.body;
//   const groq = new Groq({ apiKey: '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'});
//   if (!message) {
//       return res.status(400).json({ reply: 'Message is required.' });
//   }

//   if (!message) {
//     return res.status(400).json({ reply: 'Message is required.' });
// }

// try {
//     // Call the Groq API to generate a response using llama3-8b-8192
//     const completion = await groq.chat.completions.create({
//         messages: [
//             { role: "system", content: "You are a helpful assistant." }, // Optional system role
//             { role: "user", content: message }, // User's message
//         ],
//         model: "llama3-8b-8192", // Specify the model to use
//     });

//     // Extract the assistant's reply
//     const reply = completion.choices[0].message.content;

//     // Send the reply back to the frontend
//     res.json({ reply });
// } catch (error) {
//     console.error('Error with Groq API:', error.message);

//     // Provide a user-friendly error message
//     res.status(500).json({ reply: 'Something went wrong. Please try again later.' });
// }
// });


const MONGODB_URI = 'mongodb+srv://new:new@data.rnukr.mongodb.net/?retryWrites=true&w=majority&appName=Data';
const DATABASE_NAME = 'test';

// Groq API initialization
const groq = new Groq({ apiKey: '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' });

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
      return res.status(400).json({ reply: 'Message is required.' });
  }

  try {
      // Connect to MongoDB
      const client = new MongoClient(MONGODB_URI);
      await client.connect();
      const db = client.db(DATABASE_NAME);

      // Fetch data from the first collection
      const collection1 = db.collection('orders');
      const data1 = await collection1.find().toArray();

      // Fetch data from the second collection
      const collection2 = db.collection('products');
      const data2 = await collection2.find().toArray();

      // Combine data from both collections
      const combinedData = [...data1, ...data2];
      const dataString = combinedData.map(doc => JSON.stringify(doc)).join('\n');

        // Call the Groq API to generate a response using the MongoDB data as context
        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: "Answer questions only based on the following data: " + dataString },
                { role: "user", content: message },
            ],
            model: "llama3-8b-8192",
        });

        // Extract the assistant's reply
        const reply = completion.choices[0].message.content;

        // Close the MongoDB connection
        await client.close();

        // Send the reply back to the frontend
        res.json({ reply });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ reply: 'Something went wrong. Please try again later.' });
    }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
