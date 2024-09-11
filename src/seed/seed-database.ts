import { initialData } from "./seed"
import prisma from '../lib/prisma';

async function main() {

  // borrar registros
  await Promise.all([
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany()
  ])

  // si hay un problema con las relaciones al eliminar - usar este
  // await prisma.productImage.deleteMany(),
  // await prisma.product.deleteMany(),
  // await prisma.category.deleteMany()


  const { categories, products } = initialData

  // categorias
  const categoriesData = categories.map(category => ({
    name: category
  }))

  await prisma.category.createMany({
    data: categoriesData
  })

  const categoriesDB = await prisma.category.findMany()

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id
    return map
  }, {} as Record<string, string>)

  //products
  products.forEach(async (product) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { images, type, ...rest } = product

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type]
      }
    })

    //images
    const imagesData = images.map( image => ({
      url: image,
      productId: dbProduct.id
    }))

    await prisma.productImage.createMany({
      data: imagesData
    })
  })

  console.log('Seed ejecutado correctamente')
}

(() => {
  if (process.env.NODE_ENV === 'production') return
  main()
})()