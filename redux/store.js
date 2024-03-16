import { configureStore } from '@reduxjs/toolkit'
import { pizzaPropertiesApi } from './pizzaProperties' 
import { userRatingsApi } from './userRatings' 
import { userApi } from './user' 

export const store = configureStore({
  reducer: {
    [pizzaPropertiesApi.reducerPath]: pizzaPropertiesApi.reducer,
    [userRatingsApi.reducerPath]: userRatingsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(pizzaPropertiesApi.middleware)
      .concat(userRatingsApi.middleware)
      .concat(userApi.middleware)
  })