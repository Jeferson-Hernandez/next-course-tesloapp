'use client'

import clsx from "clsx"
import Link from "next/link"
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5"

import { useUIStore } from "@/store"
import { logout } from "@/actions/auth/logout"
import { useSession } from "next-auth/react"

export const Sidebar = () => {

  const { isSideMenuOpen, closeSideMenu } = useUIStore(state => state)
  const { data: session } = useSession()
  const isAuthenticated = !!session?.user
  const userRole = session?.user.role


  const onLogout = async () => {
    await logout()
    window.location.replace('/')
  }

  return (
    <div>
      {
        isSideMenuOpen && (
          <>
            <div
              className="fixed inset-0 w-screen h-screen z-10 bg-black opacity-30" />
            <div
              onClick={() => closeSideMenu()}
              className="fade-in fixed inset-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm" />
          </>
        )
      }
      <nav
        className={
          clsx(
            "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-transform duration-300",
            {
              "translate-x-full": !isSideMenuOpen
            }
          )
        }>
        <IoCloseOutline
          size={50}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => closeSideMenu()}
        />
        {/* input */}
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        {
          !isAuthenticated
            ? (
              <Link
                href="/auth/login"
                onClick={() => closeSideMenu()}
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-colors">
                <IoLogInOutline size={30} />
                <span className="ml-3 text-xl">Ingresar</span>
              </Link>
            )
            : (
              <>

                {/* menu */}
                <Link
                  href="/profile"
                  onClick={() => closeSideMenu()}
                  className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-colors">
                  <IoPersonOutline size={30} />
                  <span className="ml-3 text-xl">Perfil</span>
                </Link>
                <Link
                  href="/orders"
                  className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-colors">
                  <IoTicketOutline size={30} />
                  <span className="ml-3 text-xl">Ordenes</span>
                </Link>
                <button
                  onClick={() => {
                    onLogout()
                    closeSideMenu()
                  }}
                  className="flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-colors">
                  <IoLogOutOutline size={30} />
                  <span className="ml-3 text-xl">Salir</span>
                </button>

                {/* line separator */}
                <div className="w-full h-px bg-gray-200 my-10" />
                {
                  userRole === 'admin' && (
                    <>
                      <Link
                        href="/"
                        className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-colors">
                        <IoShirtOutline size={30} />
                        <span className="ml-3 text-xl">Products</span>
                      </Link>
                      <Link
                        href="/"
                        className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-colors">
                        <IoTicketOutline size={30} />
                        <span className="ml-3 text-xl">Ordenes</span>
                      </Link>
                      <Link
                        href="/"
                        className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-colors">
                        <IoPeopleOutline size={30} />
                        <span className="ml-3 text-xl">Usuarios</span>
                      </Link>
                    </>
                  )
                }
              </>
            )
        }
      </nav>
    </div >
  )
}