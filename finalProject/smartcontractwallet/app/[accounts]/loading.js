"use client";

export default function Loading() {
  return (
    <div className="bg-black rounded-xl m-10">
      <div className=" bg-black rounded-lg text-xl bg-opacity-70 my-10">
        Account Address is{" "}
        <span
          className="inline-block h-5 animate-pulse"
          style={{ animationDelay: 0.05, animationDirection: "1s" }}
        ></span>
      </div>

      <p className="text-6xl">
        Current Balance is{" "}
        <span style={{ animationDelay: 0.05, animationDuration: "1s" }}></span>{" "}
      </p>
      <div className="grid grid-cols-3 m-10">
        <div className="flex justify-center items-center py-5 col-start-1 col-end-1">
          <button className=" py-5 px-10 rounded-xl bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700 hover:from-pink-600 hover:to-yellow-600 text-lg">
            Send Ether
          </button>
        </div>
        <div className="flex justify-center items-center py-5 col-start-2 col-end-2">
          <button className="bg-rose-900 p-5 rounded-xl bg-gradient-to-br from-green-400 to-blue-500 ">
            Receive Ether
          </button>
        </div>
        <div className="flex justify-center items-center py-5 col-start-3 col-end-3">
          <button className="bg-rose-900 p-5 rounded-xl bg-gradient-to-r from-lime-600 to-blue-700 ">
            Verify Owner
          </button>
        </div>
      </div>
    </div>
  );
}
