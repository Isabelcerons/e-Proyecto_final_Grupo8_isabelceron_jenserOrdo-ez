import { Router } from 'express';
import {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
  countRoles,
  searchRoleByName,
} from './controllers/role.controller';

const RoleRouter = Router();
/**
 * @swagger
 * /roles/total-roles:
 *   get:
 *     summary: Get the total number of roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: The total number of roles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 *                   example: 3
 */
RoleRouter.get('/total-roles', countRoles);
/**
 * @swagger
 * /roles/search:
 *   get:
 *     summary: Search for a role by name
 *     tags: [Roles]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the role to search for
 *     responses:
 *       200:
 *         description: A role object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *       404:
 *         description: Role not found
 */
RoleRouter.get('/search', searchRoleByName);
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
