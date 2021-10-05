const mongoose=require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username :{
        type :String,
        require : true,
        unique : true
    },
    password :{
        type:String,
        require:true
    },
    CreatedAt :{
        type : Date,
        default:Date.now()
    }
},
{
    collection: "users"
}
)
module.exports = mongoose.model('users',UserSchema)