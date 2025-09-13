import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function PurchasesPage() {
  // Mock purchase data - will be replaced with real data later
  const mockPurchases = [
    {
      id: '1',
      productTitle: 'Premium Template Pack',
      tokensSpent: 50,
      purchaseDate: '2024-01-20',
      status: 'completed'
    },
    {
      id: '2',
      productTitle: 'Icon Library Pro',
      tokensSpent: 30,
      purchaseDate: '2024-01-18',
      status: 'completed'
    },
  ]

  const mockTransactions = [
    {
      id: '1',
      type: 'purchase',
      description: 'Premium Template Pack',
      amount: -50,
      date: '2024-01-20'
    },
    {
      id: '2',
      type: 'top-up',
      description: 'Token Purchase',
      amount: +100,
      date: '2024-01-19'
    },
    {
      id: '3',
      type: 'purchase',
      description: 'Icon Library Pro',
      amount: -30,
      date: '2024-01-18'
    },
    {
      id: '4',
      type: 'signup',
      description: 'Welcome Bonus',
      amount: +500,
      date: '2024-01-15'
    },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Purchase History</h1>
        <p className="mt-2 text-gray-600">View your purchases and token transactions</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Purchases */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Purchases</h2>
          <div className="space-y-4">
            {mockPurchases.length > 0 ? (
              mockPurchases.map((purchase) => (
                <Card key={purchase.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{purchase.productTitle}</CardTitle>
                      <span className="text-sm text-gray-500">{purchase.purchaseDate}</span>
                    </div>
                    <CardDescription>
                      Purchase completed • {purchase.tokensSpent} tokens spent
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        purchase.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {purchase.status}
                      </span>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-gray-500">No purchases yet</p>
                  <Button className="mt-4" variant="outline">
                    Browse Products
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Transaction History */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Token Transactions</h2>
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>All token-related transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-b-0">
                    <div>
                      <p className="font-medium text-gray-900">{transaction.description}</p>
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                    </div>
                    <div className={`font-semibold ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}{transaction.amount} tokens
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
