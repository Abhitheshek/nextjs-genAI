'use client';

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-blue-100 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 sm:gap-12 lg:gap-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-black tracking-tight">ArtisanLux</h3>
            </div>
            <p className="text-black mb-8 sm:mb-10 max-w-md font-light leading-relaxed text-base sm:text-lg">
              The world's leading AI-powered marketplace connecting authentic artisans with global customers.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-black mb-6 sm:mb-8 text-base sm:text-lg">Platform</h4>
            <ul className="space-y-3 sm:space-y-5 text-black">
              <li><Link href="/marketplace" className="hover:text-blue-600 transition-colors font-light text-sm sm:text-base">Marketplace</Link></li>
              <li><Link href="/sellers" className="hover:text-blue-600 transition-colors font-light text-sm sm:text-base">For Sellers</Link></li>
              <li><Link href="/buyers" className="hover:text-blue-600 transition-colors font-light text-sm sm:text-base">For Buyers</Link></li>
              <li><Link href="/pricing" className="hover:text-blue-600 transition-colors font-light text-sm sm:text-base">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-black mb-8 text-lg">Resources</h4>
            <ul className="space-y-5 text-black">
              <li><Link href="/help" className="hover:text-blue-600 transition-colors font-light">Help Center</Link></li>
              <li><Link href="/guides" className="hover:text-blue-600 transition-colors font-light">Guides</Link></li>
              <li><Link href="/api" className="hover:text-blue-600 transition-colors font-light">API</Link></li>
              <li><Link href="/blog" className="hover:text-blue-600 transition-colors font-light">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-black mb-8 text-lg">Company</h4>
            <ul className="space-y-5 text-black">
              <li><Link href="/about" className="hover:text-blue-600 transition-colors font-light">About</Link></li>
              <li><Link href="/careers" className="hover:text-blue-600 transition-colors font-light">Careers</Link></li>
              <li><Link href="/press" className="hover:text-blue-600 transition-colors font-light">Press</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600 transition-colors font-light">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-100 mt-12 sm:mt-20 pt-6 sm:pt-10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-black font-light text-sm sm:text-base">© 2024 ArtisanLux. All rights reserved.</p>
          <div className="flex gap-6 sm:gap-10 mt-4 sm:mt-6 md:mt-0">
            <Link href="/privacy" className="text-black hover:text-blue-600 transition-colors font-light text-sm sm:text-base">Privacy</Link>
            <Link href="/terms" className="text-black hover:text-blue-600 transition-colors font-light text-sm sm:text-base">Terms</Link>
            <Link href="/cookies" className="text-black hover:text-blue-600 transition-colors font-light text-sm sm:text-base">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}