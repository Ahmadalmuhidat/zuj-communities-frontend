import React from 'react';
import { useNavigate } from 'react-router-dom';

type EventCardProps = {
  ID: string;
  Title: string;
  Date: string;
  Time: string;
  Description: string;
  Category: string;
  Location: string;
  Image: string;
};

export default function EventCard(props: EventCardProps) {
  const navigate = useNavigate();

  const formattedDate = new Date(props.Date).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const handleClick = () => {
    navigate(`/events/${props.ID}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-2xl overflow-hidden shadow-md group transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 cursor-pointer max-w-md mx-auto"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={props.Image}
          alt={props.Title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-4 flex gap-4">
        <div className="flex flex-col items-center justify-center bg-indigo-100 rounded-xl px-3 py-2 text-indigo-700">
          <span className="text-xs font-semibold">{props.Time}</span>
          <span className="text-sm font-bold">{formattedDate}</span>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-700 transition duration-300">{props.Title}</h3>
          <p className="text-sm text-gray-600 mt-1">{props.Description}</p>
          <div className="text-xs text-gray-500 mt-2">
            📍 {props.Location} &nbsp;|&nbsp; 🏷️ {props.Category}
          </div>
        </div>
      </div>
    </div>
  );
}
