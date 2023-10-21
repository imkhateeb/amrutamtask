const express = require('express');
const router = express.Router();

router.get('/get/medicine-schedules', (req, res)=>{
        const {authToken} = req.body;
})