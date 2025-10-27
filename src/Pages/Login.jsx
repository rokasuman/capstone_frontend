import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState("sign up");
  const [name, setName] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault(); 
    console.log({ name, email, password });
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[80vh] flex items-center justify-center"
    >
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 rounded-xl text-zinc-900 text-sm shadow-lg">
       
        <p className="text-lg font-semibold">
          {state === "sign up" ? "Create Account" : "Login"}
        </p>
        <p className="text-gray-600">
          Please {state === "sign up" ? "sign up" : "login"} to book an
          appointment.
        </p>

       
        {state === "sign up" && (
          <div className="w-full">
            <p className="mb-1 font-medium">Full Name</p>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter your full name"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
              required
            />
          </div>
        )}

        {/* Email */}
        <div className="w-full">
          <p className="mb-1 font-medium">Email</p>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)} // ✅ fixed wrong set function
            value={email}
            placeholder="Enter your email"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
            required
          />
        </div>

        {/* Password */}
        <div className="w-full">
          <p className="mb-1 font-medium">Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter your password"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 mt-3 rounded-md hover:bg-blue-600 transition"
        >
          {state === "sign up" ? "Create Account" : "Login"}
        </button>

        {/* Toggle between sign up / login */}
        <p className="text-center w-full mt-3 text-sm">
          {state === "sign up" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setState("login")}
                className="text-blue-600 cursor-pointer font-medium"
              >
                Login
              </span>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <span
                onClick={() => setState("sign up")}
                className="text-blue-600 cursor-pointer font-medium"
              >
                Sign up
              </span>
            </>
          )}
        </p>
      </div>
    </form>
  );
};

export default Login;
