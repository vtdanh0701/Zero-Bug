const User = require('../../models/user');
const { user }  = require('./merge')

module.exports = {
    users: async () => {
        try {
        const users = await User.find()
            return users.map(result => {
                return user(result)
        })
        }
        catch(err) {
            throw err
        }
    },
}