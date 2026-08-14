# 🏔️ Wanderlust — Feel at Home. Everywhere. — Premium Airbnb-Style Booking Platform

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2020.0.0-blue.svg?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![Express Framework](https://img.shields.io/badge/express-v5.1.0-red.svg?style=for-the-badge&logo=express)](https://expressjs.com)
[![MongoDB Database](https://img.shields.io/badge/mongodb-mongoose-green.svg?style=for-the-badge&logo=mongodb)](https://mongodb.com)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg?style=for-the-badge&logo=data:image/svg+xml;base64,...)](https://opensource.org/licenses/ISC)

> A modern, premium, and feature-rich full-stack vacation rental marketplace built with **Node.js, Express, EJS-Mate, and MongoDB**. Seamlessly search premium listings, review accommodations, map properties, and rent out your properties with stunning responsive interfaces.

---

## 🎨 System Overview & Features

Wanderlust transforms vacation listing and rental management by combining top-tier UI styling with optimized backend geocoding and security validation.

### 🌟 Key Features

*   🔍 **Instant Destination Search:** Search properties dynamically by title, location, or country using optimized case-insensitive regex filtering.
*   🗺️ **Dynamic Interactive Maps:** Powered by **MapTiler SDK**, showing exact pin points for listings with a robust fallback system (no server crashes if locations are invalid).
*   🏠 **Comprehensive Listing Management:** Full CRUD operations allowing authorized owners to list, edit, view, and delete stay destinations.
*   📸 **Cloud Image Uploads:** Seamless media uploads configured via **Multer** and integrated directly with **Cloudinary Storage**.
*   💬 **Robust Heart-Rating System:** Users can submit reviews and 1-to-5 star ratings using an elegant, customized star rating interface.
*   🛡️ **Premium Role Authorization:** Strictly checks permissions—only listing owners can edit/delete properties, and only review authors can delete their own reviews.
*   🚨 **Strict Validation Schema:** Leverages **Joi Validation** on the server side to validate listing data and review requests before database insertions.
*   📱 **100% Adaptive Responsiveness:** Sleek, custom CSS overrides and Bootstrap grids that flow elegantly on Mobile, Tablet, and Desktop screens.

---

## 💻 Tech Stack

Wanderlust utilizes modern, high-performance web frameworks and tools:

| Category | Technology / Library | Role in Application |
| :--- | :--- | :--- |
| **Frontend UI** | `Bootstrap 5`, `Vanilla CSS`, `FontAwesome` | Design layout, responsive columns, and iconography. |
| **View Engine** | `EJS`, `EJS-Mate` | Modular template layouts (`boilerplate.ejs`), includes. |
| **Backend Core** | `Node.js`, `Express` | Server core, routing lifecycle, and session middlewares. |
| **Database ORM**| `Mongoose (MongoDB)` | Object modeling, schema definitions, and validation. |
| **Image Hosting**| `Cloudinary (V2)`, `Multer` | Cloud asset storage, file parsing, and uploads. |
| **Maps & Geoloc**| `@maptiler/client`, MapTiler SDK | IP Geocoding, coordinates lookup, and rendering. |
| **Auth System**  | `Passport`, `Passport-Local` | Secure hashing, local user strategies, and serialized sessions. |
| **Validation**   | `Joi` | Request object sanitization and schema enforcement. |

---

## 📁 Repository Folder Structure

```bash
StayNest/
├── 📁 controllers/          # Business logic handlers (MVC Controller Layer)
│   ├── listings.js         # Listings operations (Search, CRUD, geocoding)
│   ├── reviews.js          # Review CRUD operations
│   └── users.js            # Sign up, login, and logout controller logic
├── 📁 models/               # Mongoose Database Schemas (MVC Model Layer)
│   ├── listing.js          # Listing structure (GeoJSON, references)
│   ├── review.js           # Review structure & user associations
│   └── user.js             # Local passport user fields & plugins
├── 📁 public/               # Static Client-Side Resources
│   ├── 📁 assets/          # SVG Icons, Logos & Branding elements
│   ├── 📁 css/             # Stylesheets (rating.css, core style.css)
│   └── 📁 js/              # MapTiler bindings & Bootstrap validation script
├── 📁 routes/               # Express Router Endpoints
│   ├── listing.js          # Listing routing middleware definitions
│   ├── review.js           # Review routing definitions
│   └── user.js             # User identity routing definitions
├── 📁 utils/                # General Helpers & Error handling wrappers
│   ├── ExpressError.js     # Customized error schema
│   └── wrapAsync.js        # Controller error wrapper catching promises
├── 📁 views/                # EJS View Templates (MVC View Layer)
│   ├── 📁 includes/        # UI segments (Navbar, Footer, Alerts)
│   ├── 📁 layouts/         # Base HTML Wrapper (Boilerplate structure)
│   ├── 📁 listings/        # Listing CRUD templates (Index, Edit, Show)
│   ├── 📁 users/           # Sign-Up & Log-In templates
│   ├── error.ejs           # Customized error alert page
│   ├── privacy.ejs         # User Data Privacy & Policy information
│   └── terms.ejs           # Usage conditions agreement
├── 📄 app.js                # App entrypoint (initializes DB, session, auth, routers)
├── 📄 cloudConfig.js        # Cloudinary integrations with Multer
├── 📄 middleware.js         # Session locks, Owner locks, Joi Validation locks
├── 📄 package.json          # Node dependency & package engine configurations
└── 📄 schema.js             # Client requests validation constraints schemas
```

---

## 🚀 Getting Started

### 📋 Prerequisites

To run this application locally, you must have the following installed on your system:
*   [Node.js](https://nodejs.org) (v20.0.0 or higher recommended)
*   [MongoDB](https://www.mongodb.com/try/download/community) (running locally or a remote MongoDB Atlas connection)

---

### 🔑 Environment Variables Setup

Create a `.env` file in the root directory of the project and populate it with the following configuration keys:

```env
# Port Configuration
PORT=8080

# Environment Toggle
NODE_ENV=development

# Cloudinary Credentials (For Listing Image Uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret

# MapAPI Key (For MapTiler Geocoding & Interactive Maps)
MAP_API_KEY=your_maptiler_api_key

# Database Connection (Leave empty to auto-fallback to local MongoDB)
ATLASDB_URL=your_mongodb_atlas_connection_string

# Express Session Encryption Key
SECRET=your_express_session_secret_string
```

---

### 🛠️ Run Locally Guide

Follow these simple steps to spin up the local development environment:

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/Ritikjagtap11/StayNest.git
    cd StayNest
    ```

2.  **Install Node Dependencies:**
    ```bash
    npm install
    ```

3.  **Seed Database (Optional):**
    Populate your local or remote database with mock vacation stay data:
    ```bash
    node init/index.js
    ```

4.  **Launch the Server:**
    Run the application using `nodemon` for auto-reloading during updates:
    ```bash
    npx nodemon app.js
    ```
    Alternatively, launch using node directly:
    ```bash
    node app.js
    ```

5.  **Access in Browser:**
    Open [http://localhost:8080/listings](http://localhost:8080/listings) in your web browser.

---

## 📸 Screenshots

Here is a glimpse of Wanderlust's premium design aesthetics:

| 🏠 Exploration Hub | 🗺️ Detailed Property & Interactive Map |
|:---:|:---:|
| ![Exploration Dashboard Hub](https://raw.githubusercontent.com/Ritikjagtap11/StayNest/main/public/assets/Wanderlust_logo.png) *Placeholder for Dashboard* | ![Detailed View](https://raw.githubusercontent.com/Ritikjagtap11/StayNest/main/public/assets/Wanderlust_logo.png) *Placeholder for Map & Property Detail* |

| ✍️ Custom Stars Ratings & Reviews | 📝 Add & Edit Responsive Listing Form |
|:---:|:---:|
| ![Ratings Interface](https://raw.githubusercontent.com/Ritikjagtap11/StayNest/main/public/assets/Wanderlust_logo.png) *Placeholder for Reviews Section* | ![Listings Forms](https://raw.githubusercontent.com/Ritikjagtap11/StayNest/main/public/assets/Wanderlust_logo.png) *Placeholder for Listing Form* |

---

## 🛡️ Security Best Practices Implemented

*   ✅ **HTTP-Only Cookies:** Standard cookies configured to prevent client-side script reads (reducing XSS vectors).
*   ✅ **Production SSL Enforcement:** Cookies are configured with `secure: true` when running under `NODE_ENV=production`.
*   ✅ **Robust Validation:** Enforces structural integrity of inbound API posts using Joi schemas to prevent SQL/NoSQL injections.
*   ✅ **Null-Safety Controls:** Full checks when accessing nested properties like `listing.owner.username`, eliminating crash vectors due to orphan DB references.
*   ✅ **Unreachable Route Prevention:** Middleware order corrected to shield system health endpoints and avoid unauthorized request fallthrough.

---

## 📈 Future Improvements

- [ ] **Real-Time Booking & Reservation:** Integrate Stripe Checkout payments for simulated property reservations.
- [ ] **Advanced Filtering & Categories:** Filter properties dynamically by tag (Arctic, Pool, Camps, Farms, Rooms) without page refreshes using AJAX.
- [ ] **Direct User Messaging:** Integrated chat dashboard letting users talk with property hosts.
- [ ] **Advanced User Dashboard:** A robust stats hub displaying listed stays, reviews left, and booking logs.

---

## 🌐 Deployment Guide

You can deploy Wanderlust to production easily using **Render** or **Heroku**:

1.  **Prepare App settings:**
    Ensure database URL and all Cloudinary credentials are set under the hosting provider's *Environment Variables* section.
2.  **Trust Proxies:**
    Express is already configured with `app.set("trust proxy", 1)` to handle secure sessions via SSL behind modern reverse load balancers.
3.  **Deployment Steps on Render:**
    *   Create a new **Web Service** linked to your repository.
    *   Set **Runtime** to `Node`.
    *   Set **Build Command** to `npm install`.
    *   Set **Start Command** to `node app.js`.
    *   Inject Environment Variables in the service settings. Click Deploy!

---

## 👨‍💻 Author

Developed with ❤️ by **Ritik Jagtap**

*   💼 **LinkedIn:** [@ritik-jagtap-link](https://www.linkedin.com/in/ritik-jagtap-link/)
*   🛠️ **GitHub:** [@Ritikjagtap11](https://github.com/Ritikjagtap11)
*   📸 **Instagram:** [@ritikraja__](https://www.instagram.com/ritikraja__/)

***

*Copyright © 2026 Wanderlust Private Limited. Distributed under the ISC License.*
