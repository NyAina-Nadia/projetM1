const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const { swaggerUi, swaggerSpec } = require('./swagger/swagger');



const app = express();
app.use(cors());
app.use(express.json());

// Routes API
app.use('/api/products', productRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Gestion d'erreur 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

const cartRoutes = require('./routes/cart');
app.use('/api/cart', cartRoutes);


module.exports = app;
