import { configureStore } from '@reduxjs/toolkit'
import pizzaPropertiesSlice from './pizzaPropertiesSlice' 

export const store = configureStore({
  reducer: {
    pizzaProperties: pizzaPropertiesSlice
  },
})