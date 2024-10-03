import { Router } from 'express';
import * as usersController from '../controllers/usersController';

const userRoutes = Router();

// Create a new user
userRoutes.post('/', usersController.createUser);

// Get all users
userRoutes.get('/', usersController.getUsers);

// Get a single user by ID
userRoutes.get('/:id', usersController.getUserById);

// Update a user by ID
userRoutes.put('/:id', usersController.updateUser);

// Delete a user by ID
userRoutes.delete('/:id', usersController.deleteUser);

export default userRoutes;

