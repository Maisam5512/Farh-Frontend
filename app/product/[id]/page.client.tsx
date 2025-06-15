"use client"

import { useState, useMemo, useCallback } from "react"
import { Heart, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import type { Product } from "@/app/types/product"
import Navbar from "@/components/Navbar"
import ContactSection from "@/components/contact-section"
import NewsletterSection from "@/components/newsletter-section"
import WhyFarfetchSection from "@/components/Why-farhfetch-section"
import { getStrapiMediaUrl } from "@/lib/strapi"

interface ProductPageClientProps {
  product: Product
}

export default function ProductPageClient({ product }: ProductPageClientProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [detailsExpanded, setDetailsExpanded] = useState(false)

  const priceInfo = useMemo(() => {
    const formatPrice = (price: number) => `$${price}`
    const originalPrice = formatPrice(product.originalPrice)
    const discountedPrice = product.discountedPrice > 0 ? formatPrice(product.discountedPrice) : null
    const discountPercentage =
      product.discountPercentage ||
      (product.discountedPrice && product.originalPrice
        ? Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100)
        : 0)

    return {
      originalPrice,
      discountedPrice,
      discountPercentage,
    }
  }, [product])

  const deliveryInfo = useMemo(() => {
    if (!product.estimatedDeliveryMin || !product.estimatedDeliveryMax) {
      return null
    }

    const estimatedDeliveryMin = new Date(product.estimatedDeliveryMin).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
    const estimatedDeliveryMax = new Date(product.estimatedDeliveryMax).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })

    return { estimatedDeliveryMin, estimatedDeliveryMax }
  }, [product])

  const productImages = useMemo(() => {
    if (!product?.images?.length) {
      return [
        {
          id: 1,
          url: "/placeholder.svg?height=600&width=450",
          alt: product?.name || "Product image",
        },
      ]
    }

    return product.images.map((img) => ({
      id: img.id,
      url: getStrapiMediaUrl(img.formats?.large?.url || img.url),
      alt: product.name,
    }))
  }, [product])

  const handleAddToBag = useCallback(() => {
    if (!product || !selectedSize) return

    console.log(`Added ${product.name} (Size: ${selectedSize}) to bag!`)

    const button = document.querySelector("[data-add-to-bag]") as HTMLButtonElement
    if (button) {
      const originalText = button.textContent
      button.textContent = "Added!"
      button.disabled = true

      setTimeout(() => {
        button.textContent = originalText
        button.disabled = false
      }, 1500)
    }
  }, [product, selectedSize])

  const toggleWishlist = useCallback(() => {
    setIsWishlisted((prev) => !prev)
  }, [])

  const handleSizeSelect = useCallback((size: string) => {
    setSelectedSize(size)
    setIsDropdownOpen(false)
  }, [])

  const toggleDetails = useCallback(() => {
    setDetailsExpanded((prev) => !prev)
  }, [])

  const sizeOptions = useMemo(() => {
    if (!product?.sizes) return []

    return product.sizes.map((size, index) => ({
      size,
      label: index === 0 ? `OP - ${size}` : index === 1 ? `O - ${size}` : `${index - 1} - ${size}`,
      price: product.originalPrice + index * 10,
      stock: "Last 1 left",
    }))
  }, [product])

  return (
    <>
      <Navbar onCategoryChange={() => {}} />
      <div className="container mx-auto px-4 py-4 lg:py-8">
        {/* Mobile Layout */}
        <div className="block lg:hidden">
          <div className="space-y-4">
            <div className="space-y-2">
              {productImages.map((image) => (
                <div key={image.id} className="relative aspect-[3/4] w-full">
                  <Image
                    src={image.url || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover object-center"
                    sizes="100vw"
                    priority={image.id === productImages[0]?.id}
                  />
                </div>
              ))}
            </div>

            <div className="space-y-3 px-2">
              <div className="space-y-1">
                <p className="text-xs text-gray-600">New Season</p>
                <h1 className="text-lg font-bold text-gray-900">{product.brand}</h1>
                <p className="text-sm text-gray-800">{product.name}</p>
                <div className="pt-1">
                  {priceInfo?.discountedPrice ? (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600 line-through text-sm">{priceInfo.originalPrice}</span>
                        <span className="text-lg font-bold text-red-600">{priceInfo.discountedPrice}</span>
                      </div>
                      <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded inline-block">
                        -{priceInfo.discountPercentage}%
                      </div>
                    </div>
                  ) : (
                    <span className="text-lg font-bold text-gray-900">{priceInfo?.originalPrice}</span>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <button className="text-xs text-gray-900 underline hover:no-underline">Size guide</button>
              </div>

              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-2 py-2 border border-gray-300 rounded-md bg-white text-gray-900 text-sm text-left focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent flex items-center justify-between"
                >
                  <span className={selectedSize ? "text-gray-900" : "text-gray-500"}>
                    {selectedSize || "Select size"}
                  </span>
                  {isDropdownOpen ? (
                    <ChevronUp className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
                    {sizeOptions.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleSizeSelect(option.size)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between text-sm border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{option.label}</span>
                          {option.price !== product.originalPrice && (
                            <span className="text-gray-600">${option.price}</span>
                          )}
                        </div>
                        <span className="text-xs text-orange-600">{option.stock}</span>
                      </button>
                    ))}
                    <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                      <p className="text-xs text-gray-600 mb-1">
                        Different to {priceInfo?.originalPrice}? <button className="underline">Find out why</button>
                      </p>
                      <button className="text-xs text-gray-900 underline">Size missing?</button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  className="flex-1 bg-black hover:bg-gray-800 text-white transition-colors duration-200 py-3 text-sm font-medium rounded-md"
                  onClick={handleAddToBag}
                  disabled={!selectedSize}
                  data-add-to-bag
                  type="button"
                >
                  Add To Bag
                </Button>

                <Button
                  variant="outline"
                  className="flex items-center justify-center border border-gray-300 hover:border-gray-900 transition-colors duration-200 py-3 px-4 text-sm rounded-md bg-white"
                  onClick={toggleWishlist}
                  type="button"
                >
                  <Heart className={`h-4 w-4 ${isWishlisted ? "fill-gray-900" : ""}`} />
                </Button>
              </div>

              {deliveryInfo && (
                <div className="pt-2">
                  <p className="font-medium mb-1 text-gray-900 text-sm">Estimated delivery</p>
                  <p className="text-gray-800 text-sm">
                    {deliveryInfo.estimatedDeliveryMin} - {deliveryInfo.estimatedDeliveryMax}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          <div className="col-span-2">
            <div
              className="grid grid-cols-2 gap-4 max-h-[85vh] overflow-y-auto pr-4"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              {productImages.map((image) => (
                <div key={image.id} className="relative aspect-[3/4] w-full">
                  <Image
                    src={image.url || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    priority={image.id === productImages[0]?.id}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-6">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">New Season</p>
              <h1 className="text-2xl font-bold text-gray-900">{product.brand}</h1>
              <p className="text-lg text-gray-800">{product.name}</p>

              <div className="pt-2">
                {priceInfo?.discountedPrice ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 line-through text-lg">{priceInfo.originalPrice}</span>
                      <span className="text-2xl font-bold text-red-600">{priceInfo.discountedPrice}</span>
                    </div>
                    <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded inline-block">
                      -{priceInfo.discountPercentage}%
                    </div>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-gray-900">{priceInfo?.originalPrice}</span>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <button className="text-sm text-gray-900 underline hover:no-underline">Size guide</button>
            </div>

            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full px-2 py-2 border border-gray-300 rounded-md bg-white text-gray-900 text-base text-left focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent flex items-center justify-between"
              >
                <span className={selectedSize ? "text-gray-900" : "text-gray-500"}>
                  {selectedSize || "Select size"}
                </span>
                {isDropdownOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
                  {sizeOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleSizeSelect(option.size)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="font-medium">{option.label}</span>
                        {option.price !== product.originalPrice && (
                          <span className="text-gray-600">${option.price}</span>
                        )}
                      </div>
                      <span className="text-sm text-orange-600">{option.stock}</span>
                    </button>
                  ))}
                  <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                    <p className="text-sm text-gray-600 mb-2">
                      Different to {priceInfo?.originalPrice}? <button className="underline">Find out why</button>
                    </p>
                    <button className="text-sm text-gray-900 underline">Size missing?</button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <Button
                className="flex-1 bg-black hover:bg-gray-800 text-white cursor-pointer transition-colors duration-200 py-6 text-base font-medium rounded-md"
                onClick={handleAddToBag}
                disabled={!selectedSize}
                data-add-to-bag
                type="button"
              >
                Add To Bag
              </Button>

              <Button
                variant="outline"
                className="flex items-center justify-center border border-gray-300 cursor-pointer hover:border-gray-900 transition-colors duration-200 py-6 px-6 text-base rounded-md bg-white"
                onClick={toggleWishlist}
                type="button"
              >
                <span className="mr-2">Wishlist</span>
                <Heart className={`h-5 w-5 ${isWishlisted ? "fill-gray-900" : ""}`} />
              </Button>
            </div>

            {deliveryInfo && (
              <div className="pt-2">
                <p className="font-medium mb-1 text-gray-900">Estimated delivery</p>
                <p className="text-gray-800">
                  {deliveryInfo.estimatedDeliveryMin} - {deliveryInfo.estimatedDeliveryMax}
                </p>
              </div>
            )}

            {product.avaliableIn && product.avaliableIn.length > 0 && (
              <div className="pt-2">
                <h2 className="font-medium mb-3 text-gray-900">Available Colors</h2>
                <div className="flex gap-2 items-center">
                  {product.avaliableIn.map((colorImage) => (
                    <div
                      key={colorImage.id}
                      className="w-12 h-12 overflow-hidden hover:border-gray-900 transition-colors duration-200"
                    >
                      <Image
                        src={getStrapiMediaUrl(colorImage.url) || "/placeholder.svg"}
                        alt={colorImage.name || "Color variant"}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-1 py-1 border-b border-gray-200 mt-8">
        <button
          onClick={toggleDetails}
          className="w-full flex items-center justify-between py-4 text-gray-900 font-medium"
        >
          <span className="text-lg">THE DETAILS</span>
          {detailsExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>

        {detailsExpanded && product.productDetail && product.productDetail.length > 0 && (
          <div className="grid md:grid-cols-3 gap-8 py-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{product.brand}</h2>
                <p className="text-gray-800">{product.name}</p>
              </div>
              <p className="text-gray-800">Made in Italy</p>

              {product.productDetail[0].highlights && (
                <div>
                  <h3 className="font-medium mb-2">Highlights</h3>
                  <ul className="space-y-1">
                    {product.productDetail[0].highlights.split("\n").map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-3 leading-[1.5rem] text-[5px]">■</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {product.productDetail[0].composition_outer && (
                <div>
                  <h3 className="font-medium mb-2">Composition</h3>
                  <p>{product.productDetail[0].composition_outer}</p>
                </div>
              )}

              {product.productDetail[0].washing_instructions && (
                <div>
                  <h3 className="font-medium mb-2">Washing instructions</h3>
                  <p>{product.productDetail[0].washing_instructions}</p>
                </div>
              )}

              {product.productDetail[0].wearing_info && (
                <div>
                  <h3 className="font-medium mb-2">Wearing</h3>
                  <p>{product.productDetail[0].wearing_info}</p>
                </div>
              )}

              {product.id && <p className="text-gray-600">FARFETCH ID: {product.id}</p>}
            </div>

            <div className="relative aspect-square w-full">
              {productImages[0] && (
                <Image
                  src={productImages[0].url || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              )}
            </div>
          </div>
        )}
      </div>
      <WhyFarfetchSection />
      <NewsletterSection />
      <ContactSection />
    </>
  )
}

