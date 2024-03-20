import { createSlice } from "@reduxjs/toolkit";
import { MemberPageState } from "../../../types/screen";

const initialState: MemberPageState = {
    allMembers: [],
    savedPosts: [],
    likedPosts: [],
    chosenMember: null,
    myFollowers: []
};

const MemberPageSlice = createSlice({
    name: "memberpage",
    initialState,
    reducers: {
        setAllMembers: (state, action) => {
            state.allMembers = action.payload;
        },
        setsavedPosts: (state, action) => {
            state.savedPosts = action.payload;
        },
        setChosenMember: (state, action) => {
            state.chosenMember = action.payload;
        }
    }
    });

export const {
    setAllMembers,
    setsavedPosts,
    setChosenMember
} = MemberPageSlice.actions;

const MemberPageReducer = MemberPageSlice.reducer;
export default MemberPageReducer;