import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { supabase } from '../utils/supabase'

export const userRatingsApi = createApi({
  reducerPath: 'userRatings',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['UserRatings'],
  endpoints: (builder) => ({
    getUserRatings: builder.query({
      queryFn: async (user_id) => {
        const { data, error } = await supabase
          .from('User_Ratings')
          .select()
          .eq('user_id', user_id)
        if (error) {
          return { error }
        }
        return { data }
      },
      providesTags: ['UserRatings'],
    }),
    getUserRatingByPropertyID: builder.query({
      queryFn: async ({ pizza_property_id, user_id }) => {
        const { data, error } = await supabase
          .from('User_Ratings')
          .select()
          .eq('pizza_property_id', pizza_property_id)
          .eq('user_id', user_id)
          .single()
        if (error) {
          return { error }
        }
        return { data }
      },
      providesTags: ['UserRatings'],
    }),
    addUserRating: builder.mutation({
      queryFn: async (rating) => {
        console.log(rating)
        const { data, error } = await supabase
          .from('User_Ratings')
          .insert(rating)
        console.log(data, error)
        if (error) {
          return { error }
        }
        return { data }
      },
      providesTags: ['UserRatings'],
    }),
    updateUserRating: builder.mutation({
      queryFn: async (rating) => {
        console.log(rating)
        const { data, error } = await supabase
          .from('User_Ratings')
          .update(rating)
          .eq('id', rating.id)
        console.log(data, error)
        if (error) {
          return { error }
        }
        return { data }
      },
      invalidatesTags: (result, error, id) => [{ type: 'UserRatings', id }],
    }),
  }),
})

export const { useGetUserRatingsQuery, useGetUserRatingByPropertyIDQuery, useAddUserRatingMutation, useUpdateUserRatingMutation } = userRatingsApi