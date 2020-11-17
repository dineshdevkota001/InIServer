const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'dinesh',
    password: 'hsenid',
    connectionLimit: 5,
    database: "viewer",
    multipleStatements: true
});

async function runQuery(query,params){
    let conn;
    try{
        conn = await pool.getConnection();
        console.log('Connected!')
        var res = await conn.query(query,params);
    }catch(err){
        console.log(err)
    }finally {
        if (conn) conn.end()
        return res
    }
}

module.exports = runQuery