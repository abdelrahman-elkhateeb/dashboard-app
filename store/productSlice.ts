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

export const addProduct = createAsyncThunk('products/add', async (product: {
  name: string;
  description: string;
  category: string;
  image: string;
  price: string;

}) => {
  const response = await axios.post(API_URL, product);
  return response.data;
});

export const updateProduct = createAsyncThunk('products/update', async (product: {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  price: string;
}) => {
  const response = await axios.put(`${API_URL}/${product.id}`, product);
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
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add product";
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.products.findIndex(p => p.id === action.payload.id);
        if (idx !== -1) {
          state.products[idx] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update product";
      })
  }
})

export default productSlice.reducer