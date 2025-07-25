"use client"

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Product {
  id: string
  name: string
  description: string
  category: string
  image: string
  price: string
}

interface ProductState {
  products: Product[],
  loading: boolean,
  error: string | null
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null
}

export const fetchProducts = createAsyncThunk("product/fetchProducts", async () => {
  const response = await fetch("https://62fb62afe4bcaf5351837ac1.mockapi.io/product")
  if (!response.ok) throw new Error("failed to fetch products")
  return await response.json()
})

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Something went wrong"
      })
  }
})

export default productSlice.reducer