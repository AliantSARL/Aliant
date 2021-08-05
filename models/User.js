/** // Schema for Users
 const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})
 //Creating the collection User
 const User = mongoose.model('User', userSchema)

 // Adding a User to User
 app.post('/', (req, res) => {
    name = req.body.name,
        email = req.body.email
    let newUser = new User({
        name: name,
        email: email
    })
    newAddress.save().then((user) => {
        res.send(user)
    }).catch((err) => {
        console.log(error)
    })
})

 module.exports = User; **/