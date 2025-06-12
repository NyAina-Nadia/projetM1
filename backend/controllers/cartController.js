const db = require('../models/db');


exports.addToCart = (req, res) => {
  const { product_id, quantity } = req.body;


  if (!product_id || !quantity || quantity < 1) {
    return res.status(400).json({ message: 'product_id et quantity valides requis' });
  }


  db.query('SELECT * FROM cart WHERE product_id = ?', [product_id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });
// Maj de la quantité
    if (results.length > 0) {
      
      const newQuantity = results[0].quantity + quantity;
      db.query('UPDATE cart SET quantity = ? WHERE product_id = ?', [newQuantity, product_id], (err2) => {
        if (err2) return res.status(500).json({ message: 'Erreur lors de la mise à jour du panier' });
        res.json({ message: 'Quantité mise à jour', product_id, quantity: newQuantity });
      });
    } else {
      // Ajouter article dans le panier
      db.query('INSERT INTO cart (product_id, quantity) VALUES (?, ?)', [product_id, quantity], (err2) => {
        if (err2) return res.status(500).json({ message: 'Erreur lors de l’ajout au panier' });
        res.status(201).json({ message: 'Produit ajouté au panier', product_id, quantity });
      });
    }
  });
};

//  infos produits)
exports.getCartItems = (req, res) => {
  const query = `
    SELECT cart.id, cart.product_id, cart.quantity, p.nom, p.description, p.price, p.image
    FROM cart
    JOIN products p ON cart.product_id = p.id
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });
    res.json(results);
  });
};
