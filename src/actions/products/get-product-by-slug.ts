'use server'

import prisma from "@/lib/prisma"

export const getProductBySlug = async(slug: string) => {

  try {
    const productQuery = await prisma.product.findFirst({
      include: {
        ProductImage: {
          select: {
            url: true
          }
        }
      },
      where: {
        slug: slug
      }
    })

    if (!productQuery) return null

    const { ProductImage, ...product} = productQuery

    return {
      ...product,
      images: ProductImage.map(image => image.url)
    }
    
  } catch (error) {
    console.log(error)
    throw new Error('Error al obtener producto por slug')
  }
}