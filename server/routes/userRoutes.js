const express = require("express");
const router = express.Router();
const {auth, adminOnly} = require("../middleware/authMiddleware");

const {
    register,
    login,
    getUsers,
    addUser,
    updateUser,
    deleteUser,
    getStats,
     getUserGrowth
    
} = require("../controllers/userController");


router.post("/register", register);

router.post("/login", login);

router.get("/", getUsers);

router.post("/add", addUser);

router.put("/:id", updateUser);

router.delete("/:id", auth, adminOnly, deleteUser);
router.get("/stats", getStats);
router.get("/growth", getUserGrowth);
router.get("/test", (req,res)=>{
    res.json({
        message:"Route working"
    });
});




module.exports = router;