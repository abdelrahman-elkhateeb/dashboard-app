"use client"
import axios from 'axios';

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
const API_URL = 'https://62fb62afe4bcaf5351837ac1.mockapi.io/product';

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const deleteProducts = createAsyncThunk("products/delete", async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

export const addProduct = createAsyncThunk('products/add', async (product) => {
  const response = await axios.post(API_URL, product);
  return response.data;
});

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