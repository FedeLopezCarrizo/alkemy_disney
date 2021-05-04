module.exports = function(req, res, next){

    if (req.cookies.recordame != undefined) {
        req.session.usuario = req.cookies.recordame;
    }

    next();
}