"use client"

import { useState } from "react"
import Navbar from "@/components/Navbar"
import HomePage from "@/components/home-page"
import ProductGrid from "@/components/product-grid"
import BannerSection from "@/components/Banner-section"
import NewsletterSection from "@/components/newsletter-section"
import InfoCards from "@/components/info-cards"

export default function MainPage() {
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
    <div className="min-h-screen bg-white">
      <Navbar onCategoryChange={handleCategoryChange} />
      <HomePage onShopNowClick={handleShopNowClick} />
      <ProductGrid category={selectedCategory} showAllProducts={showAllProducts} />
      <BannerSection category={selectedCategory} showAllProducts={showAllProducts} />
      <InfoCards />
      <NewsletterSection />
    </div>
  )
}

