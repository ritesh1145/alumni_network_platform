import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-blue-700 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Connect. Collaborate. Celebrate.
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Join our Alumni Network and stay connected with your community.
          </p>
          <Link
            to="/register"
            className="bg-white text-blue-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
          >
            Join Now
          </Link>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-blue-700 mb-6">
            <span role="img" aria-label="calendar">📅</span> Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Alumni Meetup', 'Tech Talk', 'Career Fair'].map((event, i) => (
              <div key={i} className="bg-white shadow-lg rounded-xl p-5">
                <h3 className="font-semibold text-lg mb-2">{event}</h3>
                <p className="text-sm text-gray-600">Date: July {10 + i}, 2025</p>
                <p className="text-sm text-gray-600">Location: Campus Hall</p>
                <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition">
                  RSVP
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Jobs */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-blue-700 mb-6">
            <span role="img" aria-label="briefcase">💼</span> Latest Job Opportunities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Frontend Developer', 'Product Manager', 'Data Analyst'].map((job, i) => (
              <div key={i} className="bg-white border border-gray-200 shadow-md rounded-xl p-5">
                <h3 className="font-semibold text-lg">{job}</h3>
                <p className="text-sm text-gray-600">Company: TechCorp {i + 1}</p>
                <p className="text-sm text-gray-600">Location: Remote</p>
                <a
                  href="#"
                  className="mt-4 inline-block text-blue-600 hover:underline text-sm"
                >
                  Apply Now →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notable Alumni */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-blue-700 mb-6">
            <span role="img" aria-label="alumni">🧑‍🎓</span> Notable Alumni
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {['Amit Raj', 'Sara Thomas', 'Vikram Kapoor'].map((name, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow p-5 flex items-center space-x-4"
              >
                <img
                  src={`https://i.pravatar.cc/100?img=${i + 10}`}
                  alt={name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-md">{name}</h4>
                  <p className="text-sm text-gray-600">Founder, StartupX</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;