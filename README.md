# 🔐 Node.js Auth API

Full-featured **Node.js + MongoDB** REST API with Authentication, Authorization & Product CRUD, documented with **Swagger UI**.

---

## 🚀 Features

- **JWT Authentication** — Register, Login, Profile management
- **Role-Based Authorization** — `user` and `admin` roles
- **Product CRUD** — Full Create / Read / Update / Delete with soft-delete
- **Swagger UI** — Interactive API docs at `/api-docs`
- **Input Validation** — express-validator on all endpoints
- **Pagination, Filtering & Search** — on Products list
- **Seed Script** — Instantly populate DB with sample data

---

## 📁 Project Structure

```
node-auth-api/
├── src/
│   ├── config/
│   │   ├── db.js          # MongoDB connection
│   │   └── swagger.js     # Swagger config & schemas
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── auth.js        # protect & authorize middleware
│   │   └── validate.js    # express-validator handler
│   ├── models/
│   │   ├── User.js
│   │   └── Product.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   └── userRoutes.js
│   └── server.js
├── seed.js                # DB seed script
├── .env.example
├── package.json
└── README.md
```

---

## ⚙️ Setup & Installation

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env .env
```

Edit `.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/nodeauthapi
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

### 3. (Optional) Seed sample data

```bash
node seed.js
```

This creates:
- Admin: `admin@example.com` / `admin123`
- User: `john@example.com` / `user123`
- 5 sample products

### 4. Start the server

```bash
# Development (with hot-reload)
npm run dev

# Production
npm start
```

---

## 📖 API Documentation

Open **Swagger UI**: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

To use protected endpoints in Swagger:
1. Call `/api/auth/login`
2. Copy the `token` from the response
3. Click **Authorize 🔒** (top right)
4. Enter: `Bearer <your-token>`

---

## 🛣️ API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login & get JWT |
| GET | `/api/auth/me` | Private | Get own profile |
| PUT | `/api/auth/me` | Private | Update own profile |
| PUT | `/api/auth/change-password` | Private | Change password |

### Products
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/products` | Public | Get all products |
| GET | `/api/products/:id` | Public | Get single product |
| POST | `/api/products` | Admin | Create product |
| PUT | `/api/products/:id` | Admin | Update product |
| DELETE | `/api/products/:id` | Admin | Soft delete product |
| DELETE | `/api/products/:id/permanent` | Admin | Hard delete product |

### Users (Admin only)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/users` | Admin | Get all users |
| GET | `/api/users/:id` | Admin | Get user by ID |
| PUT | `/api/users/:id` | Admin | Update user role/status |
| DELETE | `/api/users/:id` | Admin | Delete user |

---

## 🔍 Product Query Parameters

```
GET /api/products?page=1&limit=10&category=Electronics&search=headphones&minPrice=50&maxPrice=200&sortBy=price&order=asc
```

---

## 🔒 Authorization

| Role | Permissions |
|------|-------------|
| `user` | View products, manage own profile |
| `admin` | All user permissions + manage products + manage users |

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Auth**: JWT (jsonwebtoken) + bcryptjs
- **Validation**: express-validator
- **Docs**: swagger-jsdoc + swagger-ui-express
