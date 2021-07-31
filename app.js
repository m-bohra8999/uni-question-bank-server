const express     = require('express')
const mongoose    = require('mongoose')
const paperRouter = require('./routes/paper')
const branchRouter = require('./routes/branch')
const cors        = require('cors');
const app         = express();
const Paper = require('./models/paper')

app.use(express.json())
app.use('/papers', paperRouter)
app.use('/branches', branchRouter)
app.use('/uploads', express.static('uploads'));
app.use(cors());

const url = 'mongodb://localhost/paperDB'
mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection
con.on('open', () => {
    console.log('connected...')
})

// routes
app.post('/query', async(req,res,next) => {
    try{
        const branch = req.body.branchName;
        let bName;
        switch(branch) {
        case 'cse':
            bName = 'Computer Science and Engineering'
            break;
        case 'ec':
            bName = 'Electronics And Communication Engineering'
            break;
        }
        let a1;
        if(!req.body.session && !req.body.subject){
            a1 =  await Paper.find({
                branchName: bName
            })
        } else {
            a1 =  await Paper.findOne({
                branchName: bName,
                session: req.body.session,
                subject: req.body.subject
            })
        }
        res.json(a1);
    }catch(err){
        res.send('Error '+err)
    }
})


// const makeBranch = async () => {
//     const branch = await Subject.findOne({ name: 'Computer Science And Engineering' });
//     const subject = await Subject.findOne({ name: 'Computer Architecture' });
//     const yearSemCode = 11;
//     branch.yearWithSem[yearSemCode].push(subject);
//     await branch.save()
//     console.log(branch);
// }

// makeBranch();


app.listen(9000, () => {
    console.log('Server started')
})