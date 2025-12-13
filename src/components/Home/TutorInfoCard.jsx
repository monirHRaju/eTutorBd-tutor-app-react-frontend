import React from "react";
import { Link } from "react-router";


export default function TutorInfoCard({ tutor }) {


  return (
    <div className="mx-auto">
      <div className="card bg-base-100 shadow-lg rounded-2xl overflow-hidden">
        <div className="h-20 bg-linear-to-b from-sky-100 to-transparent relative">
        </div>

        <div className="card-body items-center text-center pt-0">
          <div className="-mt-10">
            <div className="avatar">
              <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                {tutor?.photoURL ? (
                  <img src={tutor.photoURL} alt={tutor.name} />
                ) : (
                  <div className="w-20 h-20 flex items-center justify-center bg-gray-100 text-gray-700 rounded-full">
                    {tutor?.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                )}
              </div>
            </div>
          </div>

          <h3 className="text-lg font-semibold">{tutor?.name}</h3>
          <p className="text-sm text-muted">{tutor?.role} · {tutor?.shortInfo}</p>

          <div className="w-full mt-4 bg-base-200 rounded-xl p-3 flex justify-between text-center">
            <div>
              <div className="font-semibold">{5}</div>
              <div className="text-xs text-muted">Experience</div>
            </div>

            <div>
              <div className="font-semibold">MBA</div>
              <div className="text-xs text-muted">Education</div>
            </div>

            <div>
              <div className="font-semibold">{21}</div>
              <div className="text-xs text-muted">Students</div>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <button className="btn btn-sm">Message</button>
            <Link to={'tutor-profile'} className="btn btn-outline btn-sm">Info</Link>
            <div className="text-sm text-muted ml-2">{tutor?.district}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
