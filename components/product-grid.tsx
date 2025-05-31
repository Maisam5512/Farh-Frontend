"use client"

import { useState, useEffect } from "react"
import ProductCard from "@/components/product-card"
import type { Product } from "@/app/types/product"

interface ProductGridProps {
  category: string
  showAllProducts: boolean
}

export default function ProductGrid({ category, showAllProducts }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/products?populate=*`, {
          headers: {
            Accept: "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }

        const data = await response.json()
        setProducts(data.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching products:", error)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <div className="aspect-[3/4] bg-gray-200 animate-pulse rounded" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 animate-pulse rounded" />
                <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
                <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const filteredProducts = products.filter((product) => {
    if (showAllProducts) {
      
      if (category === "all") return true
      if (category === "sale") return product.discountedPrice > 0
      return product.relation === category
    } else {
      
      return product.relation === category
    }
  })

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-8">
        <h2 className="text-2xl font-light text-gray-900 mb-2">
          {!showAllProducts
            ? "Women's Collection"
            : category === "all"
              ? "All Products"
              : category === "men"
                ? "Men's Collection"
                : category === "women"
                  ? "Women's Collection"
                  : category === "kids"
                    ? "Kids' Collection"
                    : category === "sale"
                      ? "Sale Items"
                      : "Products"}
        </h2>
        <p className="text-gray-600">{filteredProducts.length} items</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} priority={index < 4} />
        ))}
      </div>
    </div>
  )
}

