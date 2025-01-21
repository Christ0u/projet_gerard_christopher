const fs = require('fs');
const path = require('path');
const db = require('./models');
const Products = db.products;

const productsFilePath = path.join(__dirname, '/controllers/data/products.json');
const productsData = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));

async function initializeProducts() {
  try {
    await db.sequelize.sync();
    await Products.bulkCreate(productsData.products);
    console.log('Products have been successfully added to the database.');
  } catch (error) {
    console.error('Failed to initialize products:', error);
  }
}

initializeProducts();