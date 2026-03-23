const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node Auth API',
      version: '1.0.0',
      description: 'Node.js + MongoDB Authentication, Authorization & Product CRUD API',
      contact: {
        name: 'API Support',
        email: 'support@nodeauthapi.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Development Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '664f1a2b3c4d5e6f7a8b9c0d' },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', example: 'john@example.com' },
            role: { type: 'string', enum: ['user', 'admin'], example: 'user' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        RegisterInput: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', format: 'email', example: 'john@example.com' },
            password: { type: 'string', minLength: 6, example: 'password123' },
          },
        },
        LoginInput: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email', example: 'john@example.com' },
            password: { type: 'string', example: 'password123' },
          },
        },
        AuthResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
            user: { $ref: '#/components/schemas/User' },
          },
        },
        Product: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '664f1a2b3c4d5e6f7a8b9c0e' },
            name: { type: 'string', example: 'Wireless Headphones' },
            description: { type: 'string', example: 'Premium noise-cancelling headphones' },
            price: { type: 'number', example: 99.99 },
            category: { type: 'string', example: 'Electronics' },
            stock: { type: 'integer', example: 50 },
            imageUrl: { type: 'string', example: 'https://example.com/image.jpg' },
            createdBy: { $ref: '#/components/schemas/User' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        ProductInput: {
          type: 'object',
          required: ['name', 'price', 'category'],
          properties: {
            name: { type: 'string', example: 'Wireless Headphones' },
            description: { type: 'string', example: 'Premium noise-cancelling headphones' },
            price: { type: 'number', minimum: 0, example: 99.99 },
            category: { type: 'string', example: 'Electronics' },
            stock: { type: 'integer', minimum: 0, example: 50 },
            imageUrl: { type: 'string', example: 'https://example.com/image.jpg' },
          },
        },
        ProductsResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            count: { type: 'integer', example: 10 },
            total: { type: 'integer', example: 100 },
            page: { type: 'integer', example: 1 },
            pages: { type: 'integer', example: 10 },
            data: {
              type: 'array',
              items: { $ref: '#/components/schemas/Product' },
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Error message' },
            errors: {
              type: 'array',
              items: { type: 'object' },
            },
          },
        },
        Success: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Operation successful' },
          },
        },
      },
    },
    tags: [
      { name: 'Auth', description: 'Authentication & Authorization endpoints' },
      { name: 'Products', description: 'Product CRUD operations' },
      { name: 'Users', description: 'User management (Admin only)' },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
