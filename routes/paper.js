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
    console.log('reqBody: ', req.body)
    const paper = new Paper({
      branchName: req.body.branchName,
      session: req.body.session,
      subject: req.body.subject,
      yearWithSem: req.body.yearWithSem
    })

    try{
        if(req.file) {
            console.log('file: ', req.file);
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
        const paper = await Paper.findById(req.params.id) 
        paper.branchName = req.body.branchName
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
        //file removed
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