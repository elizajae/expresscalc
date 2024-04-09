const express = require('express');

const app = express();

const getMean = (nums) => {
    let sum = 0;
    for (let num of nums) {
        sum += parseInt(num);
    }
    let mean = sum / nums.length;
    return mean;
}

const getMedian = (nums) => {
    let median = 0;
    if (nums.length % 2 === 0) {
        median = (parseInt(nums[nums.length / 2 - 1]) + parseInt(nums[nums.length / 2])) / 2;
    } else {
        median = parseInt(nums[Math.floor(nums.length / 2)]);
    }
    return median;
}

const getMode = (nums) => {
    let mode = {};
    for (let num of nums) {
        mode[num] = mode[num] + 1 || 1;
    }
    let max = 0;
    let modeNum;
    for (let num in mode) {
        if (mode[num] > max) {
            max = mode[num];
            modeNum = num;
        }
    }
    return modeNum;
}

function checkNums(nums) {
    for (let num of nums) {
        if (isNaN(num)) {
            return [false, num]
        }
    }
    return [true, null];
}

app.get('/', (req, res) => {
});

app.get('/mean', (req, res) => {
    let nums = req.query.nums.split(',');
    const numCheckRes = checkNums(nums);
    if (numCheckRes[0] === false || nums.length === 0) {
        return res.status(400).send(nums.length === 0 ? 'No numbers provided' : 'Invalid input' 
        + numCheckRes[1] + ' is not a number');
    }
    const mean = getMean(nums);
    res.json({
        operation: 'mean',
        value: mean
    });
});

app.get('/median', (req, res) => {
    let nums = req.query.nums.split(',');
    nums.sort((a, b) => a - b);
    const numCheckRes = checkNums(nums);
    if (numCheckRes[0] === false || nums.length === 0) {
        return res.status(400).send(nums.length === 0 ? 'No numbers provided' : 'Invalid input' 
        + numCheckRes[1] + ' is not a number');
    }
    const median = getMedian(nums);
    res.json({
        operation: 'median',
        value: median
    });
});

app.get('/mode', (req, res) => {
    let nums = req.query.nums.split(',');
    const numCheckRes = checkNums(nums);
    if (numCheckRes[0] === false || nums.length === 0) {
        return res.status(400).send(nums.length === 0 ? 'No numbers provided' : 'Invalid input' 
        + numCheckRes[1] + ' is not a number');
    }
    const modeNum = getMode(nums);
    res.json({
        operation: 'mode',
        value: modeNum
    });
});

app.listen(3000, () => {
console.log('Server running on port 3000');
});

module.exports = {
    getMean,
    getMedian,
    getMode
}