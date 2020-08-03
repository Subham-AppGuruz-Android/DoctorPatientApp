/*
 * @file: store.js
 * @description: Configure/creating redux store with thunk,reducer etc
 * @date: 11.03.2020
 * @author: Dalbeer Sandhu
 * */

import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import reducers from "./rootReducer";
import AsyncStorage from "@react-native-community/async-storage";

const authConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth"],
};

const reducer = persistReducer(authConfig, reducers);

const store = createStore(reducer);

const persistor = persistStore(store);

export { store as default, persistor };
