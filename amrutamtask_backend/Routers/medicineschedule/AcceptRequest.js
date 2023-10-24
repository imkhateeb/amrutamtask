const express = require('express');
const router = express.Router();

const {verifyToken} = require('../../tokenSetup');
const User = require('../../models/user');
const MedicineSchedule = require('../../models/medicine');

router.get('/accept-medicine-schedule', async (req, res) => {

   const token = req.headers['token'];
   const requestId = req.headers['requestid'];

   try {

      const decoded = verifyToken(token);
      const userId = decoded.slice(1, decoded.length-1);

      const myUser = await User.findOne({_id: userId});
      
      if ( myUser?.role == 'caretaker' ){
         const mySchedule = await MedicineSchedule.findOne({_id: requestId});

         if ( mySchedule ){
            mySchedule.caretaker = {
               name: myUser.name,
               userId,
            }
            mySchedule.courseStatus = 'running';
            await mySchedule.save();
            console.log("Accepted");
            return res.json({success: true, message: 'You accepted the schedule'})
         }
      }
      
      return res.json({success: false, message: 'Mismatch in Caretaeker or the schedule'})

   } catch (error) {
      res.json({success: false, message: 'Internal server error'})
   }
});

module.exports = router;