# 🏔️ Wanderlust — Feel at Home. Everywhere. — Premium Airbnb-Style Vacation Rental Platform

> A modern, premium, and feature-rich full-stack vacation rental marketplace built with **Node.js, Express, EJS-Mate, and MongoDB**. Users can explore properties, search destinations, view locations on interactive maps, manage listings, and share reviews through a responsive web interface.

---

## 🎨 System Overview & Features

Wanderlust is a full-stack vacation rental platform that combines responsive user interfaces with secure backend architecture, property management, image hosting, location mapping, authentication, and data validation.

### 🌟 Key Features

* 🔍 **Instant Destination Search:** Search properties dynamically by title, location, or country using optimized case-insensitive filtering.

* 🗺️ **Dynamic Interactive Maps:** Powered by **MapTiler SDK**, displaying listing locations with geocoding and fallback handling for invalid locations.

* 🏠 **Comprehensive Listing Management:** Full CRUD operations allowing authorized owners to create, edit, view, and delete property listings.

* 📸 **Cloud Image Uploads:** Seamless image uploads using **Multer** with **Cloudinary** for cloud-based media storage.

* 💬 **Review & Rating System:** Users can submit reviews and 1-to-5 star ratings through a customized rating interface.

* 🛡️ **Role-Based Authorization:** Listing owners can manage their properties, while review authors can manage their own reviews.

* 🚨 **Request Validation:** Uses **Joi validation schemas** to validate listing and review data before database operations.

* 📱 **Responsive Design:** Responsive layouts using **Bootstrap 5** and custom CSS for mobile, tablet, and desktop devices.

* 🔐 **Authentication & Sessions:** User authentication and session management using **Passport.js** and Passport Local.

---

## 💻 Tech Stack

Wanderlust uses modern web technologies and follows a structured MVC-based architecture.

| Category               | Technology / Library                        | Role in Application                                  |
| ---------------------- | ------------------------------------------- | ---------------------------------------------------- |
| **Frontend UI**        | `Bootstrap 5`, `Vanilla CSS`, `FontAwesome` | Responsive layouts, styling, components, and icons   |
| **View Engine**        | `EJS`, `EJS-Mate`                           | Dynamic pages, layouts, and reusable view components |
| **Backend Core**       | `Node.js`, `Express.js`                     | Server, routing, middleware, and application logic   |
| **Database**           | `MongoDB`, `Mongoose`                       | Data storage, schemas, relationships, and queries    |
| **Image Hosting**      | `Cloudinary`, `Multer`                      | Image processing, uploads, and cloud storage         |
| **Maps & Geolocation** | `MapTiler SDK`, `@maptiler/client`          | Geocoding, coordinates, and interactive maps         |
| **Authentication**     | `Passport`, `Passport-Local`                | Authentication, password hashing, and sessions       |
| **Validation**         | `Joi`                                       | Request and data validation                          |
| **Architecture**       | `MVC`                                       | Separation of models, views, controllers, and routes |

---

## 🏗️ Application Architecture

Wanderlust follows the **Model-View-Controller (MVC)** architecture to keep application logic organized and maintainable.

```text
Wanderlust/
├── 📁 controllers/          # Business logic handlers
│   ├── listings.js          # Listing operations and geocoding
│   ├── reviews.js           # Review CRUD operations
│   └── users.js             # Authentication and user operations
│
├── 📁 models/               # Mongoose database schemas
│   ├── listing.js           # Listing schema and GeoJSON data
│   ├── review.js            # Review schema and user relationships
│   └── user.js              # User schema and authentication fields
│
├── 📁 public/               # Static client-side resources
│   ├── 📁 assets/           # Images, icons, and branding
│   ├── 📁 css/              # Application stylesheets
│   └── 📁 js/               # Client-side JavaScript and map logic
│
├── 📁 routes/               # Express route definitions
│   ├── listing.js           # Listing routes
│   ├── review.js            # Review routes
│   └── user.js              # Authentication routes
│
├── 📁 utils/                # Utility functions and error handling
│   ├── ExpressError.js      # Custom error handling
│   └── wrapAsync.js         # Async error wrapper
│
├── 📁 views/                # EJS templates
│   ├── 📁 includes/         # Navbar, footer, alerts, etc.
│   ├── 📁 layouts/          # Base page layouts
│   ├── 📁 listings/         # Listing pages
│   ├── 📁 users/            # Authentication pages
│   ├── error.ejs            # Error page
│   ├── privacy.ejs          # Privacy policy
│   └── terms.ejs            # Terms and conditions
│
├── 📄 app.js                # Application entry point
├── 📄 cloudConfig.js        # Cloudinary configuration
├── 📄 middleware.js         # Authentication, authorization, and validation
├── 📄 package.json          # Dependencies and project configuration
└── 📄 schema.js             # Joi validation schemas
```

---

## 🚀 Getting Started

### 📋 Prerequisites

Make sure the following are installed:

* [Node.js](https://nodejs.org/) v20.0.0 or higher recommended
* [MongoDB](https://www.mongodb.com/try/download/community) locally or MongoDB Atlas
* Git

---

### 🔑 Environment Variables

Create a `.env` file in the root directory and add the required configuration:

```env
# Port Configuration
PORT=8080

# Environment
NODE_ENV=development

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret

# MapTiler
MAP_API_KEY=your_maptiler_api_key

# MongoDB
ATLASDB_URL=your_mongodb_atlas_connection_string

# Express Session
SECRET=your_express_session_secret_string
```

> ⚠️ Never commit your `.env` file or expose API keys, database credentials, Cloudinary secrets, or session secrets in the repository.

---

## 🛠️ Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/Ritikjagtap11/Wanderlust.git
cd Wanderlust
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create your `.env` file and add the required credentials described above.

### 4. Seed the database (Optional)

To populate the database with sample listings:

```bash
node init/index.js
```

### 5. Start the application

Using Nodemon:

```bash
npx nodemon app.js
```

Or using Node:

```bash
node app.js
```

### 6. Open the application

Visit:

```text
http://localhost:8080/listings
```

## 🛡️ Security & Validation

Wanderlust implements several security and validation practices:

* ✅ **HTTP-Only Cookies:** Session cookies are configured to reduce client-side access.

* ✅ **Secure Production Cookies:** Secure cookies are enabled when running in production.

* ✅ **Authentication:** Passport.js manages user authentication and sessions.

* ✅ **Authorization:** Middleware ensures users can only modify resources they are authorized to manage.

* ✅ **Request Validation:** Joi schemas validate listing and review data before processing database operations.

* ✅ **Error Handling:** Custom error classes and asynchronous error wrappers provide structured error handling.

* ✅ **Null-Safety:** Checks are performed when accessing nested objects and database relationships.

* ✅ **Environment Protection:** Sensitive credentials are stored through environment variables rather than hardcoded values.

---

## 📈 Future Improvements

* 💳 **Real-Time Booking & Reservation:** Integrate Stripe Checkout for simulated property reservations.

* 🔎 **Advanced Filtering & Categories:** Add dynamic filtering by categories such as pools, farms, rooms, camps, and other property types.

* 💬 **Direct User Messaging:** Add a chat system allowing guests and hosts to communicate.

* 📊 **Advanced User Dashboard:** Provide users with dashboards showing their listings, reviews, and booking activity.

* 🔔 **Notifications:** Add notifications for listing updates, reviews, and booking-related activities.

---

## 🌐 Deployment

Wanderlust can be deployed using platforms such as **Render** or **Heroku**.

### Deployment Requirements

Configure the following environment variables in your hosting provider:

```text
ATLASDB_URL
CLOUDINARY_CLOUD_NAME
CLOUDINARY_KEY
CLOUDINARY_SECRET
MAP_API_KEY
SECRET
NODE_ENV
```

### Render Deployment

1. Create a new Web Service.
2. Connect the Wanderlust GitHub repository.
3. Select the Node.js runtime.
4. Set the build command:

```bash
npm install
```

5. Set the start command:

```bash
node app.js
```

6. Add the required environment variables.
7. Deploy the application.

For production deployments, Express is configured to work behind a proxy/load balancer using:

```javascript
app.set("trust proxy", 1);
```

---

## 👨‍💻 Author

Developed with ❤️ by **Ritik Jagtap**

* 💼 **LinkedIn:** [@ritik-jagtap11](https://www.linkedin.com/in/ritik-jagtap11/)
* 🛠️ **GitHub:** [@Ritikjagtap11](https://github.com/Ritikjagtap11)
* 🌐 **Portfolio:** [Ritik Jagtap Portfolio](https://portfolio-f10t.onrender.com/)

---

## 📄 License

Copyright © 2026 Ritik Jagtap. Distributed under the ISC License.
