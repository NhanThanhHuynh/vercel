const mongoose=require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    title :{
        type:String,
        required : true
    },
    description : {
        type : String
    },
    url :{
        type : String
    },
    status : {
        type : String
    },
    user :{
        type : Schema.Types.ObjectId,
        ref : "users"
    }
},{
    collection :"posts"
})

module.exports=mongoose.model('posts',PostSchema)