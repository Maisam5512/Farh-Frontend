import { Mail, Phone } from "lucide-react"

export default function ContactSection() {
  return (
    <div className="w-full py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-light text-gray-900 mb-8">Contact us</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Mail className="w-6 h-6 text-gray-700" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">EMAIL US</h3>
                <p className="text-sm text-gray-600 mb-3">Get in touch by email</p>
                <a
                  href="mailto:customerservice@farfetch.com"
                  className="text-gray-700 hover:text-gray-900 hover:underline text-sm font-medium transition-colors"
                >
                  customerservice@farfetch.com
                </a>
              </div>
            </div>
          </div>

       
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Phone className="w-6 h-6 text-gray-700" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">ORDER BY PHONE</h3>
                <p className="text-sm text-gray-600 mb-3">Available Monday to Friday, 09:00 – 18:00 GMT</p>
                <a
                  href="tel:+16467913768"
                  className="text-gray-700 hover:text-gray-900 hover:underline text-sm font-medium transition-colors"
                >
                  +1 646 791 3768
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
