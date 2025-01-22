import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import "../assets/styles/EarnStyles.css";
//import { faCoins } from "@fortawesome/free-solid-svg-icons";
//import { Loader2 } from 'lucide-react'
//import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
//import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
//import { ScrollArea } from "@/components/ui/scroll-area"

// Interfaces y tipos
interface Task {
    id: number;
    name: string;
    reward: number;
}

interface RankingUser {
    name: string;
    earnings: number;
    rank: number;
    photo: string
}

interface Data {
    totalPeople: number;
    userRank: number;
    ranking: RankingUser[];
    tasks: Task[];
    userRank_name: string;
    userRank_earnings: number;
    userRank_rank: number,
    userRank_photo: string
}

declare namespace Telegram {
  namespace WebApp {
    const initDataUnsafe: any;
  }
}

const Earn: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [totalPeople, setTotalPeople] = useState(0);
    const [userRank_name, setUserRank_name] = useState("");
    const [userRank_photo, setUserRank_photo] = useState("logo_user.png");
    const [userRank_earn, setUserRank_earn] = useState(0);
    const [userRank_post, setUserRank_post] = useState(0);
    const [ranking, setRanking] = useState<RankingUser[]>([]);

    // Función para leer los datos usando Axios
    const fetchData = async (telegramUser: any) => {
        try {
            const response = await axios.post(
                '/earndata',
                {
                    'user_id':telegramUser.id
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const jsonData: Data = response.data;
            setTotalPeople(jsonData.totalPeople || 0);
            setUserRank_name(jsonData.userRank_name || String);
            setUserRank_photo(jsonData.userRank_photo || String);
            setUserRank_earn(jsonData.userRank_earnings || 0);
            setUserRank_post(jsonData.userRank_rank || 0);
            setRanking(jsonData.ranking || []);
        } catch (error) {
            console.error("Error loading JSON:", error);
            setTotalPeople(100);
            setUserRank_name("Raydel21");
            setUserRank_photo("logo_user.png");
            setUserRank_earn(2100);
            setUserRank_post(1);
            setRanking([
                { "name": "John Doe", "earnings": 100.0, "rank": 1,"photo":"img_1.png" },
                { "name": "Jane Doe", "earnings": 90.0, "rank": 2,"photo":"img_2.png" },
                { "name": "Alice Smith", "earnings": 80.0, "rank": 3,"photo":"img_3.png" },
                { "name": "Bob Johnson", "earnings": 70.0, "rank": 4,"photo":"img_5.png" }
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const telegramUser = Telegram.WebApp.initDataUnsafe.user;
        fetchData(telegramUser);
    }, []);

    // Si la carga está en progreso, mostrar el componente de cargador
    if (loading) {
        return <Loader isLoading={loading} message="Loading content..." />;
    }

    return (
        <div className="w-full fixed inset-0 bottom-0 left-1/2 transform -translate-x-1/2 h-full flex justify-around items-center bg-black text-center text-white">
            <div className="flex flex-col items-center justify-center p-2 h-full overflow-hidden">
                <div className="mx-4 shadow-md rounded-lg text-center text-white inset-0">
                    <h2 className="text-2xl font-semibold mb-4">
                        🏆 Ranking de Ganancias 🏆
                    </h2>
                    <p>Total de personas: {totalPeople}</p>
                    <p></p>
                    <div className="max-h-96 overflow-y-auto">
                        <ul className="list-none p-0 m-0">
                            {ranking.map((user, index) => (
                                <li
                                    key={user.name}
                                    className="bg-gray-800 bg-opacity-20 p-4 rounded-lg mb-2 transition duration-300 transform hover:scale-105"
                                >
                                    <div className="mr-5 flex justify-between items-center">
                                        <img 
                                            src={`/img_profile/${user.photo}`}
                                            alt="imagen"
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <div className="flex items-center">
                                            <div className="flex flex-col items-center gap-2">
                                                <span className="text-white text-xl">
                                                    {user.name}
                                                </span>
                                                <div className="flex flex-fil items-center gap-2">
                                                    <span className="text-white text-xl">
                                                        {user.earnings.toFixed(2)}
                                                    </span>
                                                    <span className="text-cyan-500 text-lg">
                                                        USDT
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-white text-xl mr-2">
                                                #{index + 1}.
                                            </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="pulse pulse-circle border-2 border-cyan-500 bg-transparent w-full h-20 rounded-lg">
                        <div className="mr-3 p-1 flex justify-between items-center">
                            <img 
                                src={`/img_profile/${userRank_photo}`}
                                alt="imagen"
                                className="w-10 h-10 rounded-full"
                            />
                            <div className="flex items-center">
                                <div className="flex flex-col items-center gap-2">
                                    <span className="text-white text-xl">
                                        {userRank_name}
                                    </span>
                                    <div className="flex flex-fil items-center gap-2">
                                        <span className="text-white text-xl">
                                            {userRank_earn}
                                        </span>
                                        <span className="text-cyan-500 text-lg">
                                            USDT
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <span className="text-white text-xl mr-2">
                                    #{userRank_post}
                                </span>
                        </div>
                    </div>
                </div>
            </div>
            <Navbar />
        </div>
    );
};

export default Earn;
