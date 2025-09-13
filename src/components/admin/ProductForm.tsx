'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { createProduct, updateProduct } from '@/lib/actions/products'

interface Product {
  id?: string
  title: string
  description: string
  price_tokens: number
  image_url?: string | null
  is_active: boolean
}

interface ProductFormProps {
  product?: Product
  onCancel: () => void
}

export function ProductForm({ product, onCancel }: ProductFormProps) {
  const [loading, setLoading] = useState(false)
  const isEditing = !!product

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    
    try {
      if (isEditing && product?.id) {
        formData.append('id', product.id)
        await updateProduct(formData)
      } else {
        await createProduct(formData)
      }
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="title"
        label="Product Title"
        placeholder="Enter product title"
        defaultValue={product?.title || ''}
        required
      />
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          placeholder="Enter product description"
          defaultValue={product?.description || ''}
          required
          rows={3}
          className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:text-gray-600"
        />
      </div>

      <Input
        name="price_tokens"
        label="Price (Tokens)"
        type="number"
        placeholder="Enter price in tokens"
        defaultValue={product?.price_tokens?.toString() || ''}
        min="1"
        required
      />

      <Input
        name="image_url"
        label="Image URL (Optional)"
        type="url"
        placeholder="https://example.com/image.jpg"
        defaultValue={product?.image_url || ''}
      />

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="is_active"
          name="is_active"
          value="true"
          defaultChecked={product?.is_active ?? true}
          className="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
        />
        <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
          Active (visible to customers)
        </label>
      </div>

      <div className="flex space-x-3 pt-4">
        <Button
          type="submit"
          disabled={loading}
          className="flex-1"
        >
          {loading ? 'Saving...' : (isEditing ? 'Update Product' : 'Create Product')}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
