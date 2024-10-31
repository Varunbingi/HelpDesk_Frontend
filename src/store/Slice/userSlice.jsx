import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
  isLoggedIn: false,
};


const loadUserFromLocalStorage = () => {
  const user = localStorage.getItem('userInfo');
  return user ? JSON.parse(user) : null;
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: loadUserFromLocalStorage(),
    isLoggedIn: !!loadUserFromLocalStorage(), 
  },
  reducers: {
    setUser(state, action) {
      state.userInfo = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem('userInfo', JSON.stringify(action.payload)); 
    },
    clearUser(state) {
      state.userInfo = null;
      state.isLoggedIn = false;
      localStorage.removeItem('userInfo'); 
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
