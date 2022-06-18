export const addUser = (userName, userId)=> async(dispatch)=>{

    dispatch({
        type:"AddUser",
        payload:{userName,userId}
    })
}