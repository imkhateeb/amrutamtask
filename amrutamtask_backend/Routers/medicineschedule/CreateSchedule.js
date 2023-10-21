const express = require('express');
const router = express.Router();

const { verifyToken } = require('../../tokenSetup');
const MedicineIntakeSchedule = require('../../models/medicinetime');

router.post("/medicine-schedule", async (req, res) => {

   const {medicineNames, fequency, from, to, times, postedAt, email, contactNo, whatsAppNo, patient} = req.body;

   const authorizationHeader = req.headers.authorization;

   if (!authorizationHeader) {
      // No token provided in the headers
      return res.status(401).json({ success: false, message: "No token provided." });
   }

   // Verify and decode the token
   const decodedToken = verifyToken(authorizationHeader);

   if (!decodedToken) {
      // Invalid or expired token
      return res.status(401).json({ success: false, message: "Invalid token." });
   };

   try {
      const patientObj = {medicineNames, fequency, from, to, times, postedAt, email, contactNo, whatsAppNo, patient};

      const newPatient = new MedicineIntakeSchedule(patientObj);
      await newPatient.save();
   
      res.json({success: true})
   } catch (error) {
      res.json({success: false})
   }


});

module.exports = router;