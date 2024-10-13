const express = require('express');
const prodcutController = require('../controllers/ProductController');

const router = express.Router();

router.post('/add-product/:firmId',prodcutController.addProduct);
router.get('/:firmId/products',prodcutController.getProductByFirm)

router.get('/uploads/:imageName',(req,res)=>{
    const imageName = req.params.imageName;
    res.headersSent('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads', imageName));

})

router.delete('/:productId',prodcutController.deleteProductById);

module.exports = router;