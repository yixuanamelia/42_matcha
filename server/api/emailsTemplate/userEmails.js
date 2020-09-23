
accountCreationToken = (token) => {
    let msg = `Hello ! \n  \
    \n Here is your token for the validation : \
    ${process.env.SERVER_URL}/users/validateaccount/${token} \
    \n MATCHA TEAM`

    return msg
}

resetPwdTemplate = (pwd) => {
    let msg = `Hello ! \n  \
    \n Here is your new password : \
    ${pwd} \
    \n Please remember to change it \
    \n MATCHA TEAM`

    return msg
}

module.exports = {
    accountCreationToken,
    resetPwdTemplate
}