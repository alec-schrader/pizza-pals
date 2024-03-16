import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { supabase } from '../utils/supabase'

export const userApi = createApi({
  reducerPath: 'user',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getUser: builder.query({
      queryFn: async () => {
        const { data, error } = await supabase.auth.getSession();
        const user = data.session.user

        if (error) {
          return { error }
        }
        return { data:user }
      },
    }),
  }),
})

export const { useGetUserQuery } = userApi