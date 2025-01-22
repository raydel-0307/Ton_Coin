import React from "react";
import { ClipLoader } from "react-spinners";
import Navbar from "./Navbar";

interface LoaderProps {
    isLoading: boolean;
    color?: string;
    size?: number;
    message?: string;
}

const Loader: React.FC<LoaderProps> = ({
    isLoading,
    color = "#ffffff",
    size = 150,
    message = "Loading...",
}) => {
    if (!isLoading) return null;

    return (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full flex justify-around items-center z-50 bg-black text-center text-white">
            <div className="min-h-screen flex flex-col items-center justify-center p-4 overflow-y-auto">
                <ClipLoader color={color} loading={isLoading} size={size} />
                {message && <p className="text-white mt-4">{message}</p>}
                <Navbar />
            </div>
        </div>
    );
};

export default Loader;
