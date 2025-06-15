export interface StrapiResponse<T> {
  data: T
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface StrapiSingleResponse<T> {
  data: T
  meta: {}
}

export interface StrapiCollectionResponse<T> {
  data: T[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

// Image interfaces
export interface StrapiImageFormat {
  name: string
  hash: string
  ext: string
  mime: string
  path: string | null
  width: number
  height: number
  size: number
  url: string
}

export interface StrapiImage {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  width: number
  height: number
  formats: {
    thumbnail?: StrapiImageFormat
    small?: StrapiImageFormat
    medium?: StrapiImageFormat
    large?: StrapiImageFormat
  } | null
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: any | null
  createdAt: string
  updatedAt: string
  publishedAt: string
}

// Product Detail interface
export interface ProductDetail {
  id: number
  highlights?: string
  composition_outer?: string
  washing_instructions?: string
  wearing_info?: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

// Raw Product from Strapi API
export interface StrapiProduct {
  id: number
  documentId: string
  name: string
  brand: string
  slug: string
  originalPrice: number
  discountedPrice: number
  discountPercentage: number
  relation: "men" | "women" | "kids" | "unisex"
  sizes: string[]
  estimatedDeliveryMin: string
  estimatedDeliveryMax: string
  images: StrapiImage[]
  avaliableIn: StrapiImage[]
  productDetail: ProductDetail[]
  createdAt: string
  updatedAt: string
  publishedAt: string
}

// Transformed Product for frontend use
export interface Product {
  id: number
  documentId: string
  name: string
  brand: string
  slug: string
  originalPrice: number
  discountedPrice: number
  discountPercentage: number
  relation: "men" | "women" | "kids" | "unisex"
  sizes: string[]
  estimatedDeliveryMin: string
  estimatedDeliveryMax: string
  images: StrapiImage[]
  avaliableIn: StrapiImage[]
  productDetail: ProductDetail[]
  createdAt: string
  updatedAt: string
  publishedAt: string
}

// Home section interfaces
export interface StrapiHomeSection {
  id: number
  documentId: string
  title: string
  description: string
  button_text: string
  layout: "left" | "right"
  order: number
  image: StrapiImage
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface HomeSection {
  id: number
  documentId: string
  title: string
  description: string
  button_text: string
  layout: "left" | "right"
  order: number
  image: StrapiImage
  createdAt: string
  updatedAt: string
  publishedAt: string
}





