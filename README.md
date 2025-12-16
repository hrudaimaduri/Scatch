## E-Commerce Node.js App

A full-stack Node.js e-commerce application built with Express, MongoDB, and EJS. It supports user authentication, an admin product panel, image uploads, shopping cart functionality, and server-side rendered pages styled with Tailwind CSS.

---

## Features

- **User registration & login (JWT based)** – Secure authentication with JSON Web Tokens.
- **Flash messages** – Error and success notifications using `connect-flash`.
- **Protected routes** – Middleware-based access control for authenticated users and admins.
- **Admin panel (`/owner/admin`)** – Create and manage products (protected admin area).
- **Product creation with image upload** – Upload product images using Multer, stored as Buffers.
- **Shop page** – Display all products to users.
- **Add to cart** – Add products to a user-specific cart.
- **Cart page with bill calculation** – View cart items and total price.
- **Logout functionality** – Clear authentication and session data safely.
- **Server-side rendering with EJS** – All main views rendered on the server.
- **Tailwind CSS styling** – Modern, responsive UI using Tailwind.

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Templating**: EJS
- **Auth**: JWT (JSON Web Tokens), cookies, sessions
- **Flash messages**: `connect-flash`
- **File uploads**: Multer (images stored as Buffer in MongoDB)
- **Styling**: Tailwind CSS
- **Version control**: Git & GitHub

---

## Project Structure

High-level folder structure:

```bash
.
├── app.js
├── controllers/
├── routes/
├── models/
├── middlewares/
├── designs/
├── utils/
├── views/
└── public/
```

### `app.js`

- **Entry point** of the application.
- Initializes Express, connects to MongoDB, and configures:
  - Sessions
  - Cookie parser
  - `connect-flash`
  - JWT verification middleware
  - Static assets
  - View engine (EJS)
- Mounts all route modules under their respective base paths.

### `controllers/`

- Contains **business logic** for each feature.
- Typical files:
  - `authController.js` – Handles register, login, logout, token creation, and auth flows.
  - `productController.js` – Handles product CRUD, image upload processing, and product listing.
  - `cartController.js` – Handles add-to-cart, cart retrieval, and bill calculation.
  - `adminController.js` – Admin-specific actions (e.g., managing products via `/owner/admin`).
- Controllers receive `req`/`res` from routes and interact with models.

### `routes/`

- Defines **Express routes** and maps them to controllers and middlewares.
- Typical files:
  - `authRoutes.js` – `/register`, `/login`, `/logout`, etc.
  - `productRoutes.js` – `/shop`, `/product/create`, etc.
  - `cartRoutes.js` – `/cart`, `/cart/add/:id`, etc.
  - `adminRoutes.js` – `/owner/admin` and related admin endpoints.
- Uses middlewares for access control (e.g., auth, admin checks).

### `models/`

- Contains **Mongoose models** for MongoDB collections.
- Typical files:
  - `User.js` – User schema (email, password hash, roles, etc.).
  - `Product.js` – Product schema (name, price, description, image Buffer, etc.).
  - `Cart.js` – Cart schema (user reference, items, quantities, total).
- Encapsulates database structure and relationships.

### `middlewares/`

- Reusable **Express middlewares** for cross-cutting concerns.
- Typical middlewares:
  - `authMiddleware.js` – Verifies JWT, checks sessions/cookies, attaches user to `req`.
  - `adminMiddleware.js` – Verifies user has admin role before accessing admin routes.
  - `errorHandler.js` (optional) – Centralized error handling.
- Used in routes to protect paths like `/cart` and `/owner/admin`.

### `designs/`

- Tailwind and styling-related resources.
- Typical contents:
  - Tailwind config or design tokens.
  - Reusable layout snippets or design documentation.
- Used as a design reference for views and components.

### `utils/`

- Helper functions and utilities.
- Typical files:
  - `jwt.js` – Functions to sign and verify JWTs.
  - `hashPassword.js` – Password hashing and comparison.
  - `logger.js` – Logging helpers.
  - `calcBill.js` – Utility for calculating cart totals.
- Keeps controllers and routes clean and focused.

### `views/`

- **EJS templates** for server-side rendered pages.
- Typical views:
  - `layout.ejs` – Base layout (header, footer, flash messages container).
  - `auth/` – `login.ejs`, `register.ejs`.
  - `shop/` – `index.ejs` (product listing), `details.ejs`.
  - `cart/` – `cart.ejs` (items + bill).
  - `admin/` – `dashboard.ejs`, `createProduct.ejs`.
- Uses Tailwind classes for styling.

### `public/`

- Static assets served by Express.
- Typical contents:
  - Compiled Tailwind CSS file (e.g., `css/styles.css`).
  - Client-side JavaScript (if any).
  - Images and icons.
- Accessible from the browser via `/public/...` or configured static path.

---

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Server
PORT=3000

# Database
MONGODB_URI=mongodb://localhost:27017/your_database_name

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d

# Session
SESSION_SECRET=your_session_secret_key

# Other (optional)
NODE_ENV=development
```

> **Note**: Never commit your real `.env` file or secret keys to GitHub.

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup environment variables**

- Create a `.env` file in the project root.
- Copy the example from the section above and fill in your values.

4. **Setup MongoDB**

- Ensure MongoDB is installed and running locally, or
- Use a MongoDB Atlas connection string for `MONGODB_URI`.

5. **Build Tailwind CSS (if applicable)**

If you are using a Tailwind build step:

```bash
npm run build:css
```

(Adjust this command to match your `package.json` scripts.)

---

## Running the Project Locally

1. **Start the development server**

```bash
npm run dev
```

or, if you do not use a dev script:

```bash
node app.js
```

2. **Open the application**

- Visit: `http://localhost:3000`

3. **Login / Admin**

- If you seed an admin user, use those credentials to access `/owner/admin`.
- Otherwise, adjust the admin creation flow according to your implementation (e.g., first user becomes admin or manual DB update).

---

## Important Routes

| Route                | Method | Description                                      | Auth Required |
|----------------------|--------|--------------------------------------------------|--------------|
| `/`                  | GET    | Home or redirect to `/shop`                     | No           |
| `/register`          | GET    | Show registration form                          | No           |
| `/register`          | POST   | Handle user registration                        | No           |
| `/login`             | GET    | Show login form                                 | No           |
| `/login`             | POST   | Handle user login, set JWT/cookie              | No           |
| `/logout`            | POST   | Logout, clear session/JWT                       | Yes          |
| `/shop`              | GET    | Display all products                            | No           |
| `/product/create`    | GET    | Show product creation form                      | Admin        |
| `/product/create`    | POST   | Create product with image upload (Multer)       | Admin        |
| `/cart`              | GET    | Show current user cart with bill calculation    | Yes          |
| `/cart/add/:id`      | POST   | Add product to cart                             | Yes          |
| `/owner/admin`       | GET    | Admin dashboard / product management            | Admin        |
| `/owner/admin/products` | GET | List, edit, or manage products (implementation dependent) | Admin |

> **Note**: Actual paths and HTTP methods may differ slightly based on your route implementation. Keep this table updated when routes change.

---

## Screens / Pages Overview

- **Home / Shop (`/shop`)**
  - Displays a list of all available products.
  - Each product may show image, name, price, and actions (e.g., Add to cart).

- **Register (`/register`)**
  - Form for new users to create an account.
  - Shows **flash messages** for validation errors or success.

- **Login (`/login`)**
  - Form for existing users to log in.
  - On success, sets a JWT token (often stored in a cookie) and redirects to a protected page (e.g., `/shop` or `/cart`).

- **Cart (`/cart`)**
  - Shows items added by the current user.
  - Displays quantity, price, and **total bill** calculation.

- **Admin Panel (`/owner/admin`)**
  - Only accessible to users with admin rights.
  - Dashboard to manage products and access product creation/edit screens.

- **Product Creation (`/product/create`)**
  - Form for admins to create a new product.
  - Supports image upload via Multer (stored as Buffer in MongoDB).

- **Global Layout**
  - Shared header/navigation (e.g., links to Shop, Cart, Login/Logout).
  - Flash messages area for success/error feedback.
  - Tailwind-based responsive layout.

---

## Future Improvements

- **Role management UI** – Manage user roles (admin/user) directly from the admin panel.
- **Product editing & deletion** – Complete CRUD for products via the admin interface.
- **Order management** – Create orders from carts and add order history per user.
- **Pagination & filtering** – Improve the shop page UX for large product catalogs.
- **Image storage optimization** – Move from MongoDB Buffers to cloud storage (e.g., S3).
- **API layer** – Add a REST or GraphQL API for front-end or mobile clients.
- **Testing** – Add unit and integration tests (e.g., Jest, Supertest).

---

## Git & Contribution

- **Version control**:
  - The project uses Git for source control.
  - Commit frequently with clear, descriptive messages.
  - Keep your local branch in sync with `main`/`master` via `git pull`.

- **Contributing guidelines**:
  1. Fork the repository on GitHub.
  2. Create a new branch for your feature or bugfix:
     ```bash
     git checkout -b feature/your-feature-name
     ```
  3. Make your changes and ensure the app runs without errors.
  4. Commit and push your branch:
     ```bash
     git commit -m "Add meaningful description of your changes"
     git push origin feature/your-feature-name
     ```
  5. Open a Pull Request on GitHub and describe:
     - What you changed
     - Why you changed it
     - How to test it

- **Code style**:
  - Follow existing patterns in controllers, routes, and views.
  - Keep functions small, focused, and well-named.
  - Avoid committing `.env`, `node_modules`, and other generated files.

---

Happy coding and feel free to adapt this project to your own learning or production needs.


