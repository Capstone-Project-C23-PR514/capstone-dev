const bcrypt = require("bcryptjs")
const UsersModel = require("../models/users")

const middleware = async (email, password) => {
  const user = await UsersModel.findOne({
    where: { email: email },
  })
  const isPasswordValid = bcrypt.compareSync(password, user.password)

  return { user, isPasswordValid }
}

module.exports = middleware
