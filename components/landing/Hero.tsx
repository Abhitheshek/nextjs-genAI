'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AuthUser } from "../../lib/authService";

interface HeroProps {
  user: AuthUser | null;
}

export default function Hero({ user }: HeroProps) {
  return (
    <section className="relative py-10 bg-white overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(138, 180, 248, 0.1) 1px, transparent 55px),
            linear-gradient(90deg, rgba(138, 180, 248, 0.1) 1px, transparent 55px)
          `,
          backgroundSize: '50px 50px'
        }}
      ></div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-4 sm:mb-6">
          <span className="text-xs sm:text-sm font-medium text-blue-700">Trusted by 10,000+ artisans</span>
        </div>
        
        <h1 className="text-5xl sm:text-5xl lg:text-7xl font-semibold text-black mb-4 sm:mb-6 leading-tight tracking-tight">
          The Future of
          <br />
          <span className="font-semibold text-blue-600">Artisan Commerce</span>
        </h1>
        
        <p className="text-base sm:text-lg lg:text-xl text-gray-500 mb-8 sm:mb-14 max-w-2xl mx-auto leading-relaxed font-light px-4">
          Connect authentic artisans with global customers through our AI-powered marketplace. 
          Streamline operations and grow your craft business.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-20 px-4">
          {user ? (
            <>
              <Link href={user.role === 'artisan' ? '/seller' : '/buyer'}>
                <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-medium rounded-lg">
                  <span className="sm:hidden">{user.role === 'artisan' ? 'Dashboard' : 'dashboard'}</span>
                  <span className="hidden sm:inline">{user.role === 'artisan' ? 'Seller Dashboard' : 'Browse Marketplace'}</span>
                </Button>
              </Link>
              <Link href={user.role === 'artisan' ? '/seller' : '/buyer'}>
                <Button size="lg" variant="outline" className="w-full sm:w-auto border border-gray-200 text-black hover:border-gray-300 px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-medium rounded-lg">
                  <span className="sm:hidden">{user.role === 'artisan' ? ' Sell' : 'Shop'}</span>
                  <span className="hidden sm:inline">{user.role === 'artisan' ? ' Start Selling' : 'Shop Products'}</span>
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-medium rounded-lg">
                  <span className="sm:hidden">Start Selling</span>
                  <span className="hidden sm:inline">Start Selling Today</span>
                </Button>
              </Link>
              <Link href="/buyer">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border border-gray-200 text-black hover:border-gray-300 px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-medium rounded-lg">
                  <span className="sm:hidden">Explore</span>
                  <span className="hidden sm:inline">Explore Marketplace</span>
                </Button>
              </Link>
            </>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 sm:gap-8 lg:gap-16 max-w-2xl mx-auto px-4">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-black mb-1 sm:mb-2">500+</div>
            <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider font-medium">Verified Artisans</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-black mb-1 sm:mb-2">10K+</div>
            <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider font-medium">Products Listed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-black mb-1 sm:mb-2">50K+</div>
            <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider font-medium">Happy Customers</div>
          </div>
        </div>
      </div>
    </section>
  );
}