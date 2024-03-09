import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import MemberPageReducer from './screens/MemberPage/slice';

export const store = configureStore({
  reducer: {
    memberPage: MemberPageReducer
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
