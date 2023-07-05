const users = require("../datastore/users.datastore");
const UUID = require("uuid");

exports.getAllUsersFromDataStore = function () {
    return users;
}

exports.getUserByNameFromDataStore = function (userName) {
    return users.find(user => user.firstName.toLowerCase() === userName.toLowerCase());
}

exports.saveUserToDataStore = function ({ email, firstName }) {
    const newUserWithId = { email, firstName, id: UUID.v4() };
    users.push(newUserWithId);

    return newUserWithId.id;
}
