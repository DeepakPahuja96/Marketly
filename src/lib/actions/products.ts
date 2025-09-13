'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

// Check if user is admin
async function isAdmin(): Promise<boolean> {
  const supabase = await createClient()
  
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) return false

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profileError || !profile) return false
  
  return profile.role === 'admin'
}

// Get all products (public read)
export async function getProducts() {
  const supabase = await createClient()
  
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return products || []
}

// Get single product (public read)
export async function getProduct(id: string) {
  const supabase = await createClient()
  
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }

  return product
}

// Create product (admin only)
export async function createProduct(formData: FormData) {
  if (!(await isAdmin())) {
    redirect('/admin/products?error=Unauthorized')
  }

  const supabase = await createClient()

  const productData = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    price_tokens: parseInt(formData.get('price_tokens') as string),
    image_url: formData.get('image_url') as string || null,
    is_active: formData.get('is_active') === 'true'
  }

  // Validation
  if (!productData.title || !productData.description || !productData.price_tokens) {
    redirect('/admin/products?error=Missing required fields')
  }

  if (productData.price_tokens <= 0) {
    redirect('/admin/products?error=Price must be greater than 0')
  }

  const { error } = await supabase
    .from('products')
    .insert([productData])

  if (error) {
    console.error('Error creating product:', error)
    redirect('/admin/products?error=Failed to create product')
  }

  revalidatePath('/admin/products')
  revalidatePath('/')
  redirect('/admin/products?success=Product created successfully')
}

// Update product (admin only)
export async function updateProduct(formData: FormData) {
  if (!(await isAdmin())) {
    redirect('/admin/products?error=Unauthorized')
  }

  const supabase = await createClient()
  const productId = formData.get('id') as string

  const productData = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    price_tokens: parseInt(formData.get('price_tokens') as string),
    image_url: formData.get('image_url') as string || null,
    is_active: formData.get('is_active') === 'true'
  }

  // Validation
  if (!productData.title || !productData.description || !productData.price_tokens) {
    redirect(`/admin/products/edit/${productId}?error=Missing required fields`)
  }

  if (productData.price_tokens <= 0) {
    redirect(`/admin/products/edit/${productId}?error=Price must be greater than 0`)
  }

  const { error } = await supabase
    .from('products')
    .update(productData)
    .eq('id', productId)

  if (error) {
    console.error('Error updating product:', error)
    redirect(`/admin/products/edit/${productId}?error=Failed to update product`)
  }

  revalidatePath('/admin/products')
  revalidatePath('/')
  redirect('/admin/products?success=Product updated successfully')
}

// Delete product (admin only)
export async function deleteProduct(formData: FormData) {
  if (!(await isAdmin())) {
    redirect('/admin/products?error=Unauthorized')
  }

  const supabase = await createClient()
  const productId = formData.get('id') as string

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId)

  if (error) {
    console.error('Error deleting product:', error)
    redirect('/admin/products?error=Failed to delete product')
  }

  revalidatePath('/admin/products')
  revalidatePath('/')
  redirect('/admin/products?success=Product deleted successfully')
}

// Toggle product active status (admin only)
export async function toggleProductStatus(formData: FormData) {
  if (!(await isAdmin())) {
    redirect('/admin/products?error=Unauthorized')
  }

  const supabase = await createClient()
  const productId = formData.get('id') as string
  const currentStatus = formData.get('is_active') === 'true'

  const { error } = await supabase
    .from('products')
    .update({ is_active: !currentStatus })
    .eq('id', productId)

  if (error) {
    console.error('Error toggling product status:', error)
    redirect('/admin/products?error=Failed to update product status')
  }

  revalidatePath('/admin/products')
  revalidatePath('/')
  redirect('/admin/products?success=Product status updated')
}
