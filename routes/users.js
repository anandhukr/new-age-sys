var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const blogController = require('../controllers/blogController')
const categoryController = require('../controllers/categoryController')
const checkAuth = require('../middleware/check-auth')

router.get('/', function(req, res, next) {
    res.send('inside user route');
  });

router.post('/signup',userController.signup);

router.post('/login',userController.login);

router.post('/add-category',checkAuth.validateJwt, checkAuth.getRole,categoryController.addCategory);
router.get('/list-category',checkAuth.validateJwt,categoryController.listCategory);
router.post('/update-category',checkAuth.validateJwt, checkAuth.getRole,categoryController.updateCategory);
router.delete('/delete-category/:id',checkAuth.validateJwt, checkAuth.getRole,categoryController.deleteCategory);

router.post('/add-blog',checkAuth.validateJwt,blogController.addBlog);
router.get('/list-blog', checkAuth.validateJwt, checkAuth.getRole, blogController.listBlog);
router.post('/update-blog',checkAuth.validateJwt, checkAuth.getRole,blogController.updateBlog);
router.delete('/delete-blog/:id',checkAuth.validateJwt, checkAuth.getRole,blogController.updateBlogblogController.deleteBlog);

module.exports = router;