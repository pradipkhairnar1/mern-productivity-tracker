const express = require("express");
const router = express.Router();
const TimeLog = require("../models/TimeLog");

// SAVE time data
router.post("/save", async (req, res) => {

    try {

        const logs = req.body.logs;

        await TimeLog.insertMany(logs);

        res.json({ message: "Data saved successfully" });

    } catch (error) {

        res.status(500).json({ error: error.message });
    }
});


// GET all logs
router.get("/", async (req, res) => {

    const data = await TimeLog.find();

    res.json(data);
});

module.exports = router;

// DAILY REPORT
router.get("/report", async (req, res) => {

    const today = new Date();

    today.setHours(0,0,0,0);

    const data = await TimeLog.find({
        date: { $gte: today }
    });

    let totalTime = 0;

    data.forEach(item => {
        totalTime += item.timeSpent;
    });

    res.json({
        sitesVisited: data.length,
        totalTimeSeconds: (totalTime/1000).toFixed(0)
    });

});
