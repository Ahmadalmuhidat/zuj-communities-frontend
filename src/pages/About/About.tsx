export default function About() {
  return (
    <>
      <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">About Society</h1>
          
          {/* Hero Section */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Society is a vibrant social media platform designed to connect students, faculty, and community members 
              through shared interests, events, and meaningful interactions. We believe in fostering a sense of 
              belonging and creating opportunities for personal and professional growth.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our platform serves as a digital hub where societies can thrive, events can be discovered, and 
              lasting connections can be formed. Whether you're looking to join a photography club, attend a 
              tech conference, or start your own society, we're here to make it happen.
            </p>
          </div>

          {/* Features Section */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Society Management</h3>
                  <p className="text-gray-600">Create and manage societies with ease. Organize members, share updates, and build communities.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Event Discovery</h3>
                  <p className="text-gray-600">Find exciting events happening around campus and in your community. Never miss out on opportunities.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Social Networking</h3>
                  <p className="text-gray-600">Connect with like-minded individuals, share experiences, and build lasting friendships.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-orange-100 p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Innovation Hub</h3>
                  <p className="text-gray-600">Access research labs, collaborate on projects, and be part of cutting-edge innovations.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          {/* <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Our Community</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-600">Active Societies</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">2,500+</div>
                <div className="text-gray-600">Community Members</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">200+</div>
                <div className="text-gray-600">Monthly Events</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">15+</div>
                <div className="text-gray-600">Research Labs</div>
              </div>
            </div>
          </div> */}

          {/* Contact Section */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get In Touch</h2>
            <p className="text-gray-600 mb-6">
              Have questions or suggestions? We'd love to hear from you! Our team is always working to improve 
              the platform and make it better for our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="/support" 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                Contact Support
              </a>
              <a 
                href="mailto:hello@society.com" 
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors text-center"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 