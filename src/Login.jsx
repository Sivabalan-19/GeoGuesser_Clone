import { useState } from "react";
import { post } from "./utils/axios";
import {
  CompassIcon,
  DividerIcon,
  TriangleIcon,
  MailIcon,
  KeyIcon,
  ArrowRightIcon,
  GoogleIcon,
  CompassRose,
  Mountains,
  HotAirBalloon,
  Airplane,
  LocationPin,
  StampCheckIcon,
} from "./assets/icons";

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
          <CompassRose width={140} height={140} className="text-[#004E89]" />
        </div>
      </div>

      {/* Mountain peaks decoration - top right */}
      <div className="absolute top-0 right-0 opacity-10">
        <Mountains width={300} height={200} className="text-[#004E89]" />
      </div>

      {/* Hot air balloon - floating animation */}
      <div className="absolute top-1/4 right-20 opacity-15 animate-float">
        <HotAirBalloon width={80} height={100} className="text-[#FF6B35]" />
      </div>

      {/* Vintage airplane */}
      <div className="absolute bottom-32 left-32 opacity-12 animate-drift">
        <Airplane width={100} height={60} className="text-[#004E89]" />
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
                    <CompassIcon className="w-10 h-10 text-[#FFF5E1]" />
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
                <DividerIcon className="w-4 h-4 text-[#F77F00]" />
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
                  <TriangleIcon className="w-3 h-3 text-[#FF6B35]" />
                  Explorer ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MailIcon className="h-5 w-5 text-[#004E89]" />
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
                  <TriangleIcon className="w-3 h-3 text-[#FF6B35]" />
                  Secret Code
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <KeyIcon className="h-5 w-5 text-[#004E89]" />
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
                  <ArrowRightIcon className="w-5 h-5" />
                  <span>Start Adventure</span>
                  <CompassIcon className="w-5 h-5" strokeWidth={2.5} />
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
              <GoogleIcon className="w-6 h-6 text-[#004E89] mr-2" />
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
              <StampCheckIcon className="w-16 h-16 text-[#FF6B35]" />
            </div>
          </div>
        </div>
      </div>

      {/* Location pin - animated */}
      <div className="absolute bottom-20 left-20 opacity-15">
        <div className="animate-bounce" style={{ animationDuration: "2s" }}>
          <LocationPin className="w-16 h-16 text-[#FF6B35]" />
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
