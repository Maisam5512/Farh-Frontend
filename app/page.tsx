import type { Metadata } from "next"
import { cache } from "react"
import MainPageClient from "./page.client"
import type { Product } from "@/app/types/product"

export const dynamic = "force-static"
export const revalidate = 600

const queryHomeData = cache(async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/Home-sections?populate=*&sort=order:asc`, {
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 600 },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch home data")
    }

    const apiData = await response.json()
    return apiData.data.map((item: any) => ({
      id: item.id,
      documentId: item.documentId,
      title: item.title,
      description: item.description,
      button_text: item.button_text,
      layout: item.layout,
      order: item.order,
      image: {
        id: item.image.id,
        name: item.image.name,
        url: item.image.url,
        alternativeText: item.image.alternativeText,
        width: item.image.width,
        height: item.image.height,
        formats: item.image.formats
          ? {
              small: item.image.formats.small
                ? {
                    url: item.image.formats.small.url,
                    width: item.image.formats.small.width,
                    height: item.image.formats.small.height,
                  }
                : undefined,
            }
          : undefined,
      },
    }))
  } catch (error) {
    console.error("Error fetching home data:", error)
    return []
  }
})

const queryProducts = cache(async (): Promise<Product[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/products?populate=*&pagination[limit]=100`,
      {
        headers: {
          Accept: "application/json",
        },
        next: { revalidate: 600 },
      },
    )

    if (!response.ok) {
      throw new Error("Failed to fetch products")
    }

    const data = await response.json()
    return data.data.map((product: any) => ({
      id: product.id,
      documentId: product.documentId,
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      originalPrice: product.originalPrice,
      discountedPrice: product.discountedPrice || 0,
      discountPercentage: product.discountPercentage || 0,
      relation: product.relation,
      sizes: product.sizes || [],
      images: product.images || [],
      avaliableIn: product.avaliableIn || [],
      productDetail: product.productDetail || [],
      estimatedDeliveryMin: product.estimatedDeliveryMin,
      estimatedDeliveryMax: product.estimatedDeliveryMax,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      publishedAt: product.publishedAt,
    }))
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
})

const queryBanners = cache(async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/Banners?populate=*`, {
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 600 },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch banners")
    }

    const data = await response.json()
    return data.data.map((banner: any) => ({
      id: banner.id,
      title: banner.title,
      description: banner.description,
      ctaText: banner.ctaText,
      position: banner.position,
      relation: banner.relation,
      image: {
        id: banner.image.id,
        name: banner.image.name,
        url: banner.image.url,
        alternativeText: banner.image.alternativeText,
        width: banner.image.width,
        height: banner.image.height,
        formats: banner.image.formats
          ? {
              medium: banner.image.formats.medium
                ? {
                    url: banner.image.formats.medium.url,
                    width: banner.image.formats.medium.width,
                    height: banner.image.formats.medium.height,
                  }
                : undefined,
            }
          : undefined,
      },
    }))
  } catch (error) {
    console.error("Error fetching banners:", error)
    return []
  }
})

export default async function HomePage() {
  const [homeData, products, banners] = await Promise.all([queryHomeData(), queryProducts(), queryBanners()])

  return (
    <div className="min-h-screen bg-white">
      <MainPageClient homeData={homeData} products={products} banners={banners} />
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: "Fashion Store - Latest Collection",
    description:
      "Discover the latest fashion trends and collections for men, women, and kids. Shop premium brands with fast delivery.",
    keywords: ["fashion", "clothing", "men", "women", "kids", "sale", "premium brands"],
    openGraph: {
      title: "Fashion Store - Latest Collection",
      description: "Discover the latest fashion trends and collections",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Fashion Store - Latest Collection",
      description: "Discover the latest fashion trends and collections",
    },
  }
}


















