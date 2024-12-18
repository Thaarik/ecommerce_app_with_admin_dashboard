import { getCategoriesWithProducts } from "@/actions/categories";
import React from "react";
import CategoriesPageComponent from "./page-component";

export default async function Categories() {
  const categories = await getCategoriesWithProducts();

  return <CategoriesPageComponent categories={categories} />;
}
