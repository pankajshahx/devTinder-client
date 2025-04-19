import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  console.log("Connections:", connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      if (res.data?.data) {
        dispatch(addConnections(res.data.data));
      }
    } catch (error) {
      console.error("Failed to fetch connections:", error.message);
    }
  };

  useEffect(() => {
    if (!connections || connections.length === 0) {
      fetchConnections();
    }
  }, []);

  if (!connections) return null;

  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-10">Connections</h1>
      {connections.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-6 p-6">
          {connections.map((connection) => (
            <div
              key={connection._id}
              className="w-96 rounded-xl overflow-hidden shadow-lg bg-white"
            >
              <img
                src={connection?.photoUrl || "/default-profile.png"}
                alt={connection?.firstName || "User"}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {connection?.firstName}
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  {connection?.about || ""}
                </p>
                <div className="text-right">
                  <button className="bg-violet-600 text-white text-sm px-4 py-2 rounded hover:bg-violet-700 transition">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-xl">No connections found.</p>
      )}
    </div>
  );
};

export default Connections;
