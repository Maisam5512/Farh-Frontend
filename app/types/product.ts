export interface Product {
  id: number
  documentId: string
  name: string
  brand: string
  description: string | null
  originalPrice: number
  discountedPrice: number
  discountPercentage: number
  sizes: string[]
  slug: string
  estimatedDeliveryMin: string
  estimatedDeliveryMax: string
  relation: string | null
  images: Array<{
    id: number
    documentId: string
    name: string
    alternativeText: string | null
    caption: string | null
    width: number
    height: number
    formats?: {
      thumbnail?: {
        url: string
        width: number
        height: number
      }
      small?: {
        url: string
        width: number
        height: number
      }
      medium?: {
        url: string
        width: number
        height: number
      }
      large?: {
        url: string
        width: number
        height: number
      }
    }
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: string | null
    provider: string
    provider_metadata: any
    createdAt: string
    updatedAt: string
    publishedAt: string
  }>
  avaliableIn?: Array<{
    id: number
    documentId: string
    name: string
    alternativeText: string | null
    caption: string | null
    width: number
    height: number
    formats?: any
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: string | null
    provider: string
    provider_metadata: any
    createdAt: string
    updatedAt: string
    publishedAt: string
  }>
   productDetail?: Array<{
      id: number
      composition_outer: string | null
      composition_lining: string | null
      washing_instructions: string | null
      wearing_info: string | null
      highlights: string | null
    }>
}




