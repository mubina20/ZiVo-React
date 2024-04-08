import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import MemberPageReducer from './screens/MemberPage/slice';
import HomePageReducer from './screens/HomePage/slice';
import ChatPageReducer from './screens/ChatPage/slice';

export const store = configureStore({
  reducer: {
    homePage: HomePageReducer,
    memberPage: MemberPageReducer,
    chatPage: ChatPageReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
