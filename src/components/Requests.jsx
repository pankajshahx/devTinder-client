import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  console.log("Requests:", requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/request/received`, {
        withCredentials: true,
      });
      if (res.data?.data) {
        dispatch(addRequests(res.data.data));
      }
    } catch (error) {
      console.error("Failed to fetch requests:", error.message);
    }
  };

  const reviewRequest = async (requestId, status) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      console.log("Request reviewed:", res.data);
      dispatch(removeRequest(requestId));
    } catch (error) {
      console.error("Failed to review request:", error.message);
    }
  };

  useEffect(() => {
    if (!requests || requests.length === 0) {
      fetchRequests();
    }
  }, []);

  if (!requests) return null;

  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-10">Requests</h1>
      {requests.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-6 p-6">
          {requests.map((request) => {
            const { _id, firstName, about, photoUrl } =
              request?.fromUserId || {};
            return (
              <div
                key={request._id}
                className="w-96 rounded-xl overflow-hidden shadow-lg bg-white"
              >
                <img
                  src={photoUrl || "/default-profile.png"}
                  alt={firstName || "User"}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {firstName}
                  </h2>
                  <p className="text-sm text-gray-500 mb-4">{about || ""}</p>
                  <div className="text-right m-5 p-3">
                    <button className="bg-violet-600 text-white text-sm px-4 py-2 rounded hover:bg-violet-700 transition">
                      View Profile
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        reviewRequest(request._id, "rejected");
                      }}
                    >
                      Reject
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        reviewRequest(request._id, "accepted");
                      }}
                    >
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-xl">No requests found.</p>
      )}
    </div>
  );
};

export default Requests;
