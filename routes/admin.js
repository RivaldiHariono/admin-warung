const router = require('express').Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

router.get('/login',adminController.viewLogIn);
router.post('/login', adminController.actionLogIn);
router.use(auth);
router.get('/dashboard',adminController.viewDashboard);
router.get('/logout', adminController.actionLogout);

//Endpoint Product
router.get('/product',adminController.viewProduct);
router.post('/product',adminController.addProduct);
router.put('/product', adminController.updateProduct);
router.delete('/product/:id', adminController.deleteProduct);

module.exports = router;