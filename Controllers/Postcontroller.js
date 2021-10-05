const express = require("express");
const app = express();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const PostModel = require('../Models/Posts')

//Access = Private
//Example routes.get('/',(req,res)=>{})
async function GetPost(req, res) {
  const user = await PostModel.find({userId:req.userId}).populate('user',["username","password"])
  console.log(user);
}

//Access = private
//Post something
async function Post(req, res) {
  const { title, description, url, status } = req.body;
  if (!title) {
    res.status(400).json({ success: false, message: "Title is required" });
  }
  try {
    const Newpost = new PostModel( {
      title,
      description,
      url,
      status,
      user:req.userId
    });
    await Newpost.save()
    res.json({ success: true, message: "Post successfully",Newpost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Interval server" });
  }
}
////Access = private
//PUT something
async function PutPost(req,res){
  const { title, description, url, status } = req.body;
  if (!title) {
    res.status(400).json({ success: false, message: "Title is required" });
  }
  try {
    let updatePost = {
      title : title,
      description : description || '',
      url :url || '',
      status : status || false,
      user:req.userId
    }
    let updatePostCondition = {_id : req.params.id,user : req.userId} //check id , user 
    let updateNewpost = await PostModel.findOneAndUpdate(updatePostCondition,updatePost,{new:true})
    if (!updateNewpost){
      return res.status(400).json({success:false,message:'Post not found or user not found'})
    }
    res.json({success:true,message:'Update successfully',post : updateNewpost})
  } catch (error) {
    console.log(error)
    res.status(500).json({success:false,message:'Interval server error'})
  }
}

////Access = private
//Delete something
async function DeletePost(req,res){
  try {
    const deletePostCondition = {_id : req.params.id,user:req.userId}
    const deletePost = await PostModel.deleteOne(deletePostCondition)
    if(!deletePost){
      res.status(403).json({success:false,message:'Delete error'})
    }
    res.json({success:true,message:'Delete successfully',post :deletePost})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:'Interval server error'})
  }
}

module.exports = { GetPost, Post,PutPost,DeletePost };
