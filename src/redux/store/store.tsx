import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import signupFormReducer from "../reducers/signupReducer";
import loginFormReducer from "../reducers/loginReducers";
import allBlogDetailsReducer from "../reducers/allBlogDetails";
const persistConfig = {
    key: "signinData",
    storage: storage,
    blacklist: ['register',"newBlogData",],
  };
  const rootReducer = combineReducers({
    allBlogDetails:allBlogDetailsReducer,
    loginForm:loginFormReducer,
    signupForm: signupFormReducer,
  });
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  const store = configureStore({ reducer: persistedReducer });
  export const persistor = persistStore(store);
  
  export default store;