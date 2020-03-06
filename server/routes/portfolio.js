const express = require('express');
const router = express.Router();
const { Portfolio } = require('../models/Portfolio');
const { auth } = require('../middleware/auth');

router.post('/', (req, res) => {
    Portfolio.findOne({ '_id' : req.body.portfolioId })
    .exec((err, portfolio) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({ success: true, portfolio });
    })
})

router.post('/all', (req, res) => {
    Portfolio.find({ 'student' : req.body.studentId })
    .exec((err, portfolio) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({ success: true, portfolio });
    })
})

router.post('/upload', (req, res) => {
    const portfolio = new Portfolio(req.body);    
    portfolio.save((err, portfolio) => {
        if(err) return res.status(400).send(err)
        res.status(200).json({ success: true, portfolio })
    })
})

module.exports = router;