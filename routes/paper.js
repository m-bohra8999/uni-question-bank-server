const express = require('express')
const router = express.Router()
const Paper = require('../models/paper')
const upload = require('../middleware/upload')
const fs = require('fs')



router.get('/', async(req,res) => {
    try{
        const papers = await Paper.find()
        res.json(papers)
    }catch(err){
        res.send('Error ' + err)
    }
})

router.get('/:id', async(req,res) => {
    try{
        const paper = await Paper.findById(req.params.id)
        res.json(paper)
    }catch(err){
        res.send('Error ' + err)
    }
})


router.post('/', upload.single('pdf') ,async(req,res,next) => {
    let bName = req.body.branchName;
    if(bName === 'cse'){
        bName = 'Computer Science and Engineering';
    } else if(bName === 'ec') {
        bName = 'Electronics and Communication Engineering';
    }
    const paper = new Paper({
      branchName: bName,
      session: req.body.session,
      subject: req.body.subject,
      yearWithSem: req.body.yearWithSem
    })

    try{
        if(req.file) {
            paper.pdf = req.file.path
        }
        const a1 =  await paper.save()
        res.json({
            message: "success"
        })
    }catch(err){
        res.send('Error '+err)
    }
})

router.patch('/:id',async(req,res)=> {
    try{
        let bName = req.body.branchName;
        if(bName === 'cse'){
            bName = 'Computer Science and Engineering';
        } else if(bName === 'ec') {
            bName = 'Electronics and Communication Engineering';
        }
        else {
            bName = req.body.branchName;
        }
        const paper = await Paper.findById(req.params.id) 
        paper.branchName = bName
        paper.session = req.body.session
        paper.subject = req.body.subject
        paper.yearWithSem = req.body.yearWithSem
        const a1 = await paper.save()
        res.json(a1)   
    }catch(err){
        res.send('Error')
    }

})

router.delete('/:id',async(req,res)=> {
    try{
        const paper = await Paper.findById(req.params.id) 
        
        const path = paper.pdf;
        fs.unlink(path, (err) => {
            if (err) {
                console.error(err)
                return
            }
        })

        const a1 = await paper.remove()
        res.json({
            message: "success"
        }) 
    }catch(err){
        res.send(err)
    }

})

module.exports = router