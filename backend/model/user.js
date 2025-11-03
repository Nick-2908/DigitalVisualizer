const { model } = require("mongoose");

const { LoginSchema } = require("../schemas/LoginSchema");

const LoginModel = new model("user", LoginSchema);

module.exports = { LoginModel };
