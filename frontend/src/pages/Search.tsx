import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Experience } from '../types';
import Header from '../components/Header';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:4000/experiences/search?q=${encodeURIComponent(query)}`);
        setExperiences(res.data);
        setError('');
      } catch (err) {
        setError('Failed to fetch search results');
        setExperiences([]);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  return (
    <div>
      <Header />
      <div className="container">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="card animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="card bg-red-50 border-red-100">
            <p className="text-red-600">{error}</p>
          </div>
        ) : experiences.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">No experiences found</h2>
            <p className="text-gray-600">
              We couldn't find any experiences matching "{query}"
            </p>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-semibold mb-6">
              Search results for "{query}"
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {experiences.map(experience => (
                <div key={experience._id} className="card card-hover-effect">
                  <img 
                    src={experience.image} 
                    alt={experience.title}
                    className="card-image"
                  />
                  <div className="card-content">
                    <h3 className="font-semibold text-xl mb-2">{experience.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{experience.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-indigo-600">
                        ₹{experience.price}
                      </span>
                      <Link 
                        to={`/experiences/${experience._id}`}
                        className="btn"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}