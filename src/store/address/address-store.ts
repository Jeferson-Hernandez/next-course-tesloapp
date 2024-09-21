import { create } from "zustand"
import { persist } from "zustand/middleware"

import { Address } from "@/interfaces"

interface State {
  address: Address

  setAddress: (address: Address) => void
}

export const useAddressStore = create<State>()(
  persist(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (set, get) => ({
      address: {
        firstName: '',
        lastName: '',
        address: '',
        address2: '',
        postalCode: '',
        city: '',
        country: '',
        phone: ''
      },
      setAddress: (address) => {
        set({ address })
      }
    }),
    {
      name: "address-storage"
    }
  )
)