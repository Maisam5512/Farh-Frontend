"use client"

import Image from "next/image"

interface Banner {
  id: number
  title: string
  description: string
  ctaText: string | null
  position: string
  relation: string
  image: {
    id: number
    name: string
    url: string
    alternativeText: string | null
    width: number
    height: number
    formats?: {
      medium?: {
        url: string
        width: number
        height: number
      }
    }
  }
}

interface BannerSectionClientProps {
  banners: Banner[]
  category: string
  showAllProducts: boolean
}

export default function BannerSectionClient({ banners, category, showAllProducts }: BannerSectionClientProps) {
  console.log("Banner Section - Category:", category, "Show All Products:", showAllProducts)
  console.log(
    "Available banners:",
    banners.map((b) => ({ id: b.id, relation: b.relation, title: b.title })),
  )

  let filteredBanners: Banner[] = []

  if (showAllProducts && category === "all") {
    const priorityOrder = ["women", "men", "kids"]
    for (const relation of priorityOrder) {
      const banner = banners.find((banner) => banner.relation === relation)
      if (banner) {
        filteredBanners = [banner]
        break
      }
    }
  } else if (showAllProducts && category !== "all") {
    filteredBanners = banners.filter((banner) => banner.relation === category)
  } else {
    filteredBanners = banners.filter((banner) => banner.relation === category)
  }

  console.log(
    "Filtered banners:",
    filteredBanners.map((b) => ({ id: b.id, relation: b.relation, title: b.title })),
  )

  if (filteredBanners.length === 0) {
    console.log("No banners found for category:", category)
    return null
  }

  return (
    <div className="w-full py-16 bg-gray-50">
      {filteredBanners.map((banner) => {
        const imageUrl = banner.image.formats?.medium?.url || banner.image.url
        const fullImageUrl = imageUrl.startsWith("http")
          ? imageUrl
          : `${process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL}${imageUrl}`

        return (
          <div key={banner.id} className="container mx-auto px-4 mb-16 last:mb-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {banner.position === "right" ? (
                <>
                  <div className="space-y-6">
                    <h2 className="text-3xl lg:text-4xl font-light text-gray-900">{banner.title}</h2>
                    <p className="text-gray-600 leading-relaxed">{banner.description}</p>
                    {banner.ctaText && (
                      <button className="text-gray-900 underline hover:no-underline font-medium">
                        {banner.ctaText}
                      </button>
                    )}
                  </div>
                  <div className="relative aspect-[4/3] lg:order-2">
                    <Image
                      src={fullImageUrl || "/placeholder.svg"}
                      alt={banner.image.alternativeText || banner.title}
                      fill
                      className="object-cover rounded"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={fullImageUrl || "/placeholder.svg"}
                      alt={banner.image.alternativeText || banner.title}
                      fill
                      className="object-cover rounded"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="space-y-6">
                    <h2 className="text-3xl lg:text-4xl font-light text-gray-900">{banner.title}</h2>
                    <p className="text-gray-600 leading-relaxed">{banner.description}</p>
                    {banner.ctaText && (
                      <button className="text-gray-900 underline hover:no-underline font-medium">
                        {banner.ctaText}
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}











