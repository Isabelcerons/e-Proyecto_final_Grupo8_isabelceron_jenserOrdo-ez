import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  countUsersRoles,
} from './controllers/user.controller';

const UserRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and retrieval
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 */
UserRouter.get('/', getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a single user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A single user
 */
UserRouter.get('/:id', getUserById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *               password:
 *                 type: string
 *               people:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: string
 *                   secondName:
 *                     type: string
 *                   firstLastName:
 *                     type: string
 *                   secondLastName:
 *                     type: string
 *                   address:
 *                     type: string
 *               roles:
 *                 type: array
 *                 items:
 *                   type: number
 *     responses:
 *       201:
 *         description: User created
 */
UserRouter.post('/', createUser);

/**
 * @swagger
 * /users:
 *   patch:
 *     summary: Update an existing user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *               email:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *               password:
 *                 type: string
 *               people:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   firstName:
 *                     type: string
 *                   secondName:
 *                     type: string
 *                   firstLastName:
 *                     type: string
 *                   secondLastName:
 *                     type: string
 *                   address:
 *                     type: string
 *                   userId:
 *                     type: number
 *               roles:
 *                 type: array
 *                 items:
 *                   type: number
 *     responses:
 *       200:
 *         description: User updated
 */
UserRouter.patch('/', updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       204:
 *         description: User deleted
 */
UserRouter.delete('/:id', deleteUser);

/**
 * @swagger
 * /users/count-roles/{id}:
 *   get:
 *     summary: Get the total number of roles for a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The total number of roles for a user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 *                   example: 2
 */
UserRouter.get('/count-roles/:id', countUsersRoles);

export default UserRouter;
