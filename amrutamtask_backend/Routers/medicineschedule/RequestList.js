const express = require('express');
const router = express.Router();

const MedicineIntakeSchedule = require('../../models/medicine');

const url2 = 'http://localhost:5000/api/caretaker-request-list';
router.get("/caretaker-request-list", async (req, res)=>{
        try {

                const requestlist = await MedicineIntakeSchedule.find();

                res.json({success: true, requestlist})
                
        } catch (error) {
                res.json({success: false})
                
        }
})

module.exports = router;