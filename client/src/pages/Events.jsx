import { useEffect, useState } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { rsvpEvent } from '../api/events'; // ✅ import rsvp API

const dummyEvents = [
  {
    id: 1,
    title: 'Alumni Meet 2025',
    date: '2025-08-15',
    location: 'IIT Bombay Campus',
    image: '/assets/event1.jpg',
  },
  {
    id: 2,
    title: 'Tech Talk: Future of AI',
    date: '2025-07-10',
    location: 'Zoom Webinar',
    image: '/assets/event2.jpg',
  },
  {
    id: 3,
    title: 'Startup Pitch Night',
    date: '2025-09-05',
    location: 'Mumbai Incubator Hub',
    image: '/assets/event3.jpg',
  },
];

const Events = () => {
  const [events, setEvents] = useState([]);
  const { user, token } = useAuth(); // ✅ get token
  const navigate = useNavigate();

  useEffect(() => {
    setEvents(dummyEvents); // Later: replace with real fetch
  }, []);

  const handleRSVP = async (eventId) => {
    if (!user || !token) {
      navigate('/login');
      return;
    }

    try {
      const response = await rsvpEvent(eventId, 'going', token); // ✅ call backend
      alert(response.message || `RSVP successful for event #${eventId}`);
    } catch (err) {
      console.error('RSVP failed:', err);
      alert('Could not RSVP. Please try again later.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Upcoming Events</h1>

      {events.length === 0 ? (
        <p className="text-gray-600">No upcoming events at the moment.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition hover:shadow-xl"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold text-blue-700 mb-2">
                  {event.title}
                </h2>

                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(event.date).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  {event.location}
                </div>

                <button
                  onClick={() => handleRSVP(event.id)}
                  className="mt-auto bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700 transition"
                >
                  RSVP
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;