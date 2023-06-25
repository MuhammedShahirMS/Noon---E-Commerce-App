import { createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";


const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: [],
        emailId : '',
        isAuthenticated : false
    },
    reducers: {
        toggleAuthStatus (state,action) {
            state.isAuthenticated = action.payload.isLoggedIn;
            if(action.payload.emailId){
                state.emailId = action.payload.emailId;
            }
        },

        setUserData (state, action) {
            state.userData = action.payload.userDoc;
            state.emailId  = action.payload.userEmailId; 
        }
    }  
})

export default userSlice;

export const userActions = userSlice.actions;