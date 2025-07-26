import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { updateProduct } from "@/store/productSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

interface UpdateProductFormProps {
  product: {
    id: string;
    name: string;
    description: string;
    category: string;
    image: string;
    price: string;
  };
  onCancel?: () => void;
  onSuccess?: () => void;
  loading?: boolean;
}

export default function UpdateProductForm({ product, onCancel, onSuccess, loading }: UpdateProductFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = React.useState(product.name);
  const [description, setDescription] = React.useState(product.description);
  const [category, setCategory] = React.useState(product.category);
  const [image, setImage] = React.useState(product.image);
  const [price, setPrice] = React.useState(product.price);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await dispatch(updateProduct({ id: product.id, name, description, category, image, price })).unwrap();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Failed to update product:", error);
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
  );
}
