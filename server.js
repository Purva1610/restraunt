const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

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

app.post('/reservation', (req, res) => {
  const { name, email, phone, date, time, guests } = req.body;
  console.log('Reservation received:', { name, email, phone, date, time, guests });
  res.json({ success: true, message: 'Reservation received! We will confirm shortly.' });
});

app.post('/contact-us', (req, res) => {
  const { name, email, message } = req.body;
  console.log('Contact message received:', { name, email, message });
  res.json({ success: true, message: 'Thank you for your message! We will get back to you soon.' });
});

app.listen(PORT, () => {
  console.log(`🍃 Hari's Kitchen is running on http://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop the server');
});
