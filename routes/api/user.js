var express = require('express');
var router = express.Router();
const {addUser} = require('../../database/databaseapi')
router.get('/',(req,res)=>{
    return res.send('ola amiga')
})

router.get('/:username',(req,res)=>{
    return res.send(req.params.username)
})

router.post('/signup',(req,res)=>{
    let {body} = req
    let signupdetails = {username: body.username,email: body.email}
    let returnobj = addUser(signupdetails)
    res.send(returnobj)
})
module.exports = router;
