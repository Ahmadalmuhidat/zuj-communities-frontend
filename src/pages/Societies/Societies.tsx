import { Link } from 'react-router-dom';
import SocietyCard from '../../Shared_Components/societies/SocietyCard';
import { useAuth } from '@/context/Auth_Context';
import AxiosClient from '@/config/axios';
import { useEffect, useState } from 'react';

interface Society {
  ID: string;
  Name: string;
  Description: string;
  Category: string,
  Image: string
}

export default function Societies() {
  const [societies, setSocieties] = useState<Society[]>([]);
  const { isAuthenticated } = useAuth();

  const getSocieties = async () => {
    const res = await AxiosClient.get("/societies/get_all_societies", {
      params: {
        token: localStorage.getItem("token")
      }
    })

    if (res.status == 200) {
      setSocieties(res.data.data)
    }
  };

  useEffect(() => {
    getSocieties();
  }, []);

  return (
    <>
      <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Student Societies</h1>
            {isAuthenticated ? (
              <Link
                to="/societies/new"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Society
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Login to Create
              </Link>
            )}
          </div>

          {/* Regular Societies */}
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {societies.map((society) => (
                <SocietyCard
                  key={society.ID}
                  {...society}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
