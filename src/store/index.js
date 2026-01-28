import { configureStore } from "@reduxjs/toolkit";
// Main Store when we can Store All Reducers From the App Here
// import monitorReducersEnhancer from './enhancers/monitorReducers'
// import loggerMiddleware from "./middleware/logger";
import rootReducer from "./rootReducer";
import { fetchDataListenerMiddleware } from "./asyncThunk/asyncThunk";

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware().concat(loggerMiddleware),
    preloadedState,
    // enhancers: [monitorReducersEnhancer],
    middleware: (getDefaultMiddleWares) => {
      return [
        ...getDefaultMiddleWares(),
        fetchDataListenerMiddleware.middleware,
      ];
    },
  });

  // if (process.env.NODE_ENV !== "production" && module.hot) {
  //   module.hot.accept("./rootReducer", () => store.replaceReducer(rootReducer));
  // }

  return store;
}
