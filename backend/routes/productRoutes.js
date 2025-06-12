const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/**
 * @swagger
 * /api/products:
 *   get:
 *     description: Obtenir tous les produits
 *     responses:
 *       200:
 *         description: Liste de produits
 */
router.get('/', productController.getAllProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     description: Obtenir un produit par ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Produit trouvé
 */
router.get('/:id', productController.getProductById);

/**
 * @swagger
 * /api/products:
 *   post:
 *     description: Ajouter un produit
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: produit
 *         schema:
 *           type: object
 *           properties:
 *             nom:
 *               type: string
 *             description:
 *               type: string
 *             price:
 *               type: string
 *             image:
 *               type: string
 *     responses:
 *       201:
 *         description: Produit ajouté
 */
router.post('/', productController.createProduct);

module.exports = router;
//router.get('/:id', productController.getProductById);
