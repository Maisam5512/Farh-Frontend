import { Tag, Star, RotateCcw } from "lucide-react"

export default function WhyFarfetchSection() {
  return (
    <div className="w-full py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-light text-gray-900 mb-8">Why FARFETCH?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-md transition-shadow">
            <div className="mb-4">
              <Tag className="w-8 h-8 text-gray-700" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">THE ONE THAT YOU WANT? WE'VE GOT IT.</h3>
            <p className="text-sm text-gray-600 mb-4">Shop over 100,000 styles</p>
            <button className="text-gray-700 hover:text-gray-900 hover:underline text-sm font-medium transition-colors">
              View all
            </button>
          </div>

          
          <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-md transition-shadow">
            <div className="mb-4">
              <Star className="w-8 h-8 text-gray-700" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">4.7/5 STARS AND 25,000+ REVIEWS</h3>
            <p className="text-sm text-gray-600 mb-4">You know you can trust us</p>
            <button className="text-gray-700 hover:text-gray-900 hover:underline text-sm font-medium transition-colors">
              Read reviews
            </button>
          </div>

          
          <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-md transition-shadow">
            <div className="mb-4">
              <RotateCcw className="w-8 h-8 text-gray-700" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">30-DAY FREE RETURNS</h3>
            <p className="text-sm text-gray-600 mb-4">Changed your mind? No problem</p>
            <button className="text-gray-700 hover:text-gray-900 hover:underline text-sm font-medium transition-colors">
              Learn more
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
