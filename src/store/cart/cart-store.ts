import { create } from "zustand";
import type { CartProduct } from "@/interfaces";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[]

  getTotalItems: () => number
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  }

  addProductToCart: (product: CartProduct) => void
  updateProductQuantity: (product: CartProduct, quantity: number) => void
  removeProduct: (product: CartProduct) => void
  clearCart: () => void
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      getTotalItems: () => {
        const { cart } = get()
        return cart.reduce((total, item) => total + item.quantity, 0)
      },
      getSummaryInformation: () => {
        const { cart } = get()

        const subTotal = cart.reduce((subTotal, product) => (
          (product.quantity * product.price) + subTotal
        ), 0)

        const tax = subTotal * 0.15
        const total = subTotal + tax
        const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0)

        return {
          subTotal, tax, total, itemsInCart
        }
      },
      addProductToCart: (product: CartProduct) => {
        const { cart } = get()

        // 1. revisar si el producto existe en el cart
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        )

        if (!productInCart) {
          set({ cart: [...cart, product] })
          return
        }

        // 2. incrementar talla si el producto existe
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity }
          }

          return item
        })
        set({ cart: updatedCartProducts })
      },
      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get()
        const productInCart = cart.some((p) => p.id === product.id && p.size === product.size)

        if (!productInCart) return

        const updateCartProduct = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: quantity }
          }

          return item
        })

        set({ cart: updateCartProduct })
      },
      removeProduct: (product: CartProduct) => {
        const { cart } = get()

        const filteredCartProducts = cart.filter((item) => {
          if (item.id === product.id && item.size === product.size) return
          return item
        })

        set({ cart: filteredCartProducts })
      },
      clearCart: () => {
        set({ cart: [] })
      }
    })
    , {
      name: "shopping-cart",
      // skipHydration: true
    }
  )
)