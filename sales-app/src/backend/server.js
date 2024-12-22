const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect to the database
mongoose.connect('mongodb+srv://kasiviswanathan283:Kd3n5BYLsKvrBRw9@data.rnukr.mongodb.net/?retryWrites=true&w=majority&appName=Data', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to the database');
})
.catch((err) => {
  console.error('Failed to connect to the database', err);
});

// Define a schema for the data you want to store
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

// Define a route to get all users
app.get('/users', (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error('Failed to get users', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Define a route to create a new user
app.post('/users', (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
  });

  newUser.save()
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      console.error('Failed to create user', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Define a route to get a specific user
app.get('/users/:userId', (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch((err) => {
      console.error('Failed to get user', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Define a route to update a specific user
app.put('/users/:userId', (req, res) => {
  User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch((err) => {
      console.error('Failed to update user', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Define a route to delete a specific user
app.delete('/users/:userId', (req, res) => {
  User.findByIdAndRemove(req.params.userId)
    .then((user) => {
      if (user) {
        res.json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch((err) => {
      console.error('Failed to delete user', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});