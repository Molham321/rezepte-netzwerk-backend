
import express from "express";

import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/users";
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: express.Router) => {
  router.get('/users', getAllUsers);
  router.get('/users/:id', getUser);
  router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
  router.post('/users/:id', updateUser);
};