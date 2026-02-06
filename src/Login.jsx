import { useState } from "react";
import { post } from "./utils/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await post("users/login", { email, password });
      if (res?.token) {
        localStorage.setItem("token", res.token);
      }
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF5E1] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Modern geometric shapes background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#FF6B35] opacity-8 rounded-full"></div>
        <div className="absolute bottom-40 right-20 w-40 h-40 bg-[#004E89] opacity-8 transform rotate-45"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-[#F77F00] opacity-8"></div>
      </div>

      {/* Compass rose decoration - animated */}
      <div className="absolute top-10 left-10 opacity-12 transition-opacity duration-500">
        <div className="animate-spin-slow">
          <svg
            width="140"
            height="140"
            viewBox="0 0 140 140"
            className="text-[#004E89]"
          >
            <circle
              cx="70"
              cy="70"
              r="65"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            />
            <circle
              cx="70"
              cy="70"
              r="50"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle
              cx="70"
              cy="70"
              r="35"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            {/* North pointer - orange */}
            <path d="M70 10 L78 60 L70 65 L62 60 Z" fill="#FF6B35" />
            {/* South pointer */}
            <path
              d="M70 130 L62 80 L70 75 L78 80 Z"
              fill="currentColor"
              opacity="0.4"
            />
            {/* East pointer */}
            <path
              d="M130 70 L80 78 L75 70 L80 62 Z"
              fill="currentColor"
              opacity="0.6"
            />
            {/* West pointer */}
            <path
              d="M10 70 L60 62 L65 70 L60 78 Z"
              fill="currentColor"
              opacity="0.4"
            />
            {/* Center circle */}
            <circle cx="70" cy="70" r="8" fill="#FF6B35" />
            <circle cx="70" cy="70" r="4" fill="#FFF5E1" />
          </svg>
        </div>
      </div>

      {/* Mountain peaks decoration - top right */}
      <div className="absolute top-0 right-0 opacity-10">
        <svg
          width="300"
          height="200"
          viewBox="0 0 300 200"
          className="text-[#004E89]"
        >
          <path d="M0,200 L50,120 L100,200 Z" fill="currentColor" />
          <path d="M80,200 L150,80 L220,200 Z" fill="currentColor" />
          <path d="M200,200 L250,140 L300,200 Z" fill="currentColor" />
          <path
            d="M150,90 L160,70 L170,90"
            stroke="#FF6B35"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      {/* Hot air balloon - floating animation */}
      <div className="absolute top-1/4 right-20 opacity-15 animate-float">
        <svg
          width="80"
          height="100"
          viewBox="0 0 80 100"
          className="text-[#FF6B35]"
        >
          <ellipse cx="40" cy="35" rx="30" ry="35" fill="currentColor" />
          <path d="M40,35 L40,70" stroke="#D4A574" strokeWidth="1" />
          <path d="M35,35 L30,70" stroke="#D4A574" strokeWidth="1" />
          <path d="M45,35 L50,70" stroke="#D4A574" strokeWidth="1" />
          <rect x="30" y="70" width="20" height="15" fill="#8B6F47" rx="2" />
          <circle cx="35" cy="30" r="8" fill="#FFF5E1" opacity="0.3" />
        </svg>
      </div>

      {/* Vintage airplane */}
      <div className="absolute bottom-32 left-32 opacity-12 animate-drift">
        <svg
          width="100"
          height="60"
          viewBox="0 0 100 60"
          className="text-[#004E89]"
        >
          <path
            d="M10,30 L40,20 L90,25 L95,30 L90,35 L40,40 L10,30 Z"
            fill="currentColor"
          />
          <path d="M40,30 L20,10 L30,30" fill="currentColor" />
          <path d="M60,30 L60,45 L65,45 L65,30" fill="currentColor" />
          <circle cx="85" cy="30" r="3" fill="#FF6B35" />
        </svg>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Main card - compact height */}
        <div className="bg-white border-2 border-[#004E89] rounded-2xl shadow-2xl p-8 relative overflow-hidden">
          {/* Subtle top accent stripe */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-[#FF6B35]"></div>

          {/* Corner decorative elements */}
          <div className="absolute top-4 right-4 w-12 h-12 border-2 border-[#F77F00] opacity-15 rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-10 h-10 border-2 border-[#004E89] opacity-15"></div>

          <div className="relative z-10">
            {/* Header with modern explorer theme */}
            <div className="text-center mb-6">
              {/* Animated compass icon */}
              <div className="inline-flex items-center justify-center mb-4">
                <div className="relative group">
                  <div className="p-3 bg-[#004E89] rounded-2xl shadow-lg">
                    <svg
                      className="w-10 h-10 text-[#FFF5E1]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                      />
                    </svg>
                  </div>
                  {/* Animated rings around icon */}
                  <div className="absolute inset-0 border-2 border-[#004E89] rounded-2xl animate-ping opacity-20"></div>
                </div>
              </div>

              <h1 className="text-4xl font-black text-[#1A1A2E] mb-2 tracking-tight">
                World Explorer
              </h1>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-1 bg-[#FF6B35]"></div>
                <svg
                  className="w-4 h-4 text-[#F77F00]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                <div className="w-12 h-1 bg-[#FF6B35]"></div>
              </div>
              <p className="text-[#004E89] font-semibold mt-2">
                Your Journey Begins Here
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div className="group">
                <label className="block text-sm font-bold text-[#1A1A2E] mb-2 uppercase tracking-wider flex items-center gap-2">
                  <svg
                    className="w-3 h-3 text-[#FF6B35]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  </svg>
                  Explorer ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-[#004E89]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-[#FFF9F0] border-2 border-[#004E89] rounded-xl text-[#1A1A2E] placeholder-[#004E89]/40 focus:outline-none focus:ring-4 focus:ring-[#FF6B35]/30 focus:border-[#FF6B35] transition-all duration-200 font-medium"
                    placeholder="explorer@adventures.world"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="group">
                <label className="block text-sm font-bold text-[#1A1A2E] mb-2 uppercase tracking-wider flex items-center gap-2">
                  <svg
                    className="w-3 h-3 text-[#FF6B35]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  </svg>
                  Secret Code
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-[#004E89]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                      />
                    </svg>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-[#FFF9F0] border-2 border-[#004E89] rounded-xl text-[#1A1A2E] placeholder-[#004E89]/40 focus:outline-none focus:ring-4 focus:ring-[#FF6B35]/30 focus:border-[#FF6B35] transition-all duration-200 font-medium"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm pt-1">
                <label className="flex items-center space-x-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-2 border-[#004E89] bg-[#FFF9F0] text-[#FF6B35] focus:ring-[#FF6B35] cursor-pointer"
                  />
                  <span className="text-[#1A1A2E] font-semibold">
                    Save my journey
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-[#FF6B35] text-white font-black rounded-xl shadow-xl border-2 border-[#004E89] uppercase cursor-pointer tracking-wider"
              >
                <span className="flex items-center justify-center space-x-3">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                  <span>Start Adventure</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                </span>
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-[#F77F00]/30"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-[#004E89] font-bold text-xs uppercase tracking-widest">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Button only */}
            <button className="w-full flex items-center justify-center px-4 py-3 bg-[#FFF9F0] border-2 border-[#004E89] rounded-xl group shadow-md">
              <svg
                className="w-6 h-6 text-[#004E89] mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
              </svg>
              <span className="text-[#1A1A2E] font-bold">
                Continue with Google
              </span>
            </button>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-[#1A1A2E] font-semibold text-sm">
                New explorer?{" "}
                <a
                  href="#"
                  className="text-[#FF6B35] font-black underline decoration-2 decoration-[#F77F00] underline-offset-4"
                >
                  Register Now
                </a>
              </p>
            </div>
          </div>

          {/* Decorative stamp effect */}
          <div className="absolute -bottom-5 -right-5 opacity-15 rotate-12 pointer-events-none">
            <div className="border-4 border-[#FF6B35] rounded-full p-3">
              <svg
                className="w-16 h-16 text-[#FF6B35]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Location pin - animated */}
      <div className="absolute bottom-20 left-20 opacity-15">
        <div className="animate-bounce" style={{ animationDuration: "2s" }}>
          <svg
            className="w-16 h-16 text-[#FF6B35]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
        </div>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes drift {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(30px); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-drift {
          animation: drift 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
