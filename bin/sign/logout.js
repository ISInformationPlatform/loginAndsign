module.exports = logout;
function logout(req){
    req.session.ID = undefined;
}