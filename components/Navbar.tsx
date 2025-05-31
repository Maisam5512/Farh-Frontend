"use client"

import Link from "next/link"
import { Search, User, Heart, ShoppingBag, Menu, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { toast } from "sonner" 

interface NavbarProps {
  onCategoryChange: (category: string) => void
}

const PakistanFlag = () => (
  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden border border-gray-200 relative">
    <div className="absolute inset-0 bg-green-600"></div>
    <div className="absolute right-0 top-0 w-1/3 h-full bg-white"></div>
    <div className="absolute left-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="relative w-2 h-2">
        <div className="absolute inset-0 bg-white rounded-full"></div>
        <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-green-600 rounded-full"></div>
      </div>
      <div className="absolute -right-1 top-0 text-white text-xs leading-none">★</div>
    </div>
  </div>
)

export default function Navbar({ onCategoryChange }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleCategoryClick = async (category: string) => {
    console.log("Navbar - Category clicked:", category)

    try {
      const productsResponse = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/products?filters[relation][$eq]=${category}&populate=*`,
      )
      const productsData = await productsResponse.json()

      const bannersResponse = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/Banners?filters[relation][$eq]=${category}&populate=*`,
      )
      const bannersData = await bannersResponse.json()

      const hasProducts = productsData.data && productsData.data.length > 0
      const hasBanners = bannersData.data && bannersData.data.length > 0

      if (!hasProducts && !hasBanners && category !== "all") {
        toast.error(
          `Sorry, we don't have any ${category === "men" ? "men's" : category === "women" ? "women's" : category === "kids" ? "kids'" : category} products available at the moment. Please check back later!`,
          {
            duration: 4000,
          }
        )
        return
      }

      if (!hasProducts && category !== "all") {
        toast.warning(
          `We have limited ${category === "men" ? "men's" : category === "women" ? "women's" : category === "kids" ? "kids'" : category} products available. More items coming soon!`,
          {
            duration: 3000,
          }
        )
      }
    } catch (error) {
      console.error("Error checking category data:", error)
      toast.error(
        "Unable to load content. Please check your internet connection and try again.",
        {
          duration: 4000,
        }
      )
      return
    }

    onCategoryChange(category)
    setIsMobileMenuOpen(false)

    if (pathname.startsWith("/product/")) {
      router.push("/")
    }
  }

  const handleUnavailableFeature = (featureName: string) => {
    toast(
      `${featureName} feature is currently under development. Stay tuned for updates!`,
      {
        duration: 3000,
      }
    )
  }

  return (
    <header className="w-full bg-white border-b sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4">
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
          <button
            onClick={() => handleCategoryClick("women")}
            className="text-sm font-medium text-gray-900 hover:text-gray-600 cursor-pointer transition-colors duration-200"
          >
            Womenswear
          </button>
          <button
            onClick={() => handleCategoryClick("men")}
            className="text-sm font-medium text-gray-900 hover:text-gray-600 cursor-pointer transition-colors duration-200"
          >
            Menswear
          </button>
          <button
            onClick={() => handleCategoryClick("kids")}
            className="text-sm font-medium text-gray-900 hover:text-gray-600 cursor-pointer transition-colors duration-200"
          >
            Kidswear
          </button>
        </nav>

        <button
          className="md:hidden p-2 cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
        </button>

        <Link
          href="/"
          className="text-xl sm:text-2xl font-bold tracking-wider cursor-pointer hover:text-gray-700 transition-colors duration-200"
        >
          FARFETCH
        </Link>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <PakistanFlag />
          <User
            className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 cursor-pointer hover:text-gray-900 transition-colors duration-200"
            onClick={() => handleUnavailableFeature("User Account")}
          />
          <Heart
            className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 cursor-pointer hover:text-gray-900 transition-colors duration-200"
            onClick={() => handleUnavailableFeature("Wishlist")}
          />
          <ShoppingBag
            className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 cursor-pointer hover:text-gray-900 transition-colors duration-200"
            onClick={() => handleUnavailableFeature("Shopping Bag")}
          />
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <nav className="flex flex-col px-4 py-3 space-y-3">
            <button
              onClick={() => handleCategoryClick("women")}
              className="text-sm font-medium text-gray-900 hover:text-gray-600 text-left cursor-pointer transition-colors duration-200"
            >
              Womenswear
            </button>
            <button
              onClick={() => handleCategoryClick("men")}
              className="text-sm font-medium text-gray-900 hover:text-gray-600 text-left cursor-pointer transition-colors duration-200"
            >
              Menswear
            </button>
            <button
              onClick={() => handleCategoryClick("kids")}
              className="text-sm font-medium text-gray-900 hover:text-gray-600 text-left cursor-pointer transition-colors duration-200"
            >
              Kidswear
            </button>
          </nav>
        </div>
      )}

      <div className="flex items-center justify-between px-4 sm:px-6 py-3 ">
        <nav className="flex items-center space-x-2 sm:space-x-4 lg:space-x-8 overflow-x-auto">
          <button
            onClick={() => handleCategoryClick("sale")}
            className="text-xs sm:text-sm font-medium text-red-600 hover:text-red-700 whitespace-nowrap cursor-pointer transition-colors duration-200"
          >
            Sale
          </button>
          <button
            onClick={() => handleCategoryClick("new")}
            className="text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 whitespace-nowrap cursor-pointer transition-colors duration-200"
          >
            New in
          </button>
          <button
            onClick={() => handleCategoryClick("vacation")}
            className="text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 whitespace-nowrap cursor-pointer transition-colors duration-200"
          >
            Vacation
          </button>
          <button
            onClick={() => handleCategoryClick("brands")}
            className="text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 whitespace-nowrap cursor-pointer transition-colors duration-200"
          >
            Brands
          </button>
          <button
            onClick={() => handleUnavailableFeature("Clothing")}
            className="hidden sm:block text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 whitespace-nowrap cursor-pointer transition-colors duration-200"
          >
            Clothing
          </button>
          <button
            onClick={() => handleUnavailableFeature("Shoes")}
            className="hidden sm:block text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 whitespace-nowrap cursor-pointer transition-colors duration-200"
          >
            Shoes
          </button>
          <button
            onClick={() => handleUnavailableFeature("Bags")}
            className="hidden md:block text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 whitespace-nowrap cursor-pointer transition-colors duration-200"
          >
            Bags
          </button>
          <button
            onClick={() => handleUnavailableFeature("Accessories")}
            className="hidden md:block text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 whitespace-nowrap cursor-pointer transition-colors duration-200"
          >
            Accessories
          </button>
          <button
            onClick={() => handleUnavailableFeature("Watches")}
            className="hidden lg:block text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 whitespace-nowrap cursor-pointer transition-colors duration-200"
          >
            Watches
          </button>
          <button
            onClick={() => handleUnavailableFeature("Homeware")}
            className="hidden lg:block text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 whitespace-nowrap cursor-pointer transition-colors duration-200"
          >
            Homeware
          </button>
        </nav>

        <div className="relative ml-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search"
            className="pl-10 w-32 sm:w-48 md:w-64 border-gray-300 focus:border-gray-500 text-sm cursor-text"
            onFocus={() => handleUnavailableFeature("Search")}
          />
        </div>
      </div>
    </header>
  )
}


