var express = require('express');
var router = express.Router();
const {addUser, isUserValid} = require('../../database/databaseapi')
router.get('/',(req,res)=>{
    return false
})

router.get('/:username',async (req,res)=>{
    let {username} = req.params
    isUserValid(username).then(isValid => {
        return res.send(isValid)})
})

router.post('/signup',(req,res)=>{
    let {body} = req
    let signupdetails = {username: body.username,email: body.email}
    addUser(signupdetails).then(returnobj =>{return res.send(returnobj)}
    )
    
})
module.exports = router;
