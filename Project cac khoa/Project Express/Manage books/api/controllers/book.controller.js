const Book = require("../../models/book.model.js");

module.exports.index=async (req,res)=>{
    var books= await Book.find()
    res.json(books);
};
module.exports.getBook=async (req,res)=>{
    var book= await Book.findById({_id: req.params.id})
    res.json(book);
};
module.exports.delete=async (req,res)=>{
    var book=await Book.findOneAndRemove({_id: req.params.id})
    res.json(book);
};
module.exports.update=async (req,res)=>{
    var book= await Book.findByIdAndUpdate(req.params.id,{title: req.body.title})
    res.json(book);
};