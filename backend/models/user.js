const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true , unique: true},
    password: { type: String, required: true },
    quota: { type: String }
},
    //{ collection: 'user-data' } in this case, the collection name will be user-data.

)

const User = mongoose.model('User', userSchema)

module.exports = User


//In your case, the model is named "User", so Mongoose will create a collection named "users" in the "auth" database.

