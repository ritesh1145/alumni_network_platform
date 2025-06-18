// src/components/AdminEventCard.jsx
const AdminEventCard = ({ event, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
          <p className="text-gray-600 mb-1">
            <span className="font-medium">Date:</span> {new Date(event.date).toLocaleDateString()}
          </p>
          <p className="text-gray-600 mb-1">
            <span className="font-medium">Location:</span> {event.location}
          </p>
          <p className="text-gray-600 mb-1">
            <span className="font-medium">Organizer:</span> {event.organizer}
          </p>
        </div>
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:text-blue-800">Edit</button>
          <button
            onClick={() => onDelete(event.id)}
            className="text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      </div>
      <p className="mt-4 text-gray-700">{event.description}</p>
    </div>
  );
};

export default AdminEventCard;