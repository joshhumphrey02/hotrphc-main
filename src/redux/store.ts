import { configureStore } from '@reduxjs/toolkit';
import Member from '../reducers/Member';

export const makeStore = () => {
	return configureStore({
		reducer: {
			Member,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: false, // Disable serializable check
			}),
	});
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppStore = ReturnType<typeof makeStore>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
