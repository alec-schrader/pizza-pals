import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../utils/supabase'

const initialState = {
  value: [],
  isLoading: false,
  error: null,
}

export const fetchPizzaProperties = createAsyncThunk(
  'pizzaProperties/fetchPizzaProperties',
  async () => {
    const data = await supabase
      .from('Pizza_Properties')
      .select('id, name, category, subcategory, vegetarian, gluten_free')
      .order('category, subcategory, name')
    return data.data
  }
)

export const pizzaPropertiesSlice = createSlice({
  name: 'pizzaProperties',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizzaProperties.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchPizzaProperties.fulfilled, (state, action) => {
      state.isLoading = false
      state.value = action.payload
    })
    builder.addCase(fetchPizzaProperties.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  }
})

export default pizzaPropertiesSlice.reducer