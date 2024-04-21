import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../types/screen";


const initialState: HomePageState = {
    allPosts: [],
    allPhotoPosts: [],
    allVideoPosts: [],
    allArticlePosts: [],
    myFollowingsStory: [],
    myFollowings: [],
    chosenPost: null,
    chosenStory: null
};

const HomePageSlice = createSlice({
    name: 'homepage',
    initialState,
    reducers: {
        setAllPosts: (state, action) => {
            state.allPosts = action.payload
        },
        setAllPhotoPosts: (state, action) => {
            state.allPhotoPosts = action.payload
        },
        setAllVideoPosts: (state, action) => {
            state.allVideoPosts = action.payload
        },
        setAllArticlePosts: (state, action) => {
            state.allArticlePosts = action.payload
        },
        setMyFollowingsStory: (state, action) => {
            state.myFollowingsStory = action.payload
        },
        setMyFollowings: (state, action) => {
            state.myFollowings = action.payload
        },
        setChosenPost: (state, action) => {
            state.chosenPost = action.payload
        },
        setChosenStory: (state, action) => {
            state.chosenStory = action.payload
        }
    }
});

export const {
    setAllPosts,
    setAllPhotoPosts,
    setAllVideoPosts,
    setAllArticlePosts,
    setMyFollowingsStory,
    setMyFollowings,
    setChosenPost,
    setChosenStory
} = HomePageSlice.actions;

const HomePageReducer = HomePageSlice.reducer;
export default HomePageReducer;