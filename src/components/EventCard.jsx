// src/components/EventCard.jsx
import { format } from 'date-fns';

const EventCard = ({ event, onRSVP, showRSVP = false }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Date:</span>{' '}
              {format(new Date(event.date), 'MMMM d, yyyy')}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Location:</span> {event.location}
            </p>
          </div>
          {showRSVP && (
            <button
              onClick={() => onRSVP(event.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                event.rsvp
                  ? 'bg-green-100 text-green-800'
                  : 'bg-blue-100 text-blue-800'
              }`}
            >
              {event.rsvp ? 'Attending' : 'RSVP'}
            </button>
          )}
        </div>
        <p className="mt-4 text-gray-700">{event.description}</p>
      </div>
    </div>
  );
};

export default EventCard;