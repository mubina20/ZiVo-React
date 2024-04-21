import { createSelector } from "@reduxjs/toolkit";
import { AppRootState } from "../../../types/screen";

const selectHomePage = (state: AppRootState) => state.homePage;

export const retrieveAllPosts = createSelector(
    selectHomePage,
    (HomePage) => HomePage.allPosts
);
export const retrieveAllPhotoPosts = createSelector(
    selectHomePage,
    (HomePage) => HomePage.allPhotoPosts
);
export const retrieveAllVideoPosts = createSelector(
    selectHomePage,
    (HomePage) => HomePage.allVideoPosts
);
export const retrieveAllArticlePosts = createSelector(
    selectHomePage,
    (HomePage) => HomePage.allArticlePosts
);
export const retrieveMyFollowingsStory = createSelector(
    selectHomePage,
    (HomePage) => HomePage.myFollowingsStory
);
export const retrieveMyFollowings = createSelector(
    selectHomePage,
    (HomePage) => HomePage.myFollowings
);
export const retrieveChosenPost = createSelector(
    selectHomePage,
    (HomePage) => HomePage.chosenPost
);
export const retrieveChosenStory = createSelector(
    selectHomePage,
    (HomePage) => HomePage.chosenStory
);