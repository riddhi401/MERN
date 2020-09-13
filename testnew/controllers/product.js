const Product = require("../models/product");
const formidable = require("formidable");
const  _ = require ("lodash");
const fs = require("fs");
const product = require("../models/product");
const { sortBy } = require("lodash");
const { update } = require("../models/product");
// fs is a file system

exports.getProductById = (req,res,next,id) =>{
    Product.findById(id)
        .populate("category")
        .exec((err,product) =>{
            if(err){
                return res.status(400).json({
                    error:"PRODUCT NOT FOUND"
                })
            }
            req.product = product;
            next();
        });
} ;



exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
  
    form.parse(req, (err, fields, file) => {
      if (err) {
        return res.status(400).json({
          error: "NOT INSERT IMAGE"
        });
      }
      //destructure the fields
      const { name, description, price, category, stock } = fields;
  
      if (!name || !description || !price || !category || !stock ) {
        return res.status(400).json({
          error: "PLEASE INCLUDE ALL FIELDS"
        });
      }
  
      let product = new Product(fields);
  
      //handle file here
      if (file.photo) {
        if (file.photo.size > 3000000) {
          return res.status(400).json({
            error: "FILE SIZE TOO BIG!"
          });
        }
        product.photo.data = fs.readFileSync(file.photo.path);
        product.photo.contentType = file.photo.type;
      }
      console.log(product);
  
      //save to the DB
      product.save((err, product) => {
        if (err) {
          res.status(400).json({
            error: "SAVINF TSHIRT IN DATABASE FAIELD"
          });
        }
        res.json(product);
      });

    });
  };
  

exports.getProduct = (req,res) =>{
    req.product.photo = undefined;
    return res.json(req.product)
}

exports.photo = (req,res,next) =>{
    if(req.product.photo.data){
        res.set("Content-Type",req.product.photo.contentType)
        return res.send(req.product.photo.data)

    }
    next();
}


exports.deleteProduct = (req,res) =>{
    let product = req.product;
    product.remove((err,deleteProduct)=>{
        if(err){
            return res.status(400).json({
                error:"faield to delete product"
            })
        }
        res.json({
            message:"SUCCESSFULLY DELETED PRODUCT",
            deleteProduct
        })
    })

}

exports. updateProduct = (req,res) =>{
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "PROBLEM WITH IMAGE"
      });
    }
    
    //update code
    let product = req.product;
    product = _.extend(product,fields)

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "FILE TOO BIG!"
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    console.log(product);

    //save to the DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "UPDATE OF PRODUCT FAIELD"
        });
      }
      res.json(product);
    });

  });

}

//listing product
exports.getAllProudcts = (req,res) =>{
 let limit = req.query.limit ? parseInt(req.query.limit) : 8 
 let sortBy = req.query.sortBy ? req.query.sortBy :"_id"

 Product.find()
  .select("-photo")
  .populate("category")
  .sort([[sortBy,"asc"]])
  .limit(limit)
  .exec((err,products) =>{
    if(err){
      return res.status(400).json({
        error:"no Product found"
      })
    }
    res.json(products);
  })
  

}


exports.getAllUniqueCategories = (req,res) =>{
  Product.distinct("category",{},(err,category) =>{
    if(err){
      return res.status(400).json({
        error:"NO CATEGORY FOUND"
      })
    }
    res.json(category);
  })

}

// custom middleware
exports.updatestock = (req,res,next) =>{
  let myOperations = req.body.order.products.map(prod => {
    return {
      updateOne:{
        filter: {_id: prod._id},
        update:{$inc: {stock: -prod.count, sold: +prod.count}}
      }
    }
   

  })
  product.bulkWrite(myOperations,{},(err,products) =>{
    if(err){
      return res.status(400).json({
        error:"BULK OPRATIONS FIELD"
      })
    }
    next();
  })
}
