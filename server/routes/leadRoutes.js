const express = require("express");

const router = express.Router();

const {
    addLead,
    getLeads,
    convertLead,
    deleteLead
} = require("../controllers/leadController");


// Add Lead
router.post("/add", addLead);

// Get All Leads
router.get("/", getLeads);

// Convert Lead
router.post("/convert/:id", convertLead);

// Delete Lead
router.delete("/:id", deleteLead);


module.exports = router;