const express = require('express');
const router = express.Router();

const User = require('../../models/user');
const md5 = require('md5');

router.get("/auth-user", async (req, res) => {
   const {authId, password} = req.body;

   try {
      const myUser = await User.findOne({$and: [{$or: [{email: authId}, {contactNo: authId}]}, {password: md5(password)}]});

      if ( myUser ){
         res.json({success: true, userExists: true, authToken: myUser?._id})
      } else {
         res.json({success: true, userExists: false})
      }
   } catch (error) {
      res.json({success: false})
   }
})

module.exports = router;