const Lead = require("../models/Lead");
const User = require("../models/User");
const bcrypt = require("bcrypt");


// ============================
// Add Lead
// ============================
exports.addLead = async (req, res) => {

    try {

        const lead = await Lead.create(req.body);

        res.status(201).json({
            message: "Lead added successfully",
            lead
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// ============================
// Get All Leads
// ============================
exports.getLeads = async (req, res) => {

    try {

        const leads = await Lead.find();

        res.json(leads);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// ============================
// Convert Lead to Customer
// ============================
exports.convertLead = async (req, res) => {

    try {

        const lead = await Lead.findById(req.params.id);

        if (!lead) {

            return res.status(404).json({
                message: "Lead not found"
            });

        }


        const existingUser = await User.findOne({
            email: lead.email
        });


        if (existingUser) {

            return res.status(400).json({
                message: "Customer already exists"
            });

        }


        const hashedPassword = await bcrypt.hash("customer123", 10);


        const user = await User.create({

            name: lead.name,
            email: lead.email,
            password: hashedPassword,
            role: "employee",

            phone: lead.phone || "",
            source: lead.source || "",
            status: "Converted",
            notes: lead.notes || "",
            followUpDate: lead.followUpDate || null

        });


        await Lead.findByIdAndDelete(req.params.id);


        res.json({

            message: "Lead converted successfully",
            user

        });


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



// ============================
// Delete Lead
// ============================
exports.deleteLead = async (req, res) => {

    try {

        const lead = await Lead.findByIdAndDelete(req.params.id);


        if (!lead) {

            return res.status(404).json({
                message: "Lead not found"
            });

        }


        res.json({

            message: "Lead deleted successfully"

        });


    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};