import loginImage from "@/assets/images/SignUpPageimg.png";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-8 lg:px-44">
      {/* Left Section */}
      <div className="w-full md:w-1/2 px-4 lg:px-12 py-10">{children}</div>

      {/* Right Section */}
      <div className="hidden md:flex w-1/2 justify-center items-center">
        <img
          src={loginImage}
          alt="illustration"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
