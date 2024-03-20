import { createSelector } from "reselect";
import { AppRootState } from "../../../types/screen";

const selectMemberPage = (state: AppRootState) => state.memberPage;

export const retrieveMembers = createSelector(
    selectMemberPage,
    (memberPage) => memberPage.allMembers
);
export const retrieveChosenMember = createSelector(
    selectMemberPage,
    (memberPage) => memberPage.chosenMember
);
