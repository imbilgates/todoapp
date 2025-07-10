import { Loader } from "./Loader";

const FullScreenLoader = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-100 to-blue-100 text-center p-6">
      <Loader />
      <p className="mt-4 text-sm text-gray-600 max-w-md">
        Please wait... The backend is hosted on <strong>Render Free Tier</strong>, so it might take a few seconds due to server cold start.
      </p>
    </div>
  );
};

export default FullScreenLoader;
