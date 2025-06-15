import { memo } from "react"
import HomePageClient from "./home-page.client"

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

interface HomePageProps {
  homeData: HomePageItem[]
  onShopNowClick: () => void
}

const HomePage = memo(function HomePage({ homeData, onShopNowClick }: HomePageProps) {
  const sortedData = homeData.sort((a, b) => a.order - b.order)

  return (
    <div className="bg-white">
      <div className="h-10"></div>
      <HomePageClient homeData={sortedData} onShopNowClick={onShopNowClick} />
    </div>
  )
})

export default HomePage

