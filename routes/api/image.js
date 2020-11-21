var express = require('express');
var router = express.Router();

const {getfromCondition, postResource , deleteResource} = require('../../database/databaseapi')
const Type = 'Image'
const type = Type.toLowerCase()


router.get('/',(req,res)=>{
    return false
})

router.get('/:name',(req,res)=>{
    try{
        getfromCondition(type,{name:req.params.name}).then(result=>{
            console.log(result[0])
            if (result[0]) filename = result[0].filename;
            else filename = 'default.jpg'
            return res.send(filename)
        })
    }
    catch(error){
        console.log(error)
    }
})

router.post('/post',(req,res)=>{
    let {body} = req
    const filename = Math.random().toString(36).substring(2,7);
    let topost = {name:body.name, filename: filename}
    postResource(type, topost).then(res=>{
        return res.send(result)
    })
})

router.put('/:id',(req,res)=>{
    console.log(res.body)
    res.send('A put request')
})

router.delete('/:id', (req,res)=>{
    let {id} = req.params
    deleteResource(type, id).then(
        result => {return res.send('Deleted this resource')}
    )
})
module.exports = router;
