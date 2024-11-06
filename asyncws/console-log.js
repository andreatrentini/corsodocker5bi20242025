function consoleLog(req, res, next) {
    const datetime = new Date(Date.now()).toLocaleString();
    console.log(datetime, req.method, req.url, 'from: ', req.ip );
    next();
}
module.exports = consoleLog;