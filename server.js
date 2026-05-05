const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Mock database for reservations
const reservations = [];
const contactMessages = [];

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/menu', (req, res) => {
  res.render('menu');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// API Routes
app.post('/api/reserve', (req, res) => {
  const { name, email, date, time, guests } = req.body;
  
  if (!name || !email || !date || !time || !guests) {
    return res.json({ success: false, message: 'All fields are required' });
  }
  
  const reservation = {
    id: reservations.length + 1,
    name,
    email,
    date,
    time,
    guests,
    createdAt: new Date()
  };
  
  reservations.push(reservation);
  res.json({ success: true, message: 'Reservation confirmed!', reservation });
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.json({ success: false, message: 'All fields are required' });
  }
  
  const contact = {
    id: contactMessages.length + 1,
    name,
    email,
    message,
    createdAt: new Date()
  };
  
  contactMessages.push(contact);
  res.json({ success: true, message: 'Message sent successfully!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { error: err.message });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404');
});

// Start server
app.listen(PORT, () => {
  console.log(`🍽️  Fine Dining Restaurant app running on http://localhost:${PORT}`);
});
