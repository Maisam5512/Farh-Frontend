"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface HomePageItem {
  id: number
  documentId: string
  title: string
  description: string
  button_text: string
  layout: "left" | "right"
  order: number
  image: {
    id: number
    name: string
    url: string
    alternativeText: string | null
    width: number
    height: number
    formats?: {
      small?: {
        url: string
        width: number
        height: number
      }
    }
  }
}

interface HomePageClientProps {
  homeData: HomePageItem[]
  onShopNowClick: () => void
}

export default function HomePageClient({ homeData, onShopNowClick }: HomePageClientProps) {
  const [imageLoadStates, setImageLoadStates] = useState<Record<number, boolean>>({})

  const handleImageLoad = (imageId: number) => {
    setImageLoadStates((prev) => ({ ...prev, [imageId]: true }))
  }

  const handleButtonClick = () => {
    onShopNowClick()
  }

  return (
    <>
      {homeData.map((item, index) => {
        const isFirstImage = index === 0
        const imageUrl = item.image.formats?.small?.url || item.image.url || "/placeholder.svg"
        const fullImageUrl = imageUrl.startsWith("http")
          ? imageUrl
          : `${process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL}${imageUrl}`
        const isImageLoaded = imageLoadStates[item.id]

        return (
          <section key={item.id} className="w-full">
            <div className="flex flex-col lg:grid lg:grid-cols-2 w-full">
              {item.layout === "left" ? (
                <>
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src={fullImageUrl || "/placeholder.svg"}
                      alt={item.image.alternativeText || item.title}
                      fill
                      className={`object-cover transition-opacity duration-300 ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
                      priority={isFirstImage}
                      loading={isFirstImage ? "eager" : "lazy"}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={85}
                      onLoad={() => handleImageLoad(item.id)}
                    />
                  </div>
                  <div className="flex items-center justify-center p-8 lg:p-16 order-2 bg-gray-50 w-full">
                    <div className="max-w-md space-y-6 text-center">
                      <h1 className="text-lg lg:text-5xl font-light text-gray-900 leading-tight">{item.title}</h1>
                      <p className="text-md text-gray-600 leading-relaxed">{item.description}</p>
                      <div className="flex justify-center">
                        <Button
                          onClick={handleButtonClick}
                          className="bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 px-8 py-3 text-base font-medium transition-colors duration-200"
                        >
                          {item.button_text}
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center p-8 lg:p-16 order-2 lg:order-1 bg-gray-50 w-full">
                    <div className="max-w-md space-y-6 text-center">
                      <h1 className="text-lg lg:text-5xl font-light text-gray-900 leading-tight">{item.title}</h1>
                      <p className="text-md text-gray-600 leading-relaxed">{item.description}</p>
                      <div className="flex justify-center">
                        <Button
                          onClick={handleButtonClick}
                          className="bg-white text-gray-800 cursor-pointer border border-gray-300 hover:bg-gray-100 px-8 py-3 text-base font-medium transition-colors duration-200"
                        >
                          {item.button_text}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="relative w-full aspect-[4/3] order-1 lg:order-2">
                    <Image
                      src={fullImageUrl || "/placeholder.svg"}
                      alt={item.image.alternativeText || item.title}
                      fill
                      className={`object-cover transition-opacity duration-300 ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
                      priority={isFirstImage}
                      loading={isFirstImage ? "eager" : "lazy"}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={85}
                      onLoad={() => handleImageLoad(item.id)}
                    />
                  </div>
                </>
              )}
            </div>
          </section>
        )
      })}
    </>
  )
}
