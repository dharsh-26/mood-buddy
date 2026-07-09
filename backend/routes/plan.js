


const express = require("express");
const router = express.Router();


const {
    createPlan,
    getPlans,
    updatePlan,
    deletePlan
} = require("../controllers/planController");

const auth = require("../middleware/auth");


// Create a new study plan
router.post("/",auth ,createPlan);

// Get all study plans
router.get("/",auth, getPlans);

// Update a study plan
router.put("/:id", auth, updatePlan);

// Delete a study plan
router.delete("/:id",auth, deletePlan);

module.exports = router;