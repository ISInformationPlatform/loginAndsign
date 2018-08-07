module.exports = isSignIn;
function isSignIn(req)
{
    if(req.session.ID != null)
    return true;
    else
    return false;
}