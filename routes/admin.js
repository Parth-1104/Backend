const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
/*
POST /admin/signup
  Description: Creates a new admin account.
  Input Body: { username: 'admin', password: 'pass' }
  Output: { message: 'Admin created successfully' }
- POST /admin/courses
  Description: Creates a new course.
  Input: Headers: { 'username': 'username', 'password': 'password' }, Body: { title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com' }
  Output: { message: 'Course created successfully', courseId: "new course id" }
- GET /admin/courses
  Description: Returns all the courses.
  Input: Headers: { 'username': 'username', 'password': 'password' }
  Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }
*/
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username=req.body.username;
    const password=req.body.password;
    Admin.create({
        username:username,
        password:password
    }).then(function(){
        res.json({
            message:"Admin created successfully"
        })
    })
    .catch(function()
    {
        res.json({
            message:"Error occured"
        })   
    })
});

router.post('/courses', adminMiddleware,async (req, res) => {
    // Implement course creation logic
    const title=req.body.title;
    const description=req.body.description;
    const price=req.body.price;
    const imageLink=req.body.imageLink;
    const newCourse=await Course.create({
        title,
        description,
        imageLink,
        price
    })

    res.json({
        message:"Couse created successfull",courseId:newCourse._id
    })
});

router.get('/courses',adminMiddleware ,async (req, res) => {
    // Implement fetching all courses logic
    const allCourse=await Course.find({
       
    })
    res.json({
        courses:allCourse
    })
});

module.exports = router;