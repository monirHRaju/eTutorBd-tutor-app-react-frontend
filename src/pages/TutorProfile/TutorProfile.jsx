import { FaStar, FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

const TutorProfile = () => {
  const tutor = {
    name: "Jeremy Rose",
    role: "English Tutor",
    rating: 4.3,
    reviews: 86,
    photo: "https://i.pravatar.cc/300",
    email: "tutor@email.com",
    phone: "+880 1234-567890",
    district: "Barishal",
    location: "Barishal City",
    subjects: ["English Grammar", "Spoken English", "IELTS"],
    classes: ["Class 6", "Class 7", "Class 8"],
    experience: "5+ Years",
    bio: "Passionate English tutor helping students improve grammar, confidence, and communication skills.",
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={tutor.photo}
              alt="Tutor"
              className="w-40 h-40 rounded-xl object-cover"
            />

            <div className="flex-1">
              <h2 className="text-2xl font-bold">{tutor.name}</h2>
              <p className="text-primary font-medium">{tutor.role}</p>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <span className="font-semibold">{tutor.rating}</span>
                <div className="flex text-warning">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  ({tutor.reviews} reviews)
                </span>
              </div>

              {/* Actions */}
              <div className="mt-4 flex gap-3">
                <button className="btn btn-primary btn-sm">
                  Send Message
                </button>
                <button className="btn btn-outline btn-sm">
                  Hire Tutor
                </button>
              </div>
            </div>
          </div>

          <div className="divider" />

          {/* Info Section */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left */}
            <div>
              <h3 className="font-semibold mb-2">Contact Information</h3>
              <p className="flex items-center gap-2">
                <FaEnvelope /> {tutor.email}
              </p>
              <p className="flex items-center gap-2 mt-1">
                <FaPhone /> {tutor.phone}
              </p>
              <p className="flex items-center gap-2 mt-1">
                <FaMapMarkerAlt /> {tutor.location}, {tutor.district}
              </p>
            </div>

            {/* Right */}
            <div>
              <h3 className="font-semibold mb-2">Basic Information</h3>
              <p><b>Experience:</b> {tutor.experience}</p>
              <p className="mt-1">
                <b>Classes:</b> {tutor.classes.join(", ")}
              </p>
            </div>
          </div>

          <div className="divider" />

          {/* Subjects */}
          <div>
            <h3 className="font-semibold mb-2">Subjects</h3>
            <div className="flex flex-wrap gap-2">
              {tutor.subjects.map((sub, i) => (
                <span key={i} className="badge badge-outline">
                  {sub}
                </span>
              ))}
            </div>
          </div>

          <div className="divider" />

          {/* About */}
          <div>
            <h3 className="font-semibold mb-2">About Tutor</h3>
            <p className="text-gray-600">{tutor.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;
