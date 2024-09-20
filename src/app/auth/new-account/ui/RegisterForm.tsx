'use client'

import { useState } from "react"
import Link from "next/link"

import { SubmitHandler, useForm } from "react-hook-form"
import clsx from "clsx"

import { login } from "@/actions/auth/login"
import { registerUser } from "@/actions/auth/register"

type FormInputs = {
  name: string
  email: string
  password: string
}

export const RegisterForm = () => {

  const [errorMessage, setErrorMessage] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>()

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { name, email, password } = data
    const resp = await registerUser(name, email, password)
    if (!resp.ok) {
      setErrorMessage(resp.message)
      return
    }

    await login(email.toLowerCase(), password)
    window.location.replace('/')
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col">

      <label htmlFor="name">Nombre completo</label>
      <input
        className={
          clsx(
            "px-5 py-2 border bg-gray-200 rounded mt-2",
            {
              "border-red-500": !!errors.name
            }
          )
        }
        type="text"
        autoFocus
        {...register('name', { required: "El nombre es obligatorio" })}
      />
      {errors.name &&
        <span className="text-sm text-red-500 mb-2">{errors.name.message}</span>
      }

      <label htmlFor="email">Correo electrónico</label>
      <input
        className={
          clsx(
            "px-5 py-2 border bg-gray-200 rounded mt-2",
            {
              "border-red-500": !!errors.email
            }
          )
        }
        {...register('email', {
          required: "El correo es obligatorio",
          pattern: {
            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Correo invalido"
          }
        }
        )}
      />
      {errors.email &&
        <span className="text-sm text-red-500 mb-2">{errors.email.message}</span>
      }

      <label htmlFor="password">Contraseña</label>
      <input
        className={
          clsx(
            "px-5 py-2 border bg-gray-200 rounded mt-2",
            {
              "border-red-500": !!errors.password
            }
          )
        }
        type="password"
        {...register('password', {
          required: "La contraseña es obligatoria",
          minLength: {
            value: 6,
            message: "Mínimo 6 caracteres"
          }
        })}
      />
      {errors.password &&
        <span className="text-sm text-red-500 mb-2">{errors.password.message}</span>
      }


      <span className="text-md text-red-500 mt-5">{errorMessage}</span>

      <button
        className="btn-primary mt-5">
        Ingresar
      </button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href="/auth/login"
        className="btn-secondary text-center">
        Login
      </Link>
    </form>

  )
}
