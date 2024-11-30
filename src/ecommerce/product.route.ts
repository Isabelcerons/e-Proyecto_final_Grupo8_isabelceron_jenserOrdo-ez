import { Router } from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  checkProductExist,
  findMostExpensiveProduct,
  getAveragePrice,
} from './controllers/product.controller';

const ProductRouter = Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: price
 *         schema:
 *           type: number
 *         description: Filter products by price
 *     responses:
 *       200:
 *         description: List of all products
 */
ProductRouter.get('/', getProducts);

/**
 * @swagger
 * /products/most-expensive:
 *   get:
 *     summary: Find the most expensive products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limit the number of products returned
 *     responses:
 *       200:
 *         description: List of most expensive products
 */
ProductRouter.get('/most-expensive', findMostExpensiveProduct);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product data
 *       404:
 *         description: Product not found
 */
ProductRouter.get('/:id', getProductById);

/**
 * @swagger
 * /products/{id}/exists-history:
 *   get:
 *     summary: Check if a product has a price history
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product exists
 *       404:
 *         description: Product not found
 */
ProductRouter.get('/:id/exists-history', checkProductExist);

/**
 * @swagger
 * /products/{id}/average-price:
 *   get:
 *     summary: Get the average price of a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Average price of the product
 */
ProductRouter.get('/:id/average-price', getAveragePrice);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               categoriesIds:
 *                 type: array
 *                 items:
 *                   type: number
 *     responses:
 *       201:
 *         description: Product created successfully
 */
ProductRouter.post('/', createProduct);

/**
 * @swagger
 * /products:
 *   patch:
 *     summary: Update an existing product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               categoriesIds:
 *                 type: array
 *                 items:
 *                   type: number
 *     responses:
 *       200:
 *         description: Product updated successfully
 */
ProductRouter.patch('/', updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
ProductRouter.delete('/:id', deleteProduct);

export default ProductRouter;
