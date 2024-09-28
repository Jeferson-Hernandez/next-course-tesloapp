'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
    return "Success"
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'CredentialsSignin';
        case 'CallbackRouteError':
          return error.cause?.err?.toString()
        default:
          return 'Something went wrong.';
      }
    }
    return "Success"
  }
}

export const login = async(email: string, password: string) => {
  try {
    await signIn('credentials', { email, password })

    return {
      ok: true
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'No se pudo iniciar sesion'
    }
  }
}