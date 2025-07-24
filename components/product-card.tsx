import Stripe from "stripe";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Props {
  product: Stripe.Product;
}

export const ProductCard = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;
  return (
    <Link href={`/products/${product.id}`} className="block h-full">
      <Card className=" hover:shadow-2xl transition duration-300 py-0 h-full flex flex-col border-gray-300 gap-0">
        {product.images && product.images[0] && (
          <div className="group relative h-96 w-full flex items-center justify-center bg-white rounded-lg overflow-hidden">
            <Image
              alt={product.name}
              src={product.images[0]}
              fill
              className="object-contain transition duration-300 p-7"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        )}

        <CardHeader className="p-4">
          <CardTitle className="text-xl font-bold text-gray-800">
            {product.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-4 flex-grow flex flex-col justify-between">
          {product.description && (
            <p className="text-gray-600 text-sm mb-2">{product.description}</p>
          )}
          {price && price.unit_amount && (
            <p className="text-lg font-semibold text-gray-900">
              €{(price.unit_amount / 100).toFixed(2)}
            </p>
          )}
          <Button className="mt-4 bg-black text-white cursor-pointer">View Details</Button>
        </CardContent>
      </Card>
    </Link>
  );
};
