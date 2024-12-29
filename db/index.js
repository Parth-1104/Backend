const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://singhparth427:parth427@cluster0.632ns.mongodb.net/couse_Selling_app');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username:String,
    password:String
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username:String,
    password:String,
    purchasedCourses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }
    ]

});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    
    title:String,
    description:String,
    price:Number,
    imageLink:String

});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}