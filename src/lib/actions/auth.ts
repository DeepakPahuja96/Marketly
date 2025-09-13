'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function signUp(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data: authData, error } = await supabase.auth.signUp(data)

  if (error) {
    console.error('Signup error:', error)
    redirect('/signup?error=Could not create account')
  }

  // Create profile and wallet for the new user
  if (authData.user) {
    // Create profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: authData.user.id,
          role: 'user'
        }
      ])

    if (profileError) {
      console.error('Profile creation error:', profileError)
    }

    // Create wallet with 500 tokens
    const { error: walletError } = await supabase
      .from('wallets')
      .insert([
        {
          user_id: authData.user.id,
          balance: 500
        }
      ])

    if (walletError) {
      console.error('Wallet creation error:', walletError)
    }

    // Create initial token transaction
    const { error: transactionError } = await supabase
      .from('token_transactions')
      .insert([
        {
          user_id: authData.user.id,
          delta: 500,
          reason: 'Welcome bonus',
          reference_id: 'signup'
        }
      ])

    if (transactionError) {
      console.error('Transaction creation error:', transactionError)
    }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signIn(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.error('Signin error:', error)
    redirect('/login?error=Invalid credentials')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/reset-password/confirm`,
  })

  if (error) {
    console.error('Reset password error:', error)
    redirect('/reset-password?error=Could not send reset email')
  }

  redirect('/reset-password?message=Check your email for reset link')
}

export async function getUser() {
  const supabase = await createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error) {
    console.error('Get user error:', error)
    return null
  }
  
  return user
}

export async function getUserProfile() {
  const supabase = await createClient()
  
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError || !user) {
    return null
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profileError) {
    console.error('Get profile error:', profileError)
    return null
  }

  return { user, profile }
}

export async function getUserWallet() {
  const supabase = await createClient()
  
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError || !user) {
    return null
  }

  const { data: wallet, error: walletError } = await supabase
    .from('wallets')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (walletError) {
    console.error('Get wallet error:', walletError)
    return null
  }

  return wallet
}
