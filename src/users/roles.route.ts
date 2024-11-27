import { Router } from 'express';
import {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} from './controllers/role.controller';

const RoleRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Roles management and retrieval
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Retrieve a list of roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: A list of roles
 */
RoleRouter.get('/', getRoles);

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Retrieve a single role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The role ID
 *     responses:
 *       200:
 *         description: A single role
 *       404:
 *         description: Role not found
 */
RoleRouter.get('/:id', getRoleById);

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Role created
 */
RoleRouter.post('/', createRole);

/**
 * @swagger
 * /roles:
 *   patch:
 *     summary: Update an existing role
 *     tags: [Roles]
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
 *     responses:
 *       200:
 *         description: Role updated
 */
RoleRouter.patch('/', updateRole);

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Delete a role
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The role ID
 *     responses:
 *       200:
 *         description: Role deleted
 */
RoleRouter.delete('/:id', deleteRole);

export default RoleRouter;
