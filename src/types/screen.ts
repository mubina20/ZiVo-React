import { Member, Post } from "./user";

/*** REACT APP STATE ***/
export interface AppRootState {
    memberPage: MemberPageState;
};

/*** MEMBER PAGE ***/
export interface MemberPageState {
    allMembers: Member[];
    savedPosts: Post[];
    likedPosts: Post[]
    chosenMember: Member | null;
    myFollowers: any[];
};

/*** HOME PAGE ***/
export interface HomePageState {
    allPosts: Post[];
    allPhotoPosts: Post[];
    allVideoPosts: Post[];
    allArticlePosts: Post[];
    myFollowing: any[];
}

