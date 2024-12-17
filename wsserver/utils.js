const config = require('./config');

function correctInputData(body, table) {
/*     const fields = Object.keys(body);
    console.log(fields);
    const corretti = fields.filter(field => config.tables[table].includes(field));
    console.log(corretti);
    const oggettoCorretto = corretti.reduce((obj, key) => {
        obj[key] = body[key];
        return obj;        
    }, {});
    console.log(oggettoCorretto); */

    return Object.keys(body)
            .filter(field => config.tables[table].includes(field))
            .reduce((newBody, field) => {
                newBody[field] = body[field];
                return newBody
            }, {});

}

// Restituisce un array di elementi string dei nomi delle proprietà dell'oggetto body
function getFields(body) {
    return Object.keys(body);
}

// Restituisce un array di elementi con i valori delle proprietà dell'oggetto body
function getValues(body) {
    return Object.values(body);
}

// Genera una stringa con l'elenco dei campi per l'istruzione insert, es: (nome, cognome, indirizzo,...)
function setInsertFields(body) {
    return '(' + getFields(body).join(', ') + ')';
}

// Genera una stringa con un elenco di placeholders per l'istruzione insert, es. (?, ?, ?)
function setInsertPlaceholders(body) {
    return '(' + getFields(body).map(() => '?').join(', ') + ')';
}

function setUpdateFields(body) {
    return getFields.map(field => field + '= ?').join(', ');
}

module.exports = { correctInputData, getValues, setInsertFields, setInsertPlaceholders, setUpdateFields }