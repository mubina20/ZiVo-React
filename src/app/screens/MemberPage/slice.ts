import { createSlice } from "@reduxjs/toolkit";
import { MemberPageState } from "../../../types/screen";

const initialState: MemberPageState = {
    allMembers: [],
    savedPosts: [],
    likedPosts: [],
    chosenMember: null,
    memberFollowers: [],
    memberFollowings: []
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
        },
        setMemberFollowers: (state, action) => {
            state.memberFollowers = action.payload;
        },
        setMemberFollowings: (state, action) => {
            state.memberFollowings = action.payload;
        }
    }
    });

export const {
    setAllMembers,
    setsavedPosts,
    setChosenMember,
    setMemberFollowers,
    setMemberFollowings
} = MemberPageSlice.actions;

const MemberPageReducer = MemberPageSlice.reducer;
export default MemberPageReducer;