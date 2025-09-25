'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../../lib/authService';
import { Button } from '@/components/ui/button';
import SuccessPopup from '../../components/SuccessPopup';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'buyer' as 'artisan' | 'buyer',
    preferredLanguage: 'en'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.register(formData);
      setShowSuccess(true);
    } catch (error: any) {
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="text-3xl font-bold text-center">Sign Up</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-3 border rounded-md bg-white text-black"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-3 border rounded-md bg-white text-black"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full p-3 border rounded-md bg-white text-black"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value as 'artisan' | 'buyer'})}
              className="w-full p-3 border rounded-md bg-white text-black"
            >
              <option value="buyer">Buyer</option>
              <option value="artisan">Artisan (Seller)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Preferred Language</label>
            <select
              value={formData.preferredLanguage}
              onChange={(e) => setFormData({...formData, preferredLanguage: e.target.value})}
              className="w-full p-3 border rounded-md bg-white text-black"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="bn">Bengali</option>
              <option value="te">Telugu</option>
              <option value="mr">Marathi</option>
              <option value="ta">Tamil</option>
            </select>
          </div>
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </Button>
          
          <div className="text-center">
            <button
              type="button"
              onClick={() => router.push('/login')}
              className="text-blue-600 hover:underline"
            >
              Already have an account? Sign in
            </button>
          </div>
        </form>
      </div>
      
      <SuccessPopup
        isOpen={showSuccess}
        title="Registration Successful!"
        message="Your account has been created. Please login with your credentials."
        onClose={() => {
          setShowSuccess(false);
          router.push('/login');
        }}
      />
    </div>
  );
}