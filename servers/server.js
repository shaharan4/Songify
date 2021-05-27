const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port =process.env.PORT || 3001;
const route = require('./routes/index');

app.use(cors());

app.use(bodyParser.json());
app.use('/api', route);

mongoose.connect(
    'mongodb+srv://erickim:1234@cluster0.iibvh.mongodb.net/songify?retryWrites=true&w=majority',
    { useNewUrlParser:true,useUnifiedTopology:true },
    
    function(err){
        if(err){
            console.error('mongodb connection error', err);
        }
        console.log('mongodb connected.')
    }
);
var db = mongoose.connection;

var user = mongoose.Schema({
    name : 'string',
    password : 'number',
    email : 'string'
});

// var User = mongoose.model('users', user);
// var newUser= new User({name:"xin", password:"1234", email:"ggggg"});
    
//     // console.log("hi");
//     newUser.save(function(error, data){
//         if(error){
//             console.log(error);
//         }
//         else{
//             console.log('Saved');
//         }
//     });


// User.remove({_id:'5faa0f201acdb25e9cfe3c94'}, function(error,output){
//     console.log('--- Delete ---');
//     if(error){
//         console.log(error);
//     }

//     /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
//         어떤 과정을 반복적으로 수행 하여도 결과가 동일하다. 삭제한 데이터를 다시 삭제하더라도, 존재하지 않는 데이터를 제거요청 하더라도 오류가 아니기 때문에
//         이부분에 대한 처리는 필요없다. 그냥 삭제 된것으로 처리
//         */
//     console.log('--- deleted ---');
// });

// var newUser= new User({name:"eric Kimss", password:"1114", email:"jyjy534@gmail.com"});

// newUser.save(function(error, data){
//     if(error){
//         console.log(error);
//     }
//     else{
//         console.log('Saved');
//     }
// });

app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})