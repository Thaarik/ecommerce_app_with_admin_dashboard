import { ProductWithCategory } from "../products/products.types";

export type Category = {
  created_at: string;
  id: number;
  imageUrl: string;
  name: string;
  slug: string;
};

// export type Product = {
//   category: number;
//   created_at: string;
//   hero_image: string;
//   id: number;
//   imageUrl: string[];
//   max_quantity: number;
//   price: number | null;
//   // name: string;
//   slug: string;
//   title: string;
// };

export type CategoryWithProducts = {
  created_at: string;
  id: number;
  imageUrl: string;
  name: string;
  products: ProductWithCategory[];
  //   products: Product[];
  slug: string;
};

export type CategoriesWithProductsResponse = CategoryWithProducts[];
