import { AdminProductsClient } from './AdminProductsClient'
import { getProducts } from '@/lib/actions/products'

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: { success?: string; error?: string }
}) {
  const products = await getProducts()

  return (
    <AdminProductsClient 
      initialProducts={products}
      success={searchParams.success}
      error={searchParams.error}
    />
  )
}
