let initState = {
    username: "",
    hobbies: []
}

let userReducer = ( state = initState, action ) => {
    //console.log(action.sername,action.auth);
    switch(action.type){
        case 'SET_NAME':
            state =  {
                ...state,
                username: action.username,
                auth:action.auth
            };
            break;
        default:
            break;        
    }
    return state;
}

export default userReducer;