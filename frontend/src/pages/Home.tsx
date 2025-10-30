import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Experience } from '../types'
import Header from '../components/Header'

export default function Home() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
  axios.get('https://bookit-2-tugn.onrender.com/experiences')
      .then(r => {
        setExperiences(r.data);
        setError('');
      })
      .catch(() => {
        setError('Failed to load experiences. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="card">
                <div className="w-full h-40 bg-gray-200 rounded"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mt-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="card bg-red-50 border border-red-200">
          <h1 className="text-xl font-semibold text-red-800">Error</h1>
          <p className="text-red-600 mt-2">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container py-8">
        {experiences.length === 0 ? (
          <div className="card">
            <p className="text-gray-600">No experiences available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {experiences.map(exp => (
                <div key={exp._id} className="card p-0 overflow-hidden">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="font-semibold text-lg mb-1">{exp.title}</h2>
                      <span className="text-xs bg-gray-100 rounded px-2 py-1 text-gray-700">{exp.location}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{exp.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <span className="text-sm text-gray-500">From</span>
                        <span className="text-xl font-bold ml-1">₹{exp.price}</span>
                      </div>
                      <Link to={`/experiences/${exp._id}`} className="bg-[#FFD60A] text-black px-4 py-2 rounded font-semibold hover:bg-yellow-300 transition-colors">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      <div className="container mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: '🌟',
              title: 'Curated Experiences',
              description: 'Hand-picked adventures that guarantee memorable moments.'
            },
            {
              icon: '🔒',
              title: 'Secure Booking',
              description: 'Safe and easy booking process with instant confirmation.'
            },
            {
              icon: '💎',
              title: 'Best Value',
              description: 'Competitive prices with exclusive promotional offers.'
            }
          ].map((feature, index) => (
            <div key={index} className="card text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}