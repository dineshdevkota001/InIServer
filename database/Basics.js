const runQuery = require('./queryFunctions');

const IDTYPE = 'INT AUTO_INCREMENT PRIMARY KEY';
const STRING = 'VARCHAR(256)';
const INT = 'INT';
const TABLES = ['user', 'image', 'mesh', 'group']

// utility functions
// converts class variable and name to a sql query

let classToTable = (class_var, name) => {
    let sql_start = "CREATE TABLE ";
    let sql_query = sql_start + name + '('
    let database_elements = Object.keys(class_var);
    // taking values as types of data in the database
    let database_datatypes = Object.values(class_var);
    let table_description = [];
    // loop through the variable keys
    database_elements.forEach((element, index) => {
        table_description.push(element + ' ' + database_datatypes[index]);
    })
    sql_query += table_description.join() + ');';
    return sql_query;
}
// cleans null and undefined values in the Object
clean = (obj) => {
    try {
        for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined) {
                delete obj[propName];
            }
        }
    } catch (error) {
        console.log(error)
    }
    finally {
        if (obj) return obj
    }
}

// returns array from keys and values of object
getArray = (obj) => {
    try {
        keys = Object.keys(obj)
        values = Object.values(obj)
    }
    catch (error) {
        console.error(error)
    }
    finally {
        return { keys, values }
    }
}

// returns condition with elname=? and array as array
let getWhere = (obj, return_clean = true) => {
    let clean_obj = clean(obj);
    let { keys, values } = getArray(clean_obj);
    let condition = []
    keys.forEach((element, index) => {
        condition.push(element + '=?')
    })
    if (return_clean) {
        condition = condition.join();
    }
    return [condition, values]
}

// returns the query for making a table from the object
//this may not be necessary
makeTable = (class_var, name) => {
    // add a id datastype for the database to make
    class_var._id = IDTYPE;
    // get the query
    let query = classToTable(class_var, name)
    // return the query for use
    return query
}



// Basic CRUD functionalities are done from here

get = async (read, type, conditionObj = null ) => {
    let read_vals = Object.keys(clean(read));
    let reads = read_vals.join();
    type = type.toLowerCase();
    let query = 'SELECT ' + reads + " FROM " + type

    if (conditionObj === null || conditionObj === undefined) {
        query = query + ';'
        values = []
    }
    else {
        let [condition, values] = getWhere(conditionObj , false);
        condition = condition.join(' AND ')
        query = query + ' WHERE ' + condition + ';';
    }
    if (TABLES.includes(type)) {
        let res = await runQuery(query, values)
        return res
    }
    else {
        console.log('ERROR! check the type')
    }
}

post = async (type, conditionObj ) => {
    type = type.toLowerCase();
    let start = 'INSERT INTO '
    let query = ''
    try {
        if (TABLES.includes(type)) {
            query = start + type;
            let { keys, values } = getArray(conditionObj );
            names = keys.join();
            whats = '?,'.repeat(keys.length)
            whats = whats.slice(0, -1)
            // whats = whats.join();
            query += '(' + names + ') VALUES(' + whats + ');';
            res = await runQuery(query, values)
            console.log(res)
        }
        else {
            console.log('ERROR! check the type')
        }
    } catch (error) {
        console.error(error)
    }
}

put = async (update, type, conditionObj ) => {
    type = type.toLowerCase();
    if (TABLES.includes(type) && typeof (update) === typeof (conditionObj )) {

        var [condition1, values1] = getWhere(update)
        let set = ' SET ' + condition1

        let [condition2, values2] = getWhere(conditionObj )
        let where = " WHERE " + condition2 + ';'

        values = values1.concat(values2)
        query = "UPDATE " + type + set + where;
        let res = await runQuery(query,values)
        return res;
    }
    else {
        
        console.log('ERROR! check the type')
    }
}


drop = async (type, conditionObj ) => {
    type = type.toLowerCase();
    
    if (TABLES.includes(type)) {
        
        let [condition, values] = getWhere(conditionObj , false);
        condition = condition.join(' AND ')
        query = "DELETE FROM " + type + " WHERE " + condition + ';';
        console.log(query,values)
        let res = await runQuery(query, values)
        console.log(res)
    }
    else {
        console.log('ERROR! check the type')
    }
}

module.exports = { get, post, drop, put }
