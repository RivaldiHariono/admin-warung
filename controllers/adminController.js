const Product = require('../models/Product');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = {
    viewLogIn : async(req,res) => {
        try {
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {
                message: alertMessage,
                status : alertStatus
            }
            if(req.session.user == null || req.session.user == undefined){
                res.render('index',{
                    alert,
                    title: "Warung - Oma | Log In"
                });
            }else{
                res.redirect('/admin/dashboard');  
            }

        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/login');
        }
    },
    actionLogIn: async(req,res)=>{
        try{
            const {username,password} = req.body;
            const user = await User.findOne({username:username});
            if(!user){
                req.flash('alertMessage', 'Username not found');
                req.flash('alertStatus','danger');
                res.redirect('/admin/login');
            }
            const passwordMatch = await bcrypt.compare(password,user.password);
            if(!passwordMatch){
                req.flash('alertMessage', 'Password Wrong');
                req.flash('alertStatus','danger');
                res.redirect('/admin/login');
            }
            req.session.user = {
                id : user.id,
                username : user.username
            }
            res.redirect('/admin/dashboard');
            


        }catch{
            res.redirect('admin/login');
        }
    },

    actionLogout: (req,res) => {
        req.session.destroy();
        res.redirect('admin/login');
    },



    viewDashboard: (req,res) => {
        try {
            res.render('admin/dashboard/view_dashboard',{
                title: "Warung Oma",
                user : req.session.user
            });
        } catch (error) {
            
        }
    },

    viewProduct : async(req,res) => {
        try {
            const product = await Product.find();
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {
                message: alertMessage,
                status : alertStatus,
            }
            res.render('admin/product/view_product',{
            product,
            alert,
            title: "Warung - Oma | Product",
            user : req.session.user
            
        });
        } catch (error) {
            res.render('admin/product/view_product');
        }
    },
    addProduct: async (req,res)=>{
        try {
            const {name, price, stock, description} = req.body;
            await Product.create({ name, price, stock, description });
            req.flash('alertMessage', 'Success Add Product');
            req.flash('alertStatus','success');
            res.redirect('/admin/product');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus','danger');
            res.redirect('/admin/product');
        }
    },
    updateProduct: async (req, res) => {
        try {
          const { id, name, stock, price, description } = req.body;
          const product = await Product.findOne({ _id: id });
          product.name          = name;
          product.stock         = stock;
          product.price         = price;
          product.description   = description;
          await product.save();
          req.flash('alertMessage', 'Success Update Product');
          req.flash('alertStatus', 'success');
          res.redirect('/admin/product');
        } catch (error) {
          req.flash('alertMessage', `${error.message}`);
          req.flash('alertStatus', 'danger');
          res.redirect('/admin/product');
        }
    },
    deleteProduct : async (req,res) => {
        try {
            const { id } = req.params;
            const product = await Product.findOne({_id: id});
            await product.remove();
            req.flash('alertMessage', 'Success Delete Product');
            req.flash('alertStatus','danger');
            res.redirect('/admin/product');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus','danger');
            res.redirect('/admin/product');
        }
        
    },


}