"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/store"
import { addProduct } from "@/store/productSlice"

interface AddProductFormProps {
  onCancel?: () => void;
  onSuccess?: () => void;
  loading?: boolean;
}

export default function AddProductForm({ onCancel, onSuccess, loading }: AddProductFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [image, setImage] = React.useState("");
  const [price, setPrice] = React.useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await dispatch(addProduct({ name, description, category, image, price })).unwrap();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-3">
        <Label htmlFor="name">Name</Label>
        <Input id="name" value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="description">Description</Label>
        <Input id="description" value={description} onChange={e => setDescription(e.target.value)} />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="category">Category</Label>
        <Input id="category" value={category} onChange={e => setCategory(e.target.value)} />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="image">Image URL</Label>
        <Input id="image" value={image} onChange={e => setImage(e.target.value)} />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="price">Price</Label>
        <Input id="price" value={price} onChange={e => setPrice(e.target.value)} />
      </div>
      <div className="flex justify-end gap-2 mt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save changes'}</Button>
      </div>
    </form>
  )
}
