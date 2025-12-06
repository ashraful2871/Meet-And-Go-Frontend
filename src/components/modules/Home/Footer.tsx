import { Calendar, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                <Calendar className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold text-gray-900">Meet & Go</span>
            </div>
            <p className="mb-4 text-sm text-gray-600">
              Connect with like-minded people for amazing events and
              experiences.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-200 text-gray-600 transition-colors hover:bg-blue-600 hover:text-white"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-200 text-gray-600 transition-colors hover:bg-blue-600 hover:text-white"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-200 text-gray-600 transition-colors hover:bg-blue-600 hover:text-white"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-200 text-gray-600 transition-colors hover:bg-blue-600 hover:text-white"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-600 transition-colors hover:text-blue-600"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 transition-colors hover:text-blue-600"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 transition-colors hover:text-blue-600"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 transition-colors hover:text-blue-600"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-600 transition-colors hover:text-blue-600"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 transition-colors hover:text-blue-600"
                >
                  Safety
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 transition-colors hover:text-blue-600"
                >
                  Community Guidelines
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 transition-colors hover:text-blue-600"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-600 transition-colors hover:text-blue-600"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 transition-colors hover:text-blue-600"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 transition-colors hover:text-blue-600"
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 transition-colors hover:text-blue-600"
                >
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t pt-8 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Meet & Go. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
