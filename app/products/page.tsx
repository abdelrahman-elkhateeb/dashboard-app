"use client"

import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import AddProductForm from '@/components/AddProductForm';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchProducts } from '@/store/productSlice';

export default function Page() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.product.loading);

  const handleSuccess = async () => {
    await dispatch(fetchProducts());
    setOpen(false);
  };

  return (
    <div className='py-2'>
      <div className="flex justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex gap-2 items-center">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Product</DialogTitle>
              <DialogDescription>
                Fill in the details below to add a new product.
              </DialogDescription>
            </DialogHeader>
            <AddProductForm onSuccess={handleSuccess} loading={loading} />
          </DialogContent>
        </Dialog>
      </div>
      <ProductCard />
    </div>
  )
}
