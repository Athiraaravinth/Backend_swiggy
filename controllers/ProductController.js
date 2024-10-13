const Product = require("../Models/Product");
const Firm = require('../Models/Firm');
const multer = require('multer');
const mongoose = require('mongoose');

const strorage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'uploads/');
    },
    filename : function(req,file,cb){
        cb(null,Date.now()+ path.extname(file.originalname));
    }

})
const upload = multer({storage : strorage})

const addProduct = async(req,res)=>{
    try {
        const {productName,price,category,bestSeller,description} = req.body;
        const image = req.file? req.file.filename : undefined;

        const firmId = req.params.firmId; 
        
        if (!mongoose.Types.ObjectId.isValid(firmId)) {
            return res.status(400).json({ error: "Invalid firm ID" });
        }

        const firm = await Firm.findById(firmId);
        if (!firm) {
            return res.status(404).json({ error: "Firm not found" });
        }


        const product = new Product({
            productName,
            price,
            category,
            bestSeller,
            description,
            image,
            firm:firm._id
        })

        const savedProduct = await product.save();
 
        await firm.save()
        
        return res.status(200).json({message : "Product added successfully" , product:savedProduct})
    } 
    catch (error) {
            console.log(error);
            return res.status(500).json({error :"Internal server error"})
    }
}

const getProductByFirm = async(req,res)=>{
    try {
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);

        if(!firm){
            return res.status(404).json({error:"no firm found"})
        }
        const  restaurantName = firm.firmName;


        const products = await Product.find({firm : firmId});

        res.status(200).json({restaurantName,products});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error :"Internal server error"})
        
    }
}

const deleteProductById = async(req,res)=>{
    try {
        const productId = req.params.productId;
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if(!deletedProduct){
            return res.status(404).json({error:"No product found"});
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error :"Internal server error"})
        
    }
}

module.exports = {addProduct:[upload.single('image'),addProduct],getProductByFirm,deleteProductById};

