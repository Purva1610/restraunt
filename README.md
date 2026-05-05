# Fine Dining Restaurant - Node.js Application

A modern fine dining restaurant website built with Node.js and Express, featuring pages for Home, Menu, About, and Contact with reservation and messaging capabilities.

## Features

- **Responsive Design**: Mobile-friendly layout that works on all devices
- **Dynamic Pages**: Multiple pages for home, menu, about, and contact
- **Reservation System**: Customers can make table reservations
- **Contact Form**: Message submission feature
- **Elegant UI**: Premium design with gold and dark theme

## Project Structure

```
restraunt-website/
├── server.js              # Main Express server
├── package.json           # Project dependencies
├── public/               # Static files (CSS, JS)
│   ├── styles.css
│   └── script.js
├── views/                # EJS templates
│   ├── index.ejs
│   ├── menu.ejs
│   ├── about.ejs
│   ├── contact.ejs
│   ├── 404.ejs
│   └── error.ejs
└── README.md
```

## Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd restraunt-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Running the Application

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The application will run on `http://localhost:3000`

## Requirements

- Node.js (v12.0.0 or higher)
- npm (v6.0.0 or higher)

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript
- **Templating**: EJS
- **Middleware**: body-parser

## API Endpoints

### GET Routes
- `GET /` - Home page
- `GET /menu` - Menu page
- `GET /about` - About page
- `GET /contact` - Contact page

### POST Routes
- `POST /api/reserve` - Submit a reservation
  - Required fields: name, email, date, time, guests

- `POST /api/contact` - Send a contact message
  - Required fields: name, email, message

## Features

### Home Page
- Hero section with call-to-action
- Featured dishes showcase
- Why Choose Us section
- Navigation to other pages

### Menu Page
- Organized menu categories (Appetizers, Main Courses, Desserts, Wine)
- Item descriptions and prices

### About Page
- Restaurant story and mission
- Team member profiles
- Core values

### Contact Page
- Reservation form
- Contact message form
- Restaurant contact information
- Operating hours

## Future Enhancements

- Database integration for persistent data storage
- Email notifications for reservations
- Admin dashboard for managing reservations
- Payment integration
- User authentication
- Online ordering system
- Review system
- Image gallery

## License

ISC

## Support

For issues or questions, please contact: info@finedining.com
