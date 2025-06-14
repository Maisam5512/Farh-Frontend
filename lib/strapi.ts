import { cache } from "react"

// Strapi API configuration
const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL
const STRAPI_MEDIA_URL = process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL

if (!STRAPI_API_URL) {
  throw new Error("NEXT_PUBLIC_STRAPI_API_URL is not defined")
}

if (!STRAPI_MEDIA_URL) {
  throw new Error("NEXT_PUBLIC_STRAPI_MEDIA_URL is not defined")
}

// Generic Strapi fetch function similar to Payload's approach
export const strapiFind = cache(
  async ({
    collection,
    filters = {},
    populate = "*",
    sort = "",
    pagination = { limit: 25 },
    fields = [],
  }: {
    collection: string
    filters?: Record<string, any>
    populate?: string
    sort?: string
    pagination?: { limit?: number; start?: number }
    fields?: string[]
  }) => {
    try {
      const params = new URLSearchParams()

      // Add populate
      if (populate) {
        params.append("populate", populate)
      }

      // Add filters
      Object.entries(filters).forEach(([key, value]) => {
        if (typeof value === "object" && value !== null) {
          Object.entries(value).forEach(([operator, operatorValue]) => {
            params.append(`filters[${key}][${operator}]`, String(operatorValue))
          })
        } else {
          params.append(`filters[${key}]`, String(value))
        }
      })

      // Add sort
      if (sort) {
        params.append("sort", sort)
      }

      // Add pagination
      if (pagination.limit) {
        params.append("pagination[limit]", String(pagination.limit))
      }
      if (pagination.start) {
        params.append("pagination[start]", String(pagination.start))
      }

      // Add fields
      fields.forEach((field, index) => {
        params.append(`fields[${index}]`, field)
      })

      const url = `${STRAPI_API_URL}/${collection}?${params.toString()}`

      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
        },
        next: { revalidate: 600 },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch ${collection}: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error(`Error fetching ${collection}:`, error)
      throw error
    }
  },
)

// Helper function to get full image URL
export const getStrapiMediaUrl = (url: string): string => {
  if (!url) return "/placeholder.svg"
  return url.startsWith("http") ? url : `${STRAPI_MEDIA_URL}${url}`
}

// Export constants
export { STRAPI_API_URL, STRAPI_MEDIA_URL }
