const connection = require('./models/db'); // adapte le chemin selon ta structure
const express = require('express');
const cors = require('cors');
const util = require('util');

const app = express();

const query = util.promisify(connection.query).bind(connection);

const productRoutes = require('./routes/productRoutes'); // adapte le chemin

app.use(cors());
app.use(express.json());


app.use('/api/products', productRoutes);


app.post('/api/checkout', (req, res) => {
  const { cartItems } = req.body;

  if (!cartItems || !Array.isArray(cartItems)) {
    return res.status(400).json({ error: 'Panier invalide' });
  }

  const insertQuery = `
    INSERT INTO orders (product_name, quantity, price, total)
    VALUES (?, ?, ?, ?)
  `;

  cartItems.forEach((item) => {
    const price = typeof item.price === 'string'
      ? parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0
      : item.price;

    const total = price * item.quantity;

    connection.query(insertQuery, [item.nom, item.quantity, price, total], (err) => {
      if (err) console.error('Erreur d’insertion :', err);
    });
  });

  res.json({ message: 'Commande enregistrée dans la base de données' });
});


app.get('/api/orders', (req, res) => {
  connection.query('SELECT * FROM orders ORDER BY created_at DESC', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la récupération des commandes' });
    }
    res.json(results);
  });
});


app.get('/api/product/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const product = await query('SELECT * FROM products WHERE id = ?', [id]);
    const variants = await query('SELECT * FROM product_variants WHERE product_id = ?', [id]);

    if (product.length === 0) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }

    res.json({
      ...product[0],
      variants: variants
    });

  } catch (error) {
    console.error('Erreur lors de la récupération du produit :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});


const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
