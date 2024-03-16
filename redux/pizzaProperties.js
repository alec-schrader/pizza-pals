import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { supabase } from '../utils/supabase'

export const pizzaPropertiesApi = createApi({
  reducerPath: 'pizzaProperties',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getPizzaProperties: builder.query({
      queryFn: async () => {
        const { data, error } = await supabase
          .from('Pizza_Properties')
          .select()
        if (error) {
          return { error }
        }
        return { data }
      },
    }),
  }),
})

export const { useGetPizzaPropertiesQuery } = pizzaPropertiesApi