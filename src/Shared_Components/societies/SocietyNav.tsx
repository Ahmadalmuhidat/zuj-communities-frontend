import { SocietyMembership } from '@/context/Membership_Context';
import { Link, useLocation } from 'react-router-dom';

interface SocietyNavProps {
  societyId: string;
}

export default function SocietyNav({ societyId }: SocietyNavProps) {
  const location = useLocation();
  const { isMember } = SocietyMembership();
  const basePath = `/societies/${societyId}`;

  // Conditionally include nav items based on membership
  const navItems = [
    { label: 'Timeline', path: basePath },
    { label: 'Events', path: `${basePath}/events` },
    { label: 'Members', path: `${basePath}/members` },
    // Show Join Requests and Settings only if member
    ...(isMember
      ? [
        { label: 'Join Requests', path: `${basePath}/join-requests` },
        { label: 'Settings', path: `${basePath}/settings` },
      ]
      : [])
  ];

  return (
    <nav className="flex space-x-6">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.label}
            to={item.path}
            className={`text-sm font-medium pb-2 ${isActive
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-600 hover:text-indigo-600'
              }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
