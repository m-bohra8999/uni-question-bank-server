const express = require('express')
const router  = express.Router()
const Branch  = require('../models/branch')
const Subject = require('../models/subject')

router.get('/:branch/:yearWithSem', async(req,res) => {
  try{
    console.log(req.params)
    const yearWithSem = req.params.yearWithSem;
    const branch = req.params.branch;
    let bName;
    switch(branch) {
      case 'cse':
        bName = 'Computer Science And Engineering'
        break;
      case 'ec':
        bName = 'Electronics And Communication Engineering'
        break;
    }
    const branches = await Branch.findOne({name: bName}).populate('Subject');
    const data = branches.yearWithSem[yearWithSem]
    const fData = await Subject.find({ _id : { $in : data } });
    res.json(fData);
  }catch(err){
    res.send('Error ' + err)
  }
})

router.get('/', async(req,res) => {
    try{
        const branches = await Branch.find();
        res.json(branches)
    }catch(err){
        res.send('Error ' + err)
    }
})



module.exports = router
