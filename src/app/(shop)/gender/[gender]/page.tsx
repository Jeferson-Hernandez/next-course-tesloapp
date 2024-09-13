export const revalidate = 60 //seconds

// import { notFound } from "next/navigation";
import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@/interfaces";
import { redirect } from "next/navigation";

interface Props {
  params: {
    gender: Gender
  }
  searchParams: {
    page?: string
  }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { gender } = params 
  const page = searchParams.page ? parseInt(searchParams.page) : 1

   const { 
    products, 
    totalPages 
  } = await getPaginatedProductsWithImages({ page, gender })

  if (products.length === 0) {
    redirect(`/gender/${gender}`)
  }

  const labels: Record<Gender, string> = {
    'men': "para hombres",
    'women': 'para mujeres',
    'kid': 'para niños',
    'unisex': 'para todos'
  }

  // if ( id === 'kids') {
  //   notFound()
  // }

  return (
    <div>
      <Title title={`Artículos de ${labels[gender]}`} subtitle="Todos los productos" className="mb-2" />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages}/>
    </div>
  );
}