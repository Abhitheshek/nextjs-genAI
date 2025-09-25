'use client';

import { Product } from '../lib/productService';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  product: Product;
  isSellerView?: boolean;
  onEdit?: (product: Product) => void;
  onDelete?: (id: string) => void;
}

export default function ProductCard({ product, isSellerView, onEdit, onDelete }: ProductCardProps) {
  const router = useRouter();
  const discountedPrice = product.price - (product.price * product.discount / 100);

  const handleCardClick = () => {
    if (!isSellerView) {
      router.push(`/product/${product.id}`);
    }
  };

  return (
    <div 
      className={`bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
        !isSellerView ? 'cursor-pointer' : ''
      }`}
      onClick={handleCardClick}
    >
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-40 sm:h-48 md:h-52 object-cover"
      />
      <div className="p-3 sm:p-4">
        <h3 className="font-semibold text-base sm:text-lg mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-2">{product.category}</p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-3">
          <span className="text-lg sm:text-xl font-bold text-green-600">₹{discountedPrice.toFixed(2)}</span>
          {product.discount > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm line-through text-gray-500">₹{product.price}</span>
              <span className="text-xs sm:text-sm bg-red-100 text-red-600 px-2 py-1 rounded">{product.discount}% OFF</span>
            </div>
          )}
        </div>
        <p className="text-xs sm:text-sm text-gray-500 mb-3">By {product.sellerName}</p>
        
        {isSellerView ? (
          <div className="flex gap-2">
            <Button size="sm" onClick={() => onEdit?.(product)} className="flex-1 text-xs sm:text-sm">Edit</Button>
            <Button size="sm" variant="destructive" onClick={() => onDelete?.(product.id!)} className="flex-1 text-xs sm:text-sm">Delete</Button>
          </div>
        ) : (
          <Button className="w-full text-sm sm:text-base py-2 sm:py-3">Add to Cart</Button>
        )}
      </div>
    </div>
  );
}