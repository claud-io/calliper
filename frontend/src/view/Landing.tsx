import axios from "axios";
import React from "react";
import LineChart from "../components/LineChart";

const Landing = () => {
  return (
    <>
      <div className="overflow-hidden bg-white shadow sm:rounded-lg m-4">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Tools</h3>
        </div>
        <div className="border-t border-gray-300 py-6 px-11"></div>
      </div>
      <div className="overflow-hidden bg-white shadow sm:rounded-lg m-4">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Some cool title
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Such description
          </p>
        </div>
        <div className="border-t border-gray-300 py-6 px-11">
          <LineChart data={[{ date: Date.now().toString(), value: 10 }]} />
        </div>
      </div>
    </>
  );
};

export default Landing;
