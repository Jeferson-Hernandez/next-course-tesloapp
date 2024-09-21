import { initialData } from "./seed"
import prisma from '../lib/prisma';
import { countries } from "./seed-countries";

async function main() {

  // borrar registros
  await prisma.userAddress.deleteMany()
  await prisma.user.deleteMany()
  await prisma.productImage.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.country.deleteMany()

  // si hay un problema con las relaciones al eliminar - usar este
  // await prisma.productImage.deleteMany(),
  // await prisma.product.deleteMany(),
  // await prisma.category.deleteMany()


  const { categories, products , users} = initialData

  await prisma.user.createMany({
    data: users
  })

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
    const { images, type, ...rest } = product

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type]
      }
    })

    //images
    const imagesData = images.map(image => ({
    url: image,
      productId: dbProduct.id
    }))

    await prisma.productImage.createMany({
      data: imagesData
    })
  })

  await prisma.country.createMany({
    data: countries
  })

  console.log('Seed ejecutado correctamente')
}

(() => {
  if (process.env.NODE_ENV === 'production') return
  main()
})()