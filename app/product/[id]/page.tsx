import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { cache } from "react"
import ProductPageClient from "./page.client"
import type { Product } from "@/app/types/product"

export const dynamic = "force-static"
export const revalidate = 600

const queryProductBySlug = cache(async ({ slug }: { slug: string }): Promise<Product | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/products?filters[slug][$eq]=${slug}&populate=*`,
      {
        headers: {
          Accept: "application/json",
        },
        next: { revalidate: 600 },
      },
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.status}`)
    }

    const data = await response.json()

    if (Array.isArray(data.data) && data.data.length > 0) {
      const rawProduct = data.data[0]
      return {
        id: rawProduct.id,
        documentId: rawProduct.documentId,
        slug: rawProduct.slug,
        name: rawProduct.name,
        brand: rawProduct.brand,
        originalPrice: rawProduct.originalPrice,
        discountedPrice: rawProduct.discountedPrice || 0,
        discountPercentage: rawProduct.discountPercentage || 0,
        relation: rawProduct.relation,
        sizes: rawProduct.sizes || [],
        images: rawProduct.images || [],
        avaliableIn: rawProduct.avaliableIn || [],
        productDetail: rawProduct.productDetail || [],
        estimatedDeliveryMin: rawProduct.estimatedDeliveryMin,
        estimatedDeliveryMax: rawProduct.estimatedDeliveryMax,
        createdAt: rawProduct.createdAt,
        updatedAt: rawProduct.updatedAt,
        publishedAt: rawProduct.publishedAt,
      }
    }

    return null
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
})


export async function generateStaticParams() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/products?pagination[limit]=1000&fields[0]=slug`,
      {
        headers: {
          Accept: "application/json",
        },
      },
    )

    if (!response.ok) {
      throw new Error("Failed to fetch products for static generation")
    }

    const data = await response.json()

    const params = data.data.map((product: any) => ({
      id: product.slug,
    }))

    console.log(`Generated ${params.length} static product pages`)
    return params
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}

type Args = {
  params: Promise<{
    id: string
  }>
}

export default async function ProductPage({ params: paramsPromise }: Args) {
  const { id: slug } = await paramsPromise
  const product = await queryProductBySlug({ slug })

  if (!product) {
    notFound()
  }

  return (
    <article className="min-h-screen">
      <ProductPageClient product={product} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { id: slug } = await paramsPromise
  const product = await queryProductBySlug({ slug })

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    }
  }

  const imageUrl = product.images?.[0]?.url
  const fullImageUrl = imageUrl?.startsWith("http")
    ? imageUrl
    : `${process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL}${imageUrl}`

  return {
    title: `${product.brand} - ${product.name}`,
    description: `Shop ${product.brand} ${product.name} for $${product.originalPrice}. ${product.discountedPrice > 0 ? `Now on sale for $${product.discountedPrice}!` : ""}`,
    keywords: [product.brand, product.name, product.relation, "fashion", "clothing"],
    openGraph: {
      title: `${product.brand} - ${product.name}`,
      description: `Shop ${product.brand} ${product.name} for $${product.originalPrice}`,
      images: fullImageUrl ? [{ url: fullImageUrl, width: 800, height: 600 }] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.brand} - ${product.name}`,
      description: `Shop ${product.brand} ${product.name} for $${product.originalPrice}`,
      images: fullImageUrl ? [fullImageUrl] : [],
    },
  }
}









