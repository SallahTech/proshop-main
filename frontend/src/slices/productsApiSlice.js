import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => PRODUCTS_URL,
    }),
    getProductDetails: builder.query({
      query: (id) => `${PRODUCTS_URL}/${id}`,
    }),
  }),
  keepUnusedDataFor: 5,
});

export const { useGetProductsQuery, useGetProductDetailsQuery } =
  productsApiSlice;
