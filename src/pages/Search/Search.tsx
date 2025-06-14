import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import AxiosClient from '@/config/axios';

import SocietyCard from '../../Shared_Components/societies/SocietyCard';
import EventCard from '../../pages/Events/Components/EventCard';

interface Society {
  ID: string;
  Name: string;
  Description: string;
  Category: string;
  Image: string;
}

interface Event {
  ID: string;
  Title: string;
  Date: string;
  Time: string;
  Description: string;
  Category: string;
  Location: string;
  Image: string;
}

export default function Search() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');

  const [societies, setSocieties] = useState<Society[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  const searchSocieties = async () => {
    const loadingToastId = toast.loading('Searching in societies...');
    try {
      const res = await AxiosClient.get('/societies/search_society', {
        params: { search_term: query },
      });

      if (res.status === 201) {
        setSocieties(res.data.data);
        toast.success('Finished searching for societies.', { id: loadingToastId });
      }
    } catch (error) {
      toast.error('Failed to search societies.', { id: loadingToastId });
    }
  };

  const searchEvents = async () => {
    const loadingToastId = toast.loading('Searching in events...');
    try {
      const res = await AxiosClient.get('/events/search_event', {
        params: { search_term: query },
      });

      if (res.status === 201) {
        setEvents(res.data.data);
        toast.success('Finished searching for events.', { id: loadingToastId });
      }
    } catch (error) {
      toast.error('Failed to search events.', { id: loadingToastId });
    }
  };

  useEffect(() => {
    if (query) {
      searchSocieties();
      searchEvents();
    }
  }, [query]);

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Societies Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Societies</h2>
          {societies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {societies.map((society) => (
                <SocietyCard key={society.ID} {...society} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No societies found.</p>
          )}
        </section>

        {/* Events Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Events</h2>
          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event.ID} {...event} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No events found.</p>
          )}
        </section>
      </div>
    </main>
  );
}