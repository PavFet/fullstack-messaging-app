const specialSymbols = "!@#$%^&*_+"

const passSymbols = (password) => {
    let hasUpperCase = false
    let hasSpecialSymbol = false
    for (let i = 0; i < password.length; i++) {
        if (!Number(password[i])) {
            if (password[i].toUpperCase() === password[i]) {
                hasUpperCase = true
            }
        }
        if (specialSymbols.indexOf(password[i]) !== -1) {
            hasSpecialSymbol = true
        }
    }

    if(!hasUpperCase) return "Password should have upper case letter"
    if(!hasSpecialSymbol) return `Password should contain special symbol ${specialSymbols}`
    return ""
}

module.exports = (req, res, next) => {
    let username = req.body.username
    let password

    if("passwordOne" in req.body) {
        password = req.body.passwordOne
    }
    if("password" in req.body) {
        password = req.body.password
    }


    if (username.length < 4 || username.length > 20) return res.send({
        success: false,
        message: "Username must have min 4 and max 20 symbols"
    })
    if (password.length < 4 || password.length > 20) return res.send({
        success: false,
        message: "Password must have min 4 and max 20 symbols"
    })

    const passHasError = passSymbols(password)

    if(passHasError) {

        return res.send({success: false, message: passHasError})
    } else {

        next()
    }

}