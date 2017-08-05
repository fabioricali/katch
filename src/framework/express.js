/**
 * Catch error middleware
 * @param err {Error}
 * @param req {Object}
 * @param res {Object}
 * @param next {Function)
 */
module.exports = (err, req, res, next) => {
    setImmediate(()=> {
       throw err;
    });
    next();
};