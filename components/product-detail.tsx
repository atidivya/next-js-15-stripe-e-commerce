"use client";

import Stripe from "stripe";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";

interface Props {
  product: Stripe.Product;
}

export const ProductDetail = ({ product }: Props) => {
  const { items, addItem, removeItem } = useCartStore();
  const price = product.default_price as Stripe.Price;
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem?.quantity : 0;

  const onAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      imageUrl: product.images ? product.images[0] : null,
      quantity: 1,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 md:items-start items-center">
      {product.images && product.images[0] && (
        <div className="relative h-96 w-full md:w-1/2 flex items-center justify-center bg-white rounded-lg overflow-hidden">
          <Image
            alt={product.name}
            src={product.images[0]}
            fill
            className="object-contain transition duration-300"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      )}

      <div className="md:w-1/2 md:pl-8 w-full">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

        {product.description && (
          <p className="text-gray-700 mb-4">{product.description}</p>
        )}

        {price?.unit_amount && (
          <p className="text-lg font-semibold text-gray-900 mb-4">
            €{(price.unit_amount / 100).toFixed(2)}
          </p>
        )}

        <div className="flex items-center space-x-4">
          <Button variant="outline" className="cursor-pointer" onClick={() => removeItem(product.id)}>
            -
          </Button>
          <span className="text-lg font-semibold">{quantity}</span>
          <Button className="cursor-pointer" onClick={onAddItem}>+</Button>
        </div>
      </div>
    </div>
  );
};
