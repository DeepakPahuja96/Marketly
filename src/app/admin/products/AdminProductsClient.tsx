'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { ProductForm } from '@/components/admin/ProductForm'
import { ProductImage } from '@/components/ProductImage'
import { deleteProduct, toggleProductStatus } from '@/lib/actions/products'
import { useAuth } from '@/hooks/useAuth'

interface Product {
  id: string
  title: string
  description: string
  price_tokens: number
  image_url?: string | null
  is_active: boolean
  created_at: string
}

interface AdminProductsClientProps {
  initialProducts: Product[]
  success?: string
  error?: string
}

export function AdminProductsClient({ initialProducts, success, error }: AdminProductsClientProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null)
  const { user, isAdmin } = useAuth()
  const router = useRouter()

  // Redirect if not admin
  useEffect(() => {
    if (user && !isAdmin) {
      router.push('/')
    }
  }, [user, isAdmin, router])

  // Show success/error messages
  useEffect(() => {
    if (success) {
      // You could add a toast notification here
      console.log('Success:', success)
    }
    if (error) {
      // You could add a toast notification here
      console.error('Error:', error)
    }
  }, [success, error])

  const handleDelete = async (product: Product) => {
    if (confirm(`Are you sure you want to delete "${product.title}"?`)) {
      const formData = new FormData()
      formData.append('id', product.id)
      await deleteProduct(formData)
    }
  }

  const handleToggleStatus = async (product: Product) => {
    const formData = new FormData()
    formData.append('id', product.id)
    formData.append('is_active', product.is_active.toString())
    await toggleProductStatus(formData)
  }

  if (!user || !isAdmin) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
          <p className="mt-2 text-gray-600">You need admin privileges to access this page.</p>
        </div>
      </div>
    )
  }

  const activeProducts = products.filter(p => p.is_active)
  const totalSales = products.length // Mock data - would be real sales count
  const totalRevenue = products.reduce((sum, p) => sum + p.price_tokens, 0) // Mock calculation

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
            <p className="mt-2 text-gray-600">Manage your marketplace products</p>
          </div>
          <Button onClick={() => setShowCreateModal(true)}>
            Add New Product
          </Button>
        </div>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="mb-6 rounded-md bg-green-50 p-4">
          <p className="text-sm text-green-800">{success}</p>
        </div>
      )}
      {error && (
        <div className="mb-6 rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Stats Overview */}
      <div className="mb-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{products.length}</div>
                <div className="text-sm text-gray-600">Total Products</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{activeProducts.length}</div>
                <div className="text-sm text-gray-600">Active Products</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{totalSales}</div>
                <div className="text-sm text-gray-600">Total Sales</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{totalRevenue}</div>
                <div className="text-sm text-gray-600">Revenue (Tokens)</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Products List */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">All Products</h2>
        
        {products.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500 mb-4">No products yet</p>
              <Button onClick={() => setShowCreateModal(true)}>
                Create Your First Product
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="aspect-video">
                  <ProductImage
                    src={product.image_url}
                    alt={product.title}
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{product.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {product.description}
                      </CardDescription>
                    </div>
                    <span className={`ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      product.is_active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {product.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-gray-900">
                      {product.price_tokens} tokens
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(product.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingProduct(product)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleStatus(product)}
                    >
                      {product.is_active ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(product)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Create Product Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Product"
      >
        <ProductForm
          onCancel={() => setShowCreateModal(false)}
        />
      </Modal>

      {/* Edit Product Modal */}
      <Modal
        isOpen={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        title="Edit Product"
      >
        {editingProduct && (
          <ProductForm
            product={editingProduct}
            onCancel={() => setEditingProduct(null)}
          />
        )}
      </Modal>
    </div>
  )
}
