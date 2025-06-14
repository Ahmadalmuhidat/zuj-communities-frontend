import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Search_Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-white py-4 border-b shadow-sm">
      <div className="container mx-auto px-4 flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo.jpg"
            alt="Society Logo"
            className="w-16 h-16 rounded-full object-cover"
          />
          <span className="text-2xl font-extrabold text-gray-900">Society</span>
        </Link>

        <form onSubmit={handleSearch} className="relative flex-grow max-w-xl ml-auto">
          <input
            type="text"
            placeholder="Search for events or societies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-12 py-2 rounded-md bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          {/* Search Icon (left inside input) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute left-3 top-2.5 text-gray-400 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>

          {/* Clear Button */}
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-10 top-2.5 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            aria-label="Submit search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>
      </div>
    </header>
  );
}
