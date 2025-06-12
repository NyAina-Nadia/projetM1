// routes/orderRoutes.js
const express = require('express');
const router = express.Router();

let savedOrder = null;

/**
 * @swagger
 * /api/checkout:
 *   post:
 *     summary: Enregistrer une commande
 *     description: Sauvegarder les articles du panier comme commande
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     nom:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *     responses:
 *       200:
 *         description: Commande sauvegardée
 */
router.post('/checkout', (req, res) => {
  const { cartItems } = req.body;
  if (!cartItems || !Array.isArray(cartItems)) {
    return res.status(400).json({ error: 'Panier invalide' });
  }
  savedOrder = cartItems;
  res.json({ message: 'Commande sauvegardée', order: savedOrder });
});

/**
 * @swagger
 * /api/order:
 *   get:
 *     summary: Récupérer la commande sauvegardée
 *     responses:
 *       200:
 *         description: La commande
 *       404:
 *         description: Aucune commande trouvée
 */
router.get('/order', (req, res) => {
  if (!savedOrder) {
    return res.status(404).json({ error: 'Aucune commande trouvée' });
  }
  res.json(savedOrder);
});

module.exports = router;
