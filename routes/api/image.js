var express = require('express');
var router = express.Router();

router.get('/',(req,res)=>{
    return res.send('ola amiga')
})

router.get('/:id',(req,res)=>{
    return res.send(req.params.id)
})

router.post('/',(req,res)=>{
    console.log(req.body)
    res.send(req.body)
})

router.put('/:id',(req,res)=>{
    console.log(res.body)
    res.send('A put request')
})

router.delete('/:id', (req,res)=>{
    console.log(req.body)
    res.send('delete res')
})
module.exports = router;
