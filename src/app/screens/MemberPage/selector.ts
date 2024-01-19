import { createSelector } from "reselect";
import { AppRootState } from "../../../types/screen";

const selectHomePage = (state: AppRootState) => state.homePage;

export const retrieveRecommendations = createSelector(
    selectHomePage,
    (HomePage) => HomePage.recommendations
);

export const retrieveSavedPosts = createSelector(
    selectHomePage,
    (HomePage) => HomePage.savedPosts
);