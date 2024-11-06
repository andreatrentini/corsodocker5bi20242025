const config = require('./config');

function getFields(body, table) {    
    return Object.keys(body)
            .filter(key => config.tableFields[table].includes(key))
            .reduce((obj, key) => {
                obj[key] = body[key];
                return obj;
            }, {});
}

function getInsertFields(fields) {    
    return  '(' + getColumns(fields).join(', ') + ')';
}

function getValues(fields) {
    return Object.values(fields);
}

function getColumns(fields) {
    return Object.keys(fields); 
}

function getInsertPlaceholders(fields) {    
    const placeholders = getColumns(fields).map(() => '?').join(', ');
    return '(' + placeholders + ')';
}

function getUpdateFields(fields) {   
    const set = getColumns(fields).map(field => field + ' = ?').join(', ');
    return set;
}

module.exports = { getFields, getInsertFields, getValues, getColumns, getInsertPlaceholders, getUpdateFields }
