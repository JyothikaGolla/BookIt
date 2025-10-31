import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
// @ts-ignore
import hdLogo from '../assets/highway_delite.jpg';
import BookItLogo from '../assets/BookIt.jpg';

export default function Header() {
  useEffect(() => {
    document.title = 'BookIt: Experiences & Slots';
    // Set favicon to BookIt.jpg
    const favicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
    if (favicon) {
      favicon.href = BookItLogo as string;
    } else {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.href = BookItLogo as string;
      document.head.appendChild(link);
    }
  }, []);
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Mock suggestions - replace with real API call
  const getSuggestions = (value: string) => {
    const mockSuggestions = [
      'Kayaking',
      'Sunrise',
      'Coffee',
      'Balloon',
      'Pottery',
      'Wildlife',
      'Cycling',
      'Forest',
      'Food',
      'Photography',
      'Mountain',
      'Desert',
      'City',
      'River',
      'Tea',
      'Cultural'
    ];
    
    return mockSuggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.length > 1) {
      setSuggestions(getSuggestions(value));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearch = (query: string = searchQuery) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="flex items-center justify-between w-full gap-8">
          <Link to="/" className="flex items-center flex-shrink-0">
            <img 
              src={hdLogo}
              alt="Highway Delite"
              className="logo"
            />
          </Link>
          {/* Move search bar to right side */}
          <div className="max-w-2xl w-full" ref={searchRef}>
            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Search experiences"
                  className="w-full pl-10 pr-24 py-2.5 rounded-lg bg-gray-50 border border-gray-200 
                    focus:outline-none focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent
                    text-gray-800 placeholder:text-gray-500"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <button
                onClick={() => handleSearch()}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 
                  bg-[#FFD60A] text-black font-medium rounded-md hover:bg-[#FFE44D] 
                  transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!searchQuery.trim()}
              >
                Search
              </button>
              {/* Search Suggestions */}
              {showSuggestions && suggestions.length > 0 ? (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg shadow-lg 
                  border border-gray-100 py-2 z-50">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700
                        flex items-center gap-2 transition-colors"
                      onClick={() => {
                        setSearchQuery(suggestion);
                        handleSearch(suggestion);
                      }}
                    >
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      {suggestion}
                    </button>
                  ))}
                </div>
              ) : !searchQuery && showSuggestions && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg shadow-lg 
                  border border-gray-100 p-4 z-50">
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">Trending Experiences</h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Street Food Tour",
                        "Temple Walk",
                        "Photography Workshop",
                        "Cooking Class"
                      ].map((trend, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSearchQuery(trend);
                            handleSearch(trend);
                          }}
                          className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 
                            text-gray-700 rounded-full transition-colors"
                        >
                          {trend}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">Popular Categories</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { name: "Food & Drinks", icon: "🍽️" },
                        { name: "Adventure", icon: "🏃‍♂️" },
                        { name: "Cultural", icon: "🏛️" },
                        { name: "Photography", icon: "📸" },
                        { name: "Cooking", icon: "👨‍🍳" },
                        { name: "Heritage", icon: "🏰" }
                      ].map((category, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSearchQuery(category.name);
                            handleSearch(category.name);
                          }}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 
                            hover:bg-gray-50 rounded-md transition-colors text-left"
                        >
                          <span className="text-lg">{category.icon}</span>
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}