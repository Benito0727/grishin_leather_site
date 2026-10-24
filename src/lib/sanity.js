import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: '9e7ej37q',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)

export function imageUrlFor(source) {
  return builder.image(source).url()
}

export async function getProducts() {
  const query = `*[_type == "product" && isAvailable == true] | order(_createdAt desc) {
    _id,
    title,
    slug,
    category,
    price,
    description,
    mainImage,
    gallery,
    ozonLink,
    wbLink,
    ymLink,
    contactTelegram,
    contactWhatsapp,
    contactMax,
    isAvailable
  }`

  return await client.fetch(query)
}