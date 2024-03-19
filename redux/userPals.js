import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { supabase } from '../utils/supabase'

export const userPalsApi = createApi({
  reducerPath: 'userPals',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['UserPals'],
  endpoints: (builder) => ({
    getUserPals: builder.query({
      queryFn: async (user_id) => {
        const { data, error } = await supabase
          .from('User_Pals')
          .select('id, Users (email)')
          .eq('user_id', user_id)
        console.log(user_id, data, error)
        if (error) {
          return { error }
        }
        return { data }
      },
      providesTags: ['UserPals'],
    }),
    addUserPal: builder.mutation({
      queryFn: async ({ email, user_id }) => {
        //get pals userid via email
        const { data: palData, error: palError } = await supabase
            .from('Users')
            .select()
            .eq('email', email)
            .single()
        if (palError) {
            return { palError }
        }
        const pal = {
            user_id: user_id,
            pal_user_id: palData.id
        }
        //add pal to user_pals
        const { data, error } = await supabase
          .from('User_Pals')
          .insert(pal)
        if (error) {
          return { error }
        }
        return { data }
      },
      providesTags: ['UserPals'],
    })
  }),
})

export const { useGetUserPalsQuery, useAddUserPalMutation } = userPalsApi