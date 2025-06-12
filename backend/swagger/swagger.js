const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
app.use('/api', productRoutes);
app.use('/api', orderRoutes);


const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SUN CO. API',
      version: '1.0.0',
      description: 'API documentation for SUN CO.(produits + commandes)',
    },
  },
  apis: ['./routes/*.js'], 
};
const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
