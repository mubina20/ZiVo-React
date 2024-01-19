import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../types/screen";

const initialState: HomePageState = {
    recommendations: [],
    savedPosts: []
};

const HomePageSlice = createSlice({
    name: "homePage",
    initialState,
    reducers: {
        setrecommendations: (state, action) => {
            state.recommendations = action.payload;
        },
        setsavedPosts: (state, action) => {
            state.savedPosts = action.payload;
        }
    }
    });

export const {
    setrecommendations,
    setsavedPosts
} = HomePageSlice.actions;

const HomePageReducer = HomePageSlice.reducer;
export default HomePageReducer;