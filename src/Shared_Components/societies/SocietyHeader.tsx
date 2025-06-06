import React, { useEffect, useState } from 'react';
import SocietyNav from './SocietyNav';
import { useAuth } from '@/context/Auth_Context';
import Axios_Client from '@/config/axios';

interface SocietyHeaderProps {
  societyId: string;
  showJoinButton?: boolean;
  actionButton?: React.ReactNode;
}

export default function SocietyHeader({
  societyId,
  showJoinButton = false,
  actionButton,
}: SocietyHeaderProps) {
  const [details, setDetails] = useState<any>({});
  const { isAuthenticated } = useAuth();
  const [joinRequested, setJoinRequested] = useState(false);
  

  const getSocietyDetails = async () => {
    try {
      const res = await Axios_Client.get('/societies/get_society_info', {
        params: { society_id: societyId },
      });

      if (res.status === 200) {
        setDetails(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching society details:', error);
    }
  };

  const handleJoinSociety = async () => {
    if (!isAuthenticated) {
      // Redirect to login (add actual redirection logic if needed)
      return;
    }

    const res = await Axios_Client.post("/societies/join_society_request", {
      society_id: societyId,
      token: localStorage.getItem("token")
    })

    if (res.status == 200) {
      setJoinRequested(true);
    }
  };

  useEffect(() => {
    getSocietyDetails();
  }, []);

  return (
    <>
      {/* Cover Section */}
      <div className="relative h-64 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        <div className="relative max-w-6xl mx-auto px-4 h-full flex items-end pb-6">
          <div className="flex items-end space-x-6">
            <div className="w-32 h-32 bg-white rounded-lg shadow-lg overflow-hidden border-4 border-white">
              <img
                src={details.Image}
                alt={details.Name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://via.placeholder.com/128x128/3B82F6/ffffff?text=${encodeURIComponent(
                    details.Name?.charAt(0) || 'S'
                  )}`;
                }}
              />
            </div>
            <div className="text-white pb-2">
              <h1 className="text-4xl font-bold mb-2">{details.Name}</h1>
              <p className="text-lg opacity-90 mb-2">{details.Description}</p>
              <div className="flex items-center space-x-4 text-sm">
                {/* Uncomment below if needed in future */}
                {/* <span>{details.memberCount} members</span> */}
                {/* <span>•</span> */}
                {/* <span>Founded {details.founded}</span> */}
                {/* <span>•</span> */}
                <span>{details.Category}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation and Action Buttons */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <SocietyNav societyId={societyId} />
            <div className="flex space-x-3">
              {actionButton}
              {showJoinButton && isAuthenticated && (
                <button
                  onClick={handleJoinSociety}
                  disabled={joinRequested}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    joinRequested
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {joinRequested ? 'Request Sent' : 'Join Society'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
