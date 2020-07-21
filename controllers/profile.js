const handleProfile = (req, res, db) => {
    let { id } = req.params;
    db.select('*').from('users')
        .where({id})
        .then(user => {
            if (user.length>0) {
                res.json(user[0]);
            } else { 
                throw err;
            }
        })
        .catch(err => res.status(404).json("No such user"));
}

module.exports = {
    handleProfile: handleProfile
}