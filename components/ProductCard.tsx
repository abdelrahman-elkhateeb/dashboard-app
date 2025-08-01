"use client"
import { AppDispatch, RootState } from "@/store";
import { deleteProducts, fetchProducts, Product } from "@/store/productSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import Loading from "./Loading";
import UpdateProductForm from './UpdateProductForm';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

export const revalidate = 3600;

export default function ProductCard() {
  const dispatch = useDispatch<AppDispatch>()
  const { products, loading, error } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await dispatch(deleteProducts(id));
    dispatch(fetchProducts());
    setDeletingId(null);
  };

  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setEditOpen(true);
  };

  const handleEditSuccess = async () => {
    await dispatch(fetchProducts());
    setEditOpen(false);
    setEditProduct(null);
  };

  if (loading) return <Loading />;

  if (error) return <p>error</p>;

  return (
    <div className="space-y-6 p-4">
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update the details below and save to update the product.
            </DialogDescription>
          </DialogHeader>
          {editProduct && (
            <UpdateProductForm
              product={editProduct}
              onSuccess={handleEditSuccess}
              onCancel={() => setEditOpen(false)}
              loading={loading}
            />
          )}
        </DialogContent>
      </Dialog>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-6">
        {products.map((p) => (
          <Card key={p.id} className="p-0 pb-5">
            <div className="relative aspect-square">
              <Image
                src={p.image}
                fill
                className="object-cover m-0 rounded-xl"
                alt={p.name}
              />
            </div>
            <CardHeader>
              <CardTitle>{p.name}</CardTitle>
              <CardDescription>{p.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <p className="text-md font-bold text-primary">
                  ${Number(p.price).toFixed(2)}
                </p>
                <Badge>{p.category}</Badge>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 flex items-center gap-2" onClick={() => handleEdit(p)}>
                  <Pencil className="w-4 h-4" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1 flex items-center gap-2"
                  onClick={() => handleDelete(p.id)}
                  disabled={deletingId === p.id}
                >
                  {deletingId === p.id ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
