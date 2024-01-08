
import express from "express";

import { authentication } from '../helpers';


import { deleteUserById, getUserById, getUsers } from "../db/users";


export const getAllUsers = async (req: express.Request, res: express.Response) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users);

  } catch (error) {
    console.log(error)
    return res.sendStatus(400);
  }
}

export const getUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    const user = await getUserById(id);

    return res.status(200).json(user);
    
  } catch (error) {
    console.log(error)
    return res.sendStatus(400);
  }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    const deleteUser = await deleteUserById(id);

    return res.json(deleteUser);

  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;

    const user = await getUserById(id).select('+authentication.salt +authentication.password');


    if (username !== undefined) {
      user.username = username;
    }

    if (email !== undefined) {
      user.email = email;
    }

    if (password !== undefined) {

      user.authentication.password = authentication(user.authentication.salt, password);
    }

    await user.save();

    return res.status(200).json(user).end();

  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}
