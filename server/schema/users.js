const mongoose = require("mongoose");

const schemaUsersUpfront = new mongoose.Schema({
  addressWallet: {
    type: String,
    require: true,
  },
  timeRegistered: {
    type: String,
    require: true,
  },
});

const UsersUpfront = mongoose.model("users_upfronts", schemaUsersUpfront);

module.exports = {
  modalUsersUpfront: UsersUpfront,
};
