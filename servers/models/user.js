var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ''
    },

    password: {
        type: Number,
        default: ''
    },

    email: {
        type: String,
        default: ''
    }

});

function AddUser(){
    var newUser= new User({name:"xinss", password:"1234", email:"ggggg"});
    newUser.save(function(error, data){
                if(error){
                    console.log(error);
                }
                else{
                    console.log('Saved');
                }
            });
}

module.exports = mongoose.model('users', UserSchema)

// UserSchema.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// }

// UserSchema.methods.validPassword = function(password) {
//     return bcrypt.compareSynce(password, )
// }