import { z, ZodType } from "https://deno.land/x/zod@v3.22.4/mod.ts";

// Definir el tipo para el producto
type Product = {
  name: string;
  description: string;
  price: number;
  category: string;
  sizes: string[];
  features: string[];
  images: string[];
  stock: number;
};

const productSchema: ZodType<Product> = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  sizes: z.array(z.string()),
  features: z.array(z.string()),
  images: z.array(z.string()),
  stock: z.number(),
});

export function validateProduct(input: Product) {
  return productSchema.safeParse(input);
}
