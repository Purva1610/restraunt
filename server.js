const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.static('public'));
app.use('/images', express.static('images'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/menu', (req, res) => {
  const menu = {
    appetizers: [
      { name: 'समोसा (Samosa)', price: '₹80', description: 'Crispy fried pastry with spiced potato filling' },
      { name: 'ब्रेड पकोड़ा (Bread Pakora)', price: '₹120', description: 'Soft bread fritters with aromatic spices' },
      { name: 'पनीर टिक्का (Paneer Tikka)', price: '₹200', description: 'Grilled cottage cheese marinated in yogurt spices' }
    ],
    mainCourses: [
      { name: 'छोले भठूरे (Chhole Bhature)', price: '₹150', description: 'Fluffy fried bread with spiced chickpeas' },
      { name: 'डाल मखनी (Dal Makhani)', price: '₹180', description: 'Creamy lentils cooked in butter and cream' },
      { name: 'पनीर बटर मसाला (Paneer Butter Masala)', price: '₹220', description: 'Cottage cheese in creamy tomato sauce' },
      { name: 'आलू गोबी (Aloo Gobi)', price: '₹160', description: 'Potatoes and cauliflower with aromatic spices' }
    ],
    breads: [
      { name: 'नान (Naan)', price: '₹60', description: 'Soft Indian bread baked in clay oven' },
      { name: 'रोटी (Roti)', price: '₹40', description: 'Whole wheat Indian bread' },
      { name: 'पराठा (Paratha)', price: '₹80', description: 'Layered Indian bread with butter' }
    ],
    beverages: [
      { name: 'मसाला चाय (Masala Chai)', price: '₹50', description: 'Spiced Indian tea' },
      { name: 'लस्सी (Lassi)', price: '₹80', description: 'Yogurt based sweet drink' },
      { name: 'जलेबी पानी (Jalebi Water)', price: '₹40', description: 'Refreshing sweetened water' }
    ]
  };
  res.json(menu);
});

app.listen(PORT, () => {
  app.listen(3000, '0.0.0.0', () => { ... });
  console.log('📍 Location: Nainital, Uttarakhand, India');
});
