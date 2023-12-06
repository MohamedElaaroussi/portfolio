// app/providers.ts
"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Provider } from 'react-redux';
import {NextUIProvider} from '@nextui-org/react'

import thunk from 'redux-thunk';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from "@/reducers/rootReducers";

const middleware = [...getDefaultMiddleware(), thunk];

const store = configureStore({
  reducer:rootReducer,
});

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
    <NextUIProvider>
      {children}
    </NextUIProvider>
    </Provider>
  )
}