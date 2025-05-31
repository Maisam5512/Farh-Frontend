export default function NewsletterSection() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-light text-gray-900 mb-4">Never miss a thing</h2>
            <p className="text-gray-600 leading-relaxed">
              Sign up for promotions, tailored new arrivals, stock updates and more – straight to your inbox
            </p>
          </div>

          <div>
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-4">GET UPDATES BY</h3>

              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="email"
                  className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-500"
                />
                <label htmlFor="email" className="ml-3 text-sm text-gray-700">
                  Email
                </label>
              </div>

              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent mb-4"
              />

              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="sms"
                  className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-500"
                />
                <label htmlFor="sms" className="ml-3 text-sm text-gray-700">
                  SMS
                </label>
              </div>

              <button className="w-1/3 bg-gray-900 text-white text-center py-3 px-6 rounded-md hover:bg-gray-800 transition-colors font-medium">
                Sign Up
              </button>

              <p className="text-xs text-gray-500 mt-4 leading-relaxed">
                By signing up, you consent to receiving marketing by email and/or SMS and acknowledge you have read our{" "}
                <button className="underline hover:no-underline">Privacy Policy</button>. You may unsubscribe at any
                time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
