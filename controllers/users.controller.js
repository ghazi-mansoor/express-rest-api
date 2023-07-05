const UserCRUDService = require("../services/user-crud.service");
const RequestValidator = require("../controllers/validators/user-request.validator")

exports.getAllUsersController = async function (req, res) {

    const users = await UserCRUDService.getUserByName();

    if (users.length === 0) {
        return res.status(404).json({ status: 404, data: users, message: "No users found." });
    }

    return res.status(200).json({ status: 200, data: users, message: "Retrieved users." });
}

exports.getUserByNameController = async function (req, res) {

    const userName = req.params['username'];
    const user = await UserCRUDService.getUserByName(userName);

    if (user) {
        return res.status(200).json({ status: 200, data: user, message: "User retrieved by name."});
    } else {
        return res.status(404).json({ status: 404, message: "No user found with provided name." });
    }
}

exports.createNewUserController = async function (req, res) {

    const isNewUserRequestBodyValid = RequestValidator.validateNewUserRequestBody(req.body);

    if (!isNewUserRequestBodyValid) {
        return res.status(400).json({ status: 400, message: "Bad new user request payload." });
    }

    const newUser = { firstName: req.body['firstName'], email: req.body['email'] };

    const savedUserId = await UserCRUDService.saveUser(newUser);

    if (savedUserId === undefined || savedUserId === null) {
        return res.status(500).json({ status: 500, message: "Error saving user. Something went wrong." });
    }

    return res.status(200).json({ status: 200, message: `New user saved with id: ${savedUserId}` });
}
