# 🌿 Hari's Vegetarian Kitchen - Indian Restaurant Website

A beautiful, responsive Node.js-based website for a vegetarian Indian restaurant located in Nainital, Uttarakhand.

## Features

✅ **Green and Cream Color Scheme** - Elegant color palette perfect for a vegetarian restaurant
✅ **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
✅ **Image Gallery** - Beautiful photo gallery showcasing delicious dishes
✅ **Complete Menu** - Appetizers, Main Courses, Breads, and Beverages with Indian and English names
✅ **Indian Pricing** - All prices displayed in Indian Rupees (₹)
✅ **Nainital Address** - Located at Mall Road, Nainital, Uttarakhand
✅ **Indian Phone Numbers** - Contact numbers in Indian format (+91-XXXXX-XXXXX)
✅ **Smooth Navigation** - Sticky navbar with smooth scrolling
✅ **Contact Form** - Get in touch section with contact information

## Installation

1. Navigate to the project directory:
```bash
cd restraunt
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The application will run on `http://localhost:3000`

## Project Structure

```
restraunt/
├── server.js              # Express server with menu API endpoint
├── package.json           # Dependencies configuration
├── public/
│   ├── index.html        # Main HTML file
│   └── style.css         # Styling with green and cream theme
├── images/               # Restaurant dish images
└── README.md            # This file
```

## Features Overview

### 🍽️ Menu API
The application includes a `/menu` API endpoint that returns the complete menu in JSON format:
```bash
curl http://localhost:3000/menu
```

### 🎨 Design Highlights
- **Primary Green**: #2d8659 (main color)
- **Light Green**: #4a9d6f (accents)
- **Cream**: #f5f1e8 (background)
- **Dark Cream**: #e8dcc8 (secondary background)
- **Accent Gold**: #d4a574 (buttons and highlights)

### 📍 Contact Information
- **Address**: Hari's Vegetarian Kitchen, Mall Road, Nainital, Uttarakhand 263001, India
- **Phone**: +91-99999-12345 / +91-98765-43210
- **Email**: info@harisvegkitchen.com
- **Hours**: 10:00 AM - 10:00 PM (Monday - Sunday)

### 🍽️ Menu Items
- **Appetizers**: Samosa, Bread Pakora, Paneer Tikka
- **Main Courses**: Chhole Bhature, Dal Makhani, Paneer Butter Masala, Aloo Gobi
- **Breads**: Naan, Roti, Paratha
- **Beverages**: Masala Chai, Lassi, Jalebi Water

## Browser Compatibility
- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Technologies Used
- **Backend**: Node.js with Express.js
- **Frontend**: HTML5, CSS3
- **Server**: Runs on port 3000 (configurable via PORT environment variable)

## Customization

To customize the restaurant details, edit these files:
- `server.js` - Update restaurant name, menu items
- `public/index.html` - Update address, phone numbers, business hours
- `public/style.css` - Modify colors in the `:root` CSS variables

## Notes
- All prices are in Indian Rupees (₹)
- Menu items include both English and Hindi names (in Devanagari script)
- Images should be placed in the `images/` directory
- The website is optimized for both light and dark themed systems

## License
ISC

## Author
Created as a vegetarian Indian restaurant website

---

🌿 Enjoy exploring Hari's Vegetarian Kitchen! 🌿
