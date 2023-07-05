const UserCRUDController = require("../controllers/users.controller");
const express = require("express");

const UserCRUDRouter = express.Router();

UserCRUDRouter.get('/', UserCRUDController.getAllUsersController);
UserCRUDRouter.get('/:username', UserCRUDController.getUserByNameController);
UserCRUDRouter.post('/add', UserCRUDController.createNewUserController);

module.exports = UserCRUDRouter;
