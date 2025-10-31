import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Experience, Slot } from '../types'
import Header from '../components/Header'

const Details: React.FC = () => {
  const { id } = useParams();
  const [experience, setExperience] = useState<Experience | null>(null);
  // Split slot selection into date and time
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
  axios.get(`https://bookit-2-tugn.onrender.com/experiences/${id}`) // backend URL is correct
      .then(r => {
        setExperience(r.data);
        setError('');
      })
      .catch((err) => {
        setError(err.response?.data?.error || 'Failed to load experience details');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="card animate-pulse">
            <div className="w-full h-64 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mt-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mt-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mt-2"></div>
            <div className="mt-6">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-16 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !experience) {
    return (
      <>
        <Header />
        <div className="container">
          <div className="card bg-red-50 border border-red-200">
            <h1 className="text-xl font-semibold text-red-800">Error</h1>
            <p className="text-red-600 mt-2">{error || 'Experience not found'}</p>
            <Link 
              to="/"
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 inline-block"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      <Header />
      <div className="container max-w-6xl mx-auto py-8">
        <Link to="/" className="text-gray-700 hover:text-indigo-800 mb-4 inline-block">
          ← Details
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left: Experience Info */}
          <div className="md:col-span-2">
            <img
              src={experience.image}
              alt={experience.title}
              className="w-full h-80 object-cover rounded-lg mb-6"
            />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{experience.title}</h1>
            <p className="text-gray-700 text-lg mb-6">{experience.description}</p>
            {/* Date Selection */}
            <div className="mb-4">
              <div className="font-semibold mb-2">Choose date</div>
              <div className="flex gap-2">
                {[...new Set(experience.slots.map(slot => slot.date))].map(date => (
                  <button
                    key={date}
                    onClick={() => {
                      setSelectedDate(date);
                      setSelectedTime(null);
                      setSelectedSlot(null);
                    }}
                    className={`px-4 py-2 rounded border text-sm font-medium transition-all
                      ${selectedDate === date ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-800'}
                      hover:bg-yellow-400`
                    }
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>
            {/* Time Selection */}
            <div className="mb-2">
              <div className="font-semibold mb-2">Choose time</div>
              <div className="flex gap-2 flex-wrap">
                {experience.slots.filter(slot => slot.date === selectedDate).map(slot => (
                  <button
                    key={slot.id + '-time'}
                    onClick={() => {
                      setSelectedTime(slot.time);
                      setSelectedSlot(slot);
                    }}
                    disabled={!slot.available}
                    className={`px-4 py-2 rounded border text-sm font-medium transition-all
                      ${selectedSlot?.id === slot.id ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-800'}
                      ${!slot.available ? 'opacity-60 cursor-not-allowed' : 'hover:bg-yellow-400'}
                    `}
                  >
                    {slot.time} {slot.available ? <span className="text-red-500 ml-1">{slot.capacity} left</span> : <span className="text-gray-500 ml-1">Sold out</span>}
                  </button>
                ))}
              </div>
              <div className="text-xs text-gray-500 mt-2">All times are in IST (GMT +5:30)</div>
            </div>
            {/* About Section */}
            <div className="mt-6">
              <div className="font-semibold mb-2">About</div>
              <div className="bg-gray-100 rounded px-4 py-2 text-gray-600 text-sm">Scenic routes, trained guides, and safety briefing. Minimum age 10.</div>
            </div>
          </div>
          {/* Right: Price Box */}
          <div className="md:col-span-1">
            <div className="bg-gray-100 rounded-lg p-6 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Starts at</span>
                <span className="font-bold text-gray-900">₹{experience.price}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Quantity</span>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 bg-gray-200 rounded" onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={quantity <= 1}>-</button>
                  <span className="font-medium">{quantity}</span>
                  <button className="px-2 py-1 bg-gray-200 rounded" onClick={() => setQuantity(q => q + 1)} disabled={quantity >= (selectedSlot?.capacity || 10)}>+</button>
                </div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹{experience.price * quantity}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Taxes</span>
                <span className="font-medium">₹{Math.round(experience.price * quantity * 0.06)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-lg">₹{experience.price * quantity + Math.round(experience.price * quantity * 0.06)}</span>
              </div>
              <button
                className={`w-full py-2 rounded font-semibold transition-all ${selectedSlot ? 'bg-yellow-500 text-black hover:bg-yellow-600' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
                disabled={!selectedSlot}
                onClick={() => {
                  if (!selectedSlot) return;
                  sessionStorage.setItem('checkout', JSON.stringify({
                    experience,
                    slot: selectedSlot,
                    quantity
                  }));
                  navigate('/checkout');
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
