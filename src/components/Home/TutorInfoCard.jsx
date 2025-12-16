import { Link, useParams } from "react-router";
import {
  FaMapMarkerAlt,
  FaVenusMars,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { MdAttachMoney, MdSchool } from "react-icons/md";

export default function TutorInfoCard({tutor}) {
  if (!tutor) return null;

  const {
    name,
    photoURL,
    education,
    experience,
    expectedSalary,
    daysPerWeek,
    preferredMedium,
    location,
    gender,
  } = tutor;

  return (
    <div className="mx-auto">
      <div className="card bg-base-100 shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition">
        {/* Header */}
        <div className="h-24 bg-gradient-to-r from-sky-100 to-indigo-100 relative">
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
            <div className="avatar">
              <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 bg-white">
                {photoURL ? (
                  <img src={photoURL} alt={name} />
                ) : (
                  <div className="w-20 h-20 flex items-center justify-center font-semibold text-lg">
                    {name
                      ?.split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="card-body items-center text-center pt-14">
          <h3 className="text-lg font-semibold">{name}</h3>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FaMapMarkerAlt />
            <span>{location}</span>
            <span>•</span>
            <FaVenusMars />
            <span>{gender}</span>
          </div>

          {/* Quick Stats */}
          <div className="w-full mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="bg-base-200 rounded-xl p-2">
              <p className="font-semibold text-sm">{experience}</p>
              <p className="text-xs text-gray-500">Experience</p>
            </div>

            <div className="bg-base-200 rounded-xl p-2">
              <p className="font-semibold text-sm">{education}</p>
              <p className="text-xs text-gray-500">Education</p>
            </div>

            <div className="bg-base-200 rounded-xl p-2">
              <p className="font-semibold text-sm">{daysPerWeek}</p>
              <p className="text-xs text-gray-500">Days/Week</p>
            </div>
          </div>

          {/* Preferences */}
          <div className="mt-4 w-full space-y-2 text-sm text-left">
            <div className="flex items-center gap-2">
              <FaChalkboardTeacher className="text-primary" />
              <span className="truncate">
                <strong>Medium:</strong> {preferredMedium}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <MdAttachMoney className="text-primary" />
              <span>
                <strong>Expected Salary:</strong> ৳{expectedSalary}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 flex gap-3">
            <Link
              to={`/tutor-profile/${tutor._id}`}
              className="btn btn-outline btn-sm"
            >
              View Profile
            </Link>
            <button className="btn btn-secondary btn-sm">
              Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
