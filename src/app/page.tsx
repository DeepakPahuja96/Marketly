import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ProductImage } from '@/components/ProductImage'
import { getProducts } from '@/lib/actions/products'

export default async function HomePage() {
  // Get active products from database
  const allProducts = await getProducts()
  const products = allProducts.filter(product => product.is_active)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Welcome to Marketly
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Discover premium digital products and purchase them with tokens. 
          Start with 500 free tokens when you sign up!
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button size="lg">
            Get Started
          </Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Products</h2>
        
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No products available yet.</p>
            <p className="text-sm text-gray-400">Check back soon for amazing digital products!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden transition-shadow hover:shadow-md">
                <div className="aspect-square overflow-hidden">
                  <ProductImage
                    src={product.image_url}
                    alt={product.title}
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{product.title}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      {product.price_tokens} tokens
                    </span>
                    <Button size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}