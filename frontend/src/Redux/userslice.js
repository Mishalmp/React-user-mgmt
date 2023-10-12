import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    userinfo : {},
   
}


const userslice = createSlice({
    name : "user",
    initialState,
    reducers : {

       
        setUserInfo : (state, action) =>{
            state.userinfo = action.payload.userinfo

        }
    }

})

export const { setUserInfo} = userslice.actions;
export default userslice.reducer;