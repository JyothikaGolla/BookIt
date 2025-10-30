import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { BookingData, PromoResponse } from '../types'
import Header from '../components/Header'

export default function Checkout() {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // Remove phone field for design match
  const [promo, setPromo] = useState('');
  const [promoResult, setPromoResult] = useState<PromoResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [applyingPromo, setApplyingPromo] = useState(false);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem('checkout');
    if (saved) {
      try {
        const data = JSON.parse(saved) as BookingData;
        setBookingData(data);
      } catch (err) {
        console.error('Invalid checkout data:', err);
      }
    }
  }, []);

  if (!bookingData) {
    return (
      <div className="container">
        <div className="card">
          <h2 className="text-xl font-semibold text-red-600">No Booking Selected</h2>
          <p className="mt-4">You haven't selected an experience to book.</p>
          <Link to="/" className="btn mt-4 inline-block">
            Browse Experiences
          </Link>
        </div>
      </div>
    );
  }

  const { experience, slot } = bookingData;

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!name.trim()) {
      errors.name = 'Name is required';
    }
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const applyPromo = async () => {
    if (!promo.trim()) return;
    setApplyingPromo(true);
    try {
      const res = await axios.post<PromoResponse>('http://localhost:4000/promo/validate', { code: promo });
      setPromoResult(res.data);
    } catch (err) {
      setPromoResult({ valid: false });
    } finally {
      setApplyingPromo(false);
    }
  };

  const calculatePrice = () => {
    const basePrice = experience.price;
    if (!promoResult?.valid) return basePrice;
    
    if (promoResult.discountType === 'percent') {
      return Math.max(0, basePrice - (basePrice * (promoResult.amount || 0) / 100));
    } else {
      return Math.max(0, basePrice - (promoResult.amount || 0));
    }
  };

  const submit = async () => {
    // Validate form fields
    let errors: any = {};
    if (!name.trim()) {
      errors.name = 'Name is required';
    }
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = 'Enter a valid email';
    }
    if (!agreed) {
      errors.terms = 'You must agree to the terms';
    }
    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:4000/bookings', {
        experienceId: experience._id,
        slotId: slot.id,
        user: { name, email }
      });
      if (res.data.success) {
        sessionStorage.setItem('bookingResult', JSON.stringify(res.data));
        navigate('/result');
      } else {
        throw new Error(res.data.error || 'Booking failed');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.message || 'An error occurred';
      setValidationErrors((prev: any) => ({ ...prev, submit: errorMessage }));
    } finally {
      setLoading(false);
    }
  };

  const price = calculatePrice();
  const savings = experience.price - price;

  return (
    <>
      <Header />
      <div className="container mx-auto py-8">
        <div className="mb-6">
          <Link to={`/experiences/${experience._id}`} className="text-gray-700 hover:text-indigo-800">
            ← Checkout
          </Link>
        </div>
        <div className="flex justify-center">
          <div className="bg-white rounded-lg shadow-md flex gap-8 p-8" style={{ width: 1100 }}>
            {/* Left: Form */}
            <div style={{ width: 500 }}>
              <form onSubmit={e => {e.preventDefault(); submit();}}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className={`w-full min-w-[240px] px-4 py-2 border ${validationErrors.name ? 'border-red-500' : 'border-gray-300'} rounded bg-gray-100 text-base`}
                      placeholder="Your name"
                    />
                    {validationErrors.name && <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>}
                  </div>
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className={`w-full min-w-[240px] px-4 py-2 border ${validationErrors.email ? 'border-red-500' : 'border-gray-300'} rounded bg-gray-100 text-base`}
                      placeholder="Your name"
                    />
                    {validationErrors.email && <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>}
                  </div>
                </div>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={promo}
                    onChange={e => setPromo(e.target.value.toUpperCase())}
                    className="flex-1 min-w-[240px] px-4 py-2 border border-gray-300 rounded bg-gray-100 text-base"
                    placeholder="Promo code"
                  />
                  <button
                    type="button"
                    onClick={applyPromo}
                    disabled={applyingPromo || !promo.trim()}
                    className="px-6 py-2 bg-black text-white font-medium rounded hover:bg-gray-800 disabled:opacity-50 text-base"
                  >
                    {applyingPromo ? 'Applying...' : 'Apply'}
                  </button>
                </div>
                {promoResult && (
                  <div className={`mb-2 text-xs ${promoResult.valid ? 'text-green-600' : 'text-red-500'}`}> 
                    {promoResult.valid
                      ? `Promo code applied! ${promoResult.discountType === 'percent' 
                          ? `${promoResult.amount}% off` 
                          : `₹${promoResult.amount} off`}`
                      : 'Invalid promo code'}
                  </div>
                )}
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="terms"
                    className={`mr-2 ${validationErrors.terms ? 'border-red-500' : ''}`}
                    checked={agreed}
                    onChange={e => setAgreed(e.target.checked)}
                  />
                  <label htmlFor="terms" className="text-xs text-gray-700">I agree to the terms and safety policy</label>
                </div>
                {validationErrors.terms && <p className="text-red-500 text-xs mb-2">{validationErrors.terms}</p>}
                {/* Remove Pay and Confirm button from here */}
                {validationErrors.submit && <p className="text-red-500 text-xs mt-2">{validationErrors.submit}</p>}
              </form>
            </div>
            {/* Right: Summary */}
            <div style={{ width: 500 }}>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="mb-4">
                  <div className="flex justify-between text-gray-600 mb-2">
                    <span>Experience</span>
                    <span className="font-semibold text-gray-900">{experience.title}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 mb-2">
                    <span>Date</span>
                    <span>{slot.date}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 mb-2">
                    <span>Time</span>
                    <span>{slot.time}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 mb-2">
                    <span>Qty</span>
                    <span>1</span>
                  </div>
                  <div className="flex justify-between text-gray-600 mb-2">
                    <span>Subtotal</span>
                    <span>₹{price}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 mb-2">
                    <span>Taxes</span>
                    <span>₹{Math.round(price * 0.06)}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-lg">₹{price + Math.round(price * 0.06)}</span>
                  </div>
                  {/* Pay and Confirm button on right, triggers form submit */}
                  <button
                    type="button"
                    onClick={() => submit()}
                    disabled={loading || !agreed || !name.trim() || !email.trim() || !/^\S+@\S+\.\S+$/.test(email)}
                    className={`w-full py-2 rounded font-semibold ${agreed && name.trim() && email.trim() && /^\S+@\S+\.\S+$/.test(email) ? 'bg-[#FFD60A] text-black hover:bg-yellow-400' : 'bg-gray-300 text-gray-600 cursor-not-allowed'} disabled:opacity-50`}
                  >
                    Pay and Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
