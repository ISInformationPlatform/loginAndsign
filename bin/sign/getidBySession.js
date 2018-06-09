module.exports = getidBySession;
function getidBySession(req){
    if(req.session.ID != undefined)
        return req.session.ID;
    else
        return null;
}
