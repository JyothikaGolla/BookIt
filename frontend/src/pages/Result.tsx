import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookingResponse } from '../types';
import Header from '../components/Header';

export default function Result() {
  const navigate = useNavigate();
  const [bookingResult, setBookingResult] = useState<BookingResponse | null>(null);

  useEffect(() => {
    const savedResult = sessionStorage.getItem('bookingResult');
    if (savedResult) {
      try {
        const data = JSON.parse(savedResult) as BookingResponse;
        setBookingResult(data);
      } catch (err) {
        console.error('Invalid booking result:', err);
      }
    } else {
      // If there's no booking result, redirect to home after a delay
      const timer = setTimeout(() => navigate('/'), 3000);
      return () => clearTimeout(timer);
    }
  }, [navigate]);

  if (!bookingResult) {
    return (
      <>
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed</h2>
          <p className="text-lg text-gray-700 mb-6">No Booking Information</p>
          <Link to="/" className="px-6 py-2 rounded bg-gray-200 text-gray-700 font-medium hover:bg-gray-300">Back to Home</Link>
        </div>
      </>
    );
  }

  if (!bookingResult.success) {
    return (
      <>
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Booking Failed</h2>
          <p className="text-lg text-gray-700 mb-6">{bookingResult.error || 'An error occurred during the booking process.'}</p>
          <Link to="/" className="px-6 py-2 rounded bg-gray-200 text-gray-700 font-medium hover:bg-gray-300">Back to Home</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed</h2>
        <p className="text-lg text-gray-700 mb-6">Ref ID: {bookingResult.booking?.confirmationId}</p>
        <Link to="/" className="px-6 py-2 rounded bg-gray-200 text-gray-700 font-medium hover:bg-gray-300">Back to Home</Link>
      </div>
    </>
  );
}
