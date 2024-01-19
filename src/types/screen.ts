import { Member } from "./user";

/*** REACT APP STATE ***/
export interface AppRootState {
    homePage: HomePageState;
};

/*** HOMEPAGE ***/
export interface HomePageState {
    recommendations: Member[];
    savedPosts: Member[];

};