import React from "react";

const GradientBox: React.FC = () => {
    return (
        <div className="relative max-w-full p-4 bg-gradient-to-r from-indigo-500 via-blue-500 to-blue-700 rounded-lg shadow-lg text-center text-white">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-300 via-transparent to-blue-300 opacity-50 filter blur-lg"></div>
            <div className="relative">
                <h1 className="text-lg font-semibold">
                    CRYPTO CRASH
                </h1>
            </div>
        </div>
    );
};

export default GradientBox;
