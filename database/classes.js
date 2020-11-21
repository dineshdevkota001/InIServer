class Objects{
    constructor(name=null, filename=null, userid=null){
        this.name = name;
        this.filename = filename;
        this.userid = userid;
        if(name === true||filename  === true|| userid  === true){
            this._id=true;
        }
    }
}

class User{
    constructor(username=null, email=null ){
        this.username = username;
        this.email = email;
        if(username  === true|| email  === true){
            this._id=true;
        }
    }
}

class Relation{
    constructor(imageid=null, meshid=null, userid=null){
        this.imageid = imageid;
        this.meshid = meshid;
        this.userid = userid;
        if(name === true||username  === true|| email  === true){
            this._id=true;
        }
    }
}

module.exports = {User, Objects, Relation}
