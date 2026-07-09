const Plan = require("../models/Plan");

// Create Plan
exports.createPlan = async (req, res) => {

    try {

        const { mood, subject, studyTime, date } = req.body;
        const userId= req.user.id;


        const plan = await Plan.create({
            user: req.user.id,
            mood,
            subject,
            studyTime,
            date
        });

        res.status(201).json({
            success: true,
            message: "Plan created successfully",
            plan
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get All Plans
exports.getPlans = async (req, res) => {

    try {

        const plans = await Plan.find({
            user: req.user.id
        }).sort({
            createdAt: -1
        });

        res.status(200).json({
            success: true,
            plans
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Update Plan
exports.updatePlan = async (req, res) => {

    try {

        const plan = await Plan.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id
            },
            req.body,
            {
                new: true
            }
        );

        if (!plan) {
            return res.status(404).json({
                success: false,
                message: "Plan not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Plan updated successfully",
            plan
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Delete Plan
exports.deletePlan = async (req, res) => {

    try {

        const plan = await Plan.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        if (!plan) {
            return res.status(404).json({
                success: false,
                message: "Plan not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Plan deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};




