const mongoose = require('mongoose');
const connection = "mongodb+srv://admin:songify@accounts.ea1jm.mongodb.net/Accounts?retryWrites=true&w=majority";
mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));