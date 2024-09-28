'use client'

// import { useActionState } from "react";
import { useFormState, useFormStatus } from "react-dom";

import Link from "next/link"
import { authenticate } from "@/actions/auth/login";
import { IoInformationOutline } from "react-icons/io5";
import clsx from "clsx";
import { useEffect } from "react";
// import { signIn } from "next-auth/react"

export const LoginForm = () => {
  // const [errorMessage, formAction, isPending] = useActionState(
  //     authenticate,
  //     undefined,
  // );
  const [state, dispatch] = useFormState(authenticate, undefined)

  console.log(state)

  useEffect(() => {
    if (state === 'Success') {
      window.location.replace('/')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])
  

  return (
    <form
      action={dispatch}
      className="flex flex-col">
      <label htmlFor="email">Correo electrónico</label>
      <input
        id="email"
        name="email"
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
      />
      <label htmlFor="password">Contraseña</label>
      <input
        id="password"
        name="password"
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
      />

      {
        state === "CredentialsSignin" && (
          <div className="flex flex-row mb-2">
            <IoInformationOutline className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">
              Las credenciales no son correctas
            </p>
          </div>
        )
      }

      <LoginButton />

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href="/auth/new-account"
        className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>
    </form>

  )
}


function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      className={clsx({
        "btn-primary": !pending,
        "btn-disabled": pending
      })}
      disabled={pending}
    >
      Ingresar
    </button>
  )
}