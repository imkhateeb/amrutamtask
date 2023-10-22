const express = require('express');
const router = express.Router();
const { verifyToken } = require('../tokenSetup');

const User = require('../models/user');


router.get("/get-user", async (req, res) => {
   const token = req.headers.authorization;

   if (!token) {
      return res.status(401).json({ success: false, message: 'Authorization header is missing' });
   }

   const parts = token.split(' ');
   const decoded = verifyToken(parts[1]);
   const sliced = decoded.slice(1, decoded.length-1);
   try {
      const myUser = await User.findOne({ _id: sliced });
      if (myUser) {
         res.json({ success: true, user: myUser });
      } else {
         res.status(404).json({ success: false, message: 'User not found' });
      }
   } catch (error) {
      console.error("Error in get-user route:", error);
      res.status(500).json({ success: false, message: 'Internal server error' });
   }

});

module.exports = router;