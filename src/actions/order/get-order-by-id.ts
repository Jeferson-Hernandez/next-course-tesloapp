/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'

import { auth } from "@/auth"
import prisma from "@/lib/prisma"

export const getOrderById = async (id: string) => {

  const session = await auth()

  if (!session) {
    return {
      ok: false,
      message: 'Debe de estar autenticado'
    }
  }

  try {

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        OrderAddress: {
          include: {
            country: {
              select: {
                name: true
              }
            }
          }
        },
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,
            product: {
              select: {
                title: true,
                slug: true,
                ProductImage: {
                  select: {
                    url: true
                  },
                  take: 1
                }
              }
            }
          }
        }
      }
    })

    if (!order) throw new Error("Order does not exist")

    if (session.user.role === 'user') {
      if (session.user.id !== order.userId) {
        throw `${id} no es de ese usuario`
      }
    }

    return {
      ok: true,
      order: order
    }

  } catch (
    
    err) {
    const error = err as Error
    return {
      ok: false,
      message: error.message
    }
  }
}