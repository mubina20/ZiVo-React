import { Follower, Following } from "./follow";
import { Post } from "./post";
import { Member } from "./user";

/*** REACT APP STATE ***/
export interface AppRootState {
    homePage: HomePageState;
    memberPage: MemberPageState;
};

/*** MEMBER PAGE ***/
export interface MemberPageState {
    allMembers: Member[];
    savedPosts: Post[];
    likedPosts: Post[];
    chosenMember: Member | null;
    memberFollowers: Follower[];
    memberFollowings: Following[];
};

/*** HOME PAGE ***/
export interface HomePageState {
    allPosts: Post[];
    allPhotoPosts: Post[];
    allVideoPosts: Post[];
    allArticlePosts: Post[];
    myFollowingsStory: Post[];
    myFollowings: any[];
}

