const jwt = require("jsonwebtoken");


const auth = (req, res, next) => {

    const token = req.headers.authorization?.split(" ")[1];


    if (!token) {
        return res.status(401).json({
            message: "No token, authorization denied"
        });
    }


    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );


        req.user = decoded;


        next();


    } catch (error) {

        return res.status(401).json({
            message: "Invalid token"
        });

    }

};



const adminOnly = (req, res, next) => {


    if (!req.user) {
        return res.status(401).json({
            message: "User not authenticated"
        });
    }


    if (req.user.role !== "admin") {

        return res.status(403).json({
            message: "Only admin can perform this action"
        });

    }


    next();

};



module.exports = {
    auth,
    adminOnly
};