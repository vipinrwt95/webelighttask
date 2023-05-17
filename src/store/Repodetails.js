import { createSlice } from "@reduxjs/toolkit";

const initialAuthState={repos:[],commits:[]}
const repoSlice=createSlice(
    {
       name:'repos',
       initialState:initialAuthState,
       reducers:{
          addrepo(state,action)
          {
           state.repos=[...state.repos,...action.payload];
        },
        emptyrepo(state)
        {
          state.repos=[];
        },
        addcurrentrepo(state,action)
        {
            state.commits=action.payload
        }
      }
    }
 )
 export default repoSlice;