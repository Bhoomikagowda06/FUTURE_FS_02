const User = require("../models/User");
const Activity = require("../models/Activity");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// Register User
const register = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "Register successful",
            user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};



// Login User
const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const match = await bcrypt.compare(
            password,
            user.password
        );


        if (!match) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }


        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn:"1d" }
        );


        res.json({
            message:"Login successful",
            token,
            user
        });


    } catch(error) {

        res.status(500).json({
            message:error.message
        });

    }
};




// Get All Users
const getUsers = async (req,res)=>{

    try {

        const users = await User.find()
        .select("-password");

        res.json(users);


    } catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};




// Add Customer
const addUser = async (req, res) => {
    try {
        const { name, email } = req.body;

        const hashedPassword = await bcrypt.hash("customer123", 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // ✅ Save activity
        await Activity.create({
            message: `New customer added: ${user.name}`
        });

        res.status(201).json({
            message: "Customer added successfully",
            user
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
// Update User
const updateUser = async(req,res)=>{

    try {

        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );


        if(!user){

            return res.status(404).json({
                message:"User not found"
            });

        }
await Activity.create({
    message: `Customer updated: ${user.name}`
});

        res.json(user);


    } catch(error){

        res.status(400).json({
            message:error.message
        });

    }

};




// Delete User
const deleteUser = async(req,res)=>{

    try {

        const user = await User.findByIdAndDelete(
            req.params.id
        );


        if(!user){

            return res.status(404).json({
                message:"User not found"
            });

        
        }
await Activity.create({
    message: `Customer deleted: ${user.name}`
});

        res.json({
            message:"User deleted successfully"
        });


    } catch(error){

        res.status(400).json({
            message:error.message
        });

    }

};
// Customer Statistics

const getStats = async(req,res)=>{

    try{

        const users = await User.find();


        const stats = [
            {
                month:"Jan",
                customers: users.length > 0 ? users.length : 0
            },
            {
                month:"Feb",
                customers: users.length > 1 ? users.length : 0
            },
            {
                month:"Mar",
                customers: users.length > 2 ? users.length : 0
            },
            {
                month:"Apr",
                customers: users.length > 3 ? users.length : 0
            },
            {
                month:"May",
                customers: users.length > 4 ? users.length : 0
            }
        ];


        res.json(stats);


    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};
const getUserGrowth = async(req,res)=>{

try{

const users = await User.find();

const months = [
"Jan","Feb","Mar","Apr",
"May","Jun","Jul","Aug",
"Sep","Oct","Nov","Dec"
];


const growth = months.map((month,index)=>{

const count = users.filter((user)=>{

if(!user.createdAt) return false;

const date = new Date(user.createdAt);

return date.getMonth() === index;

}).length;


return {
month,
users:count
};

});


res.json(growth);


}
catch(error){

res.status(500).json({
message:error.message
});

}

};
module.exports = {
    register,
    login,
    getUsers,
    addUser,
    updateUser,
    deleteUser,
    getStats,
    
    getUserGrowth
};
