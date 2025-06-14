// "use client"

// import { useState } from "react"
// import Navbar from "@/components/Navbar"
// import HomePage from "@/components/home-page"
// import ProductGrid from "@/components/product-grid"
// import BannerSection from "@/components/Banner-section"
// import NewsletterSection from "@/components/newsletter-section"
// import InfoCards from "@/components/info-cards"
// import type { Product } from "@/app/types/product"

// interface HomePageItem {
//   id: number
//   documentId: string
//   title: string
//   description: string
//   button_text: string
//   layout: "left" | "right"
//   order: number
//   image: {
//     id: number
//     name: string
//     url: string
//     alternativeText: string | null
//     width: number
//     height: number
//     formats?: {
//       small?: {
//         url: string
//         width: number
//         height: number
//       }
//     }
//   }
// }

// interface MainPageClientProps {
//   homeData: HomePageItem[]
//   products: Product[]
// }

// export default function MainPageClient({ homeData, products }: MainPageClientProps) {
//   const [selectedCategory, setSelectedCategory] = useState<string>("women")
//   const [showAllProducts, setShowAllProducts] = useState<boolean>(false)

//   const handleShopNowClick = () => {
//     setShowAllProducts(true)
//     setSelectedCategory("all")
//   }

//   const handleCategoryChange = (category: string) => {
//     setSelectedCategory(category)
//     setShowAllProducts(true)
//   }

//   return (
//     <>
//       <Navbar onCategoryChange={handleCategoryChange} />
//       <HomePage homeData={homeData} onShopNowClick={handleShopNowClick} />
//       <ProductGrid products={products} category={selectedCategory} showAllProducts={showAllProducts} />
//       <BannerSection category={selectedCategory} showAllProducts={showAllProducts} />
//       <InfoCards />
//       <NewsletterSection />
//     </>
//   )
// }




"use client"

import { useState } from "react"
import Navbar from "@/components/Navbar"
import HomePage from "@/components/home-page"
import ProductGrid from "@/components/product-grid"
import BannerSectionClient from "@/components/Banner-section"
import NewsletterSection from "@/components/newsletter-section"
import InfoCards from "@/components/info-cards"
import type { Product } from "@/app/types/product"

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

interface MainPageClientProps {
  homeData: HomePageItem[]
  products: Product[]
  banners: Banner[]
}

export default function MainPageClient({ homeData, products, banners }: MainPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("women")
  const [showAllProducts, setShowAllProducts] = useState<boolean>(false)

  const handleShopNowClick = () => {
    setShowAllProducts(true)
    setSelectedCategory("all")
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setShowAllProducts(true)
  }

  return (
    <>
      <Navbar onCategoryChange={handleCategoryChange} />
      <HomePage homeData={homeData} onShopNowClick={handleShopNowClick} />
      <ProductGrid products={products} category={selectedCategory} showAllProducts={showAllProducts} />
      <BannerSectionClient banners={banners} category={selectedCategory} showAllProducts={showAllProducts} />
      <InfoCards />
      <NewsletterSection />
    </>
  )
}







