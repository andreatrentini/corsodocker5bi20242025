const config = require('./config');

function getFields(body, table) {
    const fields = Object.keys(body);
    console.log(fields);
    const corretti = fields.filter(field => config.tables[table].includes(field));
    console.log(corretti);
    const oggettoCorretto = corretti.reduce((obj, key) => {
        obj[key] = body[key];
        return obj;        
    }, {});
    console.log(oggettoCorretto);
}

module.exports = { getFields }