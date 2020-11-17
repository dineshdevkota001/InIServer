const {User, Objects, Relation} = require('./classes');
// const runQuery = require('./queryFunctions');
const LLD = require('./Basics')

isUserValid = async(username) =>{
    let user1 = new User(true)
    let user2 = new User(null, username)
    res = await LLD.read(user1,'user',user2)
    if (res.length == 1){
        return true
    }
    else{
        return false
    }
}
getuserid = async(username) =>{
    let user1 = new User()
    user1._id=true
    let user2 = new User(null, username)
    let res = await LLD.read(user1,'user',user2)
    if (res){
        return res[0]._id 
    }
}
addUser = async(signupdetails) =>{
    type = 'user';
    postObject = new User(signupdetails.username, signupdetails.email);
    await LLD.post(type, postObject);
    postObject._id = await getuserid(signupdetails.username)
    return postObject;
}


getResource = async(type,userid = null) =>{
    let toread = new Objects(true, true,true)
    let condition = null
    if (userid){
    condition = new Objects();
    condition.userid=userid
    }
    let returnObj = await LLD.get(toread, type, condition)
    return returnObj;
}

getfromid = (type,id) =>{
    let toread = new Objects(true, true, true)
    let condition = new Objects();
    condition._id= id
    const returnObj = LLD.get(toread, type, condition)
    return returnObj;
}

postResource = async(type, object) =>{
    // Basic condition checks here
    let postObject = new Objects(object.name, object.filename, object.userid)
    const returnObj = await LLD.post(type, postObject)
    return returnObj;
}

putResource = async(toput, type, objectid) =>{
    // Basic condition checks here
    let putObject = new Objects(toput.name, toput.filename, toput.userid)
    let checkObject = new Objects()
    checkObject._id = objectid
    await LLD.put(putObject, type, checkObject)
    const returnObj = getfromid(type, objectid) 
    return returnObj;
}
deleteResource = async(type, objectid) =>{
    // Basic condition checks here
    let condition = new Objects();
    condition._id = objectid;
    const returnObj = await LLD.drop(type, condition)
    return returnObj;
}

x = async() =>{
    // let obj = new Objects('name of file','location of file', 19)
    // returnval2 = deleteResource('image', 10)
    const returnval = await getResource('image')
    console.log(returnval)
}

x()
module.exports = {isUserValid, addUser, getResource, getfromid, postResource, putResource, deleteResource}