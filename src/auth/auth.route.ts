import { Router } from 'express';
import { signIn } from './controllers/auth.controller';

const SignRouters = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthDto:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *       example:
 *         email: user@example.com
 *         password: password123
 *     AuthResponseDto:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: The JWT token
 *       example:
 *         token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The authentication managing API
 */

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Sign in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthDto'
 *     responses:
 *       200:
 *         description: The authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponseDto'
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Some server error
 */

SignRouters.post('/signin', signIn);

export default SignRouters;
