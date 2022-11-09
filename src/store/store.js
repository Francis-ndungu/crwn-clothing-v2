import { compose, applyMiddleware, legacy_createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
// import thunk from "redux-thunk";
import createSagaMiddleware from "@redux-saga/core"; // saga replaces redux-thunk
import { rootSaga } from "./root-saga";
import { rootReducer } from "./root-reducer";
// import { loggerMiddleware } from "./cart/middleware/logger";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
  whitelist: ["categories", "cart"],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWare = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleware,
].filter(Boolean); // you can pass the loggerMiddleware

const composedEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composedEnhancer(applyMiddleware(...middleWare));

export const store = legacy_createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
