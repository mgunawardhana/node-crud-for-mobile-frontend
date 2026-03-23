require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const Product = require('./src/models/Product');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB');
};

const seed = async () => {
  await connectDB();

  // Clear existing data
  await User.deleteMany({});
  await Product.deleteMany({});
  console.log('🗑️  Cleared existing data');

  // Create admin user
  const admin = await User.create({
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
  });

  // Create regular user
  const user = await User.create({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'user123',
    role: 'user',
  });

  console.log('👤 Created admin:', admin.email);
  console.log('👤 Created user:', user.email);

  // Create sample products
  const products = await Product.insertMany([
    {
      name: 'Wireless Headphones',
      description: 'Premium noise-cancelling Bluetooth headphones',
      price: 99.99,
      category: 'Electronics',
      stock: 50,
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      createdBy: admin._id,
    },
    {
      name: 'Running Shoes',
      description: 'Lightweight and breathable running shoes',
      price: 79.99,
      category: 'Sports',
      stock: 100,
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
      createdBy: admin._id,
    },
    {
      name: 'Coffee Maker',
      description: 'Automatic drip coffee maker with timer',
      price: 49.99,
      category: 'Kitchen',
      stock: 30,
      imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
      createdBy: admin._id,
    },
    {
      name: 'Yoga Mat',
      description: 'Non-slip premium yoga mat, 6mm thick',
      price: 29.99,
      category: 'Sports',
      stock: 75,
      createdBy: admin._id,
    },
    {
      name: 'Smart Watch',
      description: 'Fitness tracker with heart rate monitor',
      price: 149.99,
      category: 'Electronics',
      stock: 25,
      createdBy: admin._id,
    },
  ]);

  console.log(`📦 Created ${products.length} products`);
  console.log('\n✅ Seed completed!\n');
  console.log('─────────────────────────────────');
  console.log('Login credentials:');
  console.log('  Admin → admin@example.com / admin123');
  console.log('  User  → john@example.com  / user123');
  console.log('─────────────────────────────────\n');

  mongoose.connection.close();
};

seed().catch((err) => {
  console.error('❌ Seed error:', err);
  mongoose.connection.close();
  process.exit(1);
});
