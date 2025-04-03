import { Card, CardContent } from "@/components/ui/card"

export function ComplianceScorecard() {
  // Mock compliance scores
  const scores = [
    { name: "Overall Compliance", score: 87, color: "bg-blue-500" },
    { name: "Data Protection", score: 92, color: "bg-green-500" },
    { name: "Tax Regulations", score: 78, color: "bg-yellow-500" },
    { name: "System Security", score: 95, color: "bg-green-500" },
    { name: "Property Valuation", score: 65, color: "bg-red-500" },
  ]

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {scores.map((item) => (
            <div key={item.name} className="flex flex-col items-center text-center">
              <div className="relative w-24 h-24 mb-2">
                <svg className="w-24 h-24" viewBox="0 0 100 100">
                  <circle
                    className="text-gray-200"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className={item.color}
                    strokeWidth="8"
                    strokeDasharray={`${item.score * 2.51} 251.2`}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">{item.score}%</span>
                </div>
              </div>
              <h3 className="font-medium text-sm">{item.name}</h3>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

