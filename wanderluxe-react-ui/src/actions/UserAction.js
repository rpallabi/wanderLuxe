let userObj = {};



userObj.setForm = (username,auth) => {
    return {
        type: 'SET_FORM',
        username: username,
        auth:auth
    }
};

export default userObj;