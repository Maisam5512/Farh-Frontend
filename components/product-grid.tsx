import { memo } from "react"
import ProductCard from "@/components/product-card"
import type { Product } from "@/app/types/product"

interface ProductGridProps {
  products: Product[]
  category: string
  showAllProducts: boolean
}

const ProductGrid = memo(function ProductGrid({ products, category, showAllProducts }: ProductGridProps) {
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
})

export default ProductGrid


