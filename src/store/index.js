import { configureStore } from '@reduxjs/toolkit'

import repoSlice from './Repodetails';

const store=configureStore({
  reducer:{repo:repoSlice.reducer}
});
export const repoActions=repoSlice.actions;
export default store;