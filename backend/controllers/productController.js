const db = require('../models/db');

// GET all 
exports.getAllProducts = (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.json(results);
  });
};



// GET  prod
exports.getProductById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });
    if (results.length === 0) return res.status(404).json({ message: 'Produit non trouvé' });
    res.json(results[0]);
  });
};

// POST prod 
exports.createProduct = (req, res) => {
  const { nom, description, price, image } = req.body;
  db.query(
    'INSERT INTO products (nom, description, price, image) VALUES (?, ?, ?, ?)',
    [nom, description, price, image],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Erreur lors de l’ajout' });
      res.status(201).json({ id: results.insertId, nom, description, price, image });
    }
  );
};

