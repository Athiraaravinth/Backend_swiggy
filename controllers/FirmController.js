
const Vendor = require('../Models/Vendor');
const Firm = require('../Models/Firm');
const multer = require('multer');

const strorage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'uploads/');
    },
    filename : function(req,file,cb){
        cb(null,Date.now()+ path.extname(file.originalname));
    }

})
const upload = multer({storage : strorage})


const addFirm = async(req,res)=>{
    try {
    const {firmName,area,category,region,offer} = req.body;

    const image = req.file? req.file.filename : undefined;  
   
    const vendor= await Vendor.findById(req.vendorId);

    if(!vendor){
        res.status(404).json({message : "vendor not found"})
    }

    const firm = new Firm({
        firmName,area,category,region,offer,image, vendor:vendor._id
    })

    const savedFirm = await firm.save();

    vendor.firm.push(savedFirm)

    await vendor.save()
    
    return res.status(200).json({message : "Firm added successfully"})
} 
catch (error) {
        console.log(error);
        return res.status(500).json({error :"Internal server error"})
}
}

const deletedFirmById = async(req,res)=>{
    try {
        const firmId = req.params.firmId;
        const deleteFirm = await Firm.findByIdAndDelete(firmId);

        if(!deleteFirm){
            return res.status(404).json({error:"No product found"});
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error :"Internal server error"})
        
    }
}

module.exports = {addFirm : [upload.single('image'),addFirm],deletedFirmById}