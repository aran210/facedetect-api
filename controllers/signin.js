const handleSignIn = (db, bcrypt) => (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json("incorrect form submission")
    }
    db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
        // const isValid = bcrypt.compareSync(password, data[0].hash);
        const isValid = data[0].hash === password;
        console.log("1", isValid);
        if (isValid) {
            return db.select('*').from('users')
            .where('email', '=', email)
            .then(user => { 
                res.json(user[0]);
            })
            .catch(err => res.status(400).json('unable to get user'))
        } else {
            console.log("2", user[0]);
            res.status(400).json('incorrect credentials');
        }
        
    }).catch(err => res.status(400).json('incorrect credentials'))
}

module.exports = {
    handleSignIn: handleSignIn
}