// hooks/useSocietyMembership.ts
import { useEffect, useState } from 'react';
import Axios_Client from '@/config/axios';
import { useAuth } from '@/context/Auth_Context';
import { useParams } from 'react-router-dom';

export function SocietyMembership() {
  const { user, isAuthenticated } = useAuth();
  const [isMember, setIsMember] = useState<boolean>(false);
  const { id: societyId } = useParams<{ id: string }>();

  useEffect(() => {
    const checkMembership = async () => {
      if (!localStorage.getItem("token") || !isAuthenticated || !user) {
        setIsMember(false);
        return;
      }

      try {
        const response = await Axios_Client.get('/societies/check_membership', {
          params: {
            token: localStorage.getItem("token"),
            society_id: societyId
          }
        });

        if (response.status == 201) {
          setIsMember(response.data.data ?? false);
        }
      } catch (err) {
        console.error('Error checking society membership:', err);
        setIsMember(false);
      }
    };

    checkMembership();
  }, [localStorage.getItem("token"), isAuthenticated, user]);

  return { isMember };
}
