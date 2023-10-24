const express = require('express');
const router = express.Router();

const { verifyToken } = require('../../tokenSetup');
const MedicineIntakeSchedule = require('../../models/medicine');
const User = require('../../models/user');

router.post("/medicine-schedule", async (req, res) => {

   const {medicineNames, frequency, from, to, times, email, contactNo, careBy} = req.body;

   // console.log(req.body);

   const authorizationHeader = req.headers.authorization;

   if (!authorizationHeader) {
      // No token provided in the headers
      return res.status(401).json({ success: false, message: "No token provided." });
   }

   // Verify and decode the token
   const parts = authorizationHeader.split(' ');
   const decoded = verifyToken(parts[1]);
   const sliced = decoded.slice(1, decoded.length-1);

   const scheduleReminders = require('../../scheduler');

   if (!sliced) {
      // Invalid or expired token
      return res.status(401).json({ success: false, message: "Invalid token." });
   };

   const myUser = await User.findOne({_id: sliced});

   if ( !myUser ){
      return res.status(401).json({ success: false, message: "Not a trusted user." });
   }

   try {
      const patient = {
         name: myUser?.name,
         userId: myUser?._id,
      }

      const patientObj = {medicineNames, frequency, from, to, times, email, contactNo, whatsAppNo: contactNo, patient, careBy, courseStatus: careBy == 'self' ? "running" : "Not Started"};
      const newPatient = new MedicineIntakeSchedule(patientObj);
      await newPatient.save();
      
      scheduleReminders({medicineNames, frequency, from, to, times, email, contactNo, whatsAppNo: contactNo, scheduleId: newPatient?._id});

   
      res.json({success: true})
   } catch (error) {
      res.json({success: false, message: 'Internal server error'})
   }
});

module.exports = router;