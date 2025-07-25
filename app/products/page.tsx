import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export const revalidate = 3600;

export default function page() {
  return (
    <div className='py-2'>
      <div className="flex justify-end">
        <Button className="flex gap-2 items-center">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>
      <ProductCard />
    </div>
  )
}
