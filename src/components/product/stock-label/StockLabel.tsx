'use client'

import { titleFont } from "@/config/fonts"
import { useEffect, useState } from "react"

import { getStockBySlug } from "@/actions"

interface Props {
  slug: string
}

export const StockLabel = ({ slug }: Props) => {

  const [stock, setStock] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getStock()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const getStock = async () => {
    const inStock = await getStockBySlug(slug)
    setStock(inStock)
    setIsLoading(false)
  }

  return (
    <>
      {
        isLoading
          ? (
            <h1 className={` ${titleFont.className} antialiased font-bold text-lg w-32 bg-gray-200 animate-pulse`}>
              &nbsp;
            </h1>
          )
          : (
            <h1 className={` ${titleFont.className} antialiased font-bold text-lg`}>
              Stock: {stock === 0 ? 'Sold Out' : stock}
            </h1>
          )
      }
    </>
  )
}
