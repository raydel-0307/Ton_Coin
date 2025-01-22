import React, { useState, useEffect, useRef } from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCopy,
    faTasks,
    faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { logoCoin } from "../images";

const MySwal = withReactContent(Swal);

declare namespace Telegram {
  namespace WebApp {
    const initDataUnsafe: any;
  }
}

const Friends: React.FC = () => {
    const [friends, setFriends] = useState<number>(0);
    const [friends_usdt, setFriends_usdt] = useState<number>(0);
    const [tasks_len, settasks_len] = useState<number>(0);
    const [tasks_usdt, settasks_usdt] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [usdtGenerated, setUsdtGenerated] = useState<number>(0);
    const benefitsRef = useRef<HTMLDivElement | null>(null);
    const [inviteLink,setLink] = useState('')

    const shareLink = () => {
        const url = `https://t.me/share/url?url=${encodeURIComponent(inviteLink)}`;
        window.open(url, '_blank');
    };

    // Función para leer los datos usando Axios POST
    const fetchData = async (telegramUser: any) => {
        try {
            const response = await axios.post(
                '/getdata',
                {
                    'user_id':telegramUser.id
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = response.data;
            setFriends(data.data.friends || 0);
            setFriends_usdt(data.data.friends_usdt || 0);
            setUsdtGenerated(data.data.total_usdt || 0);
            settasks_len(data.data.tasks_len  || 0);
            settasks_usdt(data.data.tasks_usdt  || 0);
            setLink(data.basic_data.refer_id)
        } catch (error) {
            console.error("Error fetching data:", error);
            setFriends(0);
            setFriends_usdt(0);
            setUsdtGenerated(0);
            settasks_len(0)
            settasks_usdt(0)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const telegramUser = Telegram.WebApp.initDataUnsafe.user;
        fetchData(telegramUser);
    }, []);

    // Función para abrir el modal de invitación
    const handleInviteFriend = () => {
        // Abrir el modal de invitación
        // setShowInviteModal(true);
    };

    // Función para copiar el enlace al portapapeles
    const handleCopyLink = () => {
        // Copiar el enlace al portapapeles
        navigator.clipboard.writeText(inviteLink);
        MySwal.fire({
            title: "Enlace copiado!",
            text: "El enlace de invitación ha sido copiado al portapapeles.",
            icon: "success",
        });
    };

    // Si la carga está en progreso, mostrar el componente de cargador
    if (loading) {
        return <Loader isLoading={loading} message="Loading content..." />;
    }

    return (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full flex justify-around items-center z-50 bg-black text-center text-white">
            <div className="min-h-screen flex flex-col items-center justify-center p-4 overflow-y-auto">
                <div className="text-center mb-4">
                    <h1 className="text-4xl font-bold">Sesha Airdrop</h1>
                </div>
                <div className="p-4 shadow-md mb-4 rounded-lg text-center text-white w-full">
                    <p className="text-center text-gray-400 mb-4">
                        Invite Telegram users to earn more $USDT
                    </p>
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex text-center text-2xl text-white">
                            <img
                                src={logoCoin}
                                alt="Dollar Coin"
                                className="w-8 h-8 gap-4"
                            />
                            <p> {usdtGenerated} USDT</p>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <button
                            className="flex-grow transition duration-300 transform hover:scale-105"
                            onClick={handleInviteFriend}
                        >
                            <div className="transition duration-300 transform hover:scale-105 relative py-2 px-4 w-full bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 rounded-lg shadow-lg text-center text-white hover:bg-gradient-to-r hover:from-cyan-700 hover:via-cyan-800 hover:to-cyan-900">
                                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-2 px-4 opacity-50 filter blur-lg"></div>
                                <div className="relative">
                                    {/*<h1 className="text-lg font-semibold">
                                        Invite a friend to earn 0.5 USDT
                                    </h1>*/}
                                    <button onClick={shareLink}>Invite a friend to earn 0.5 USDT</button>
                                </div>
                            </div>
                        </button>
                        <button
                            className="flex-grow-0 transition duration-300 transform hover:scale-105"
                            onClick={handleCopyLink}
                        >
                            <div className="transition duration-300 transform hover:scale-105 relative py-2 px-4 w-full bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 rounded-lg shadow-lg text-center text-white hover:bg-gradient-to-r hover:from-cyan-700 hover:via-cyan-800 hover:to-cyan-900">
                                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-2 px-4 opacity-50 filter blur-lg"></div>
                                <div className="relative">
                                    <h1 className="text-lg font-semibold">
                                        <FontAwesomeIcon icon={faCopy} />
                                    </h1>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Elemento con ref para IntersectionObserver */}
                <div
                    ref={benefitsRef}
                    className="p-4 shadow-md mb-4 rounded-lg text-center text-white w-full"
                >
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h2 className="text-white text-lg font-semibold">
                                Benefit of your friends
                            </h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Recompensas */}
                        <div className="bg-gray-800 bg-opacity-20 p-4 rounded-lg transition duration-300 transform hover:scale-105">
                            <div className="flex items-center mb-2">
                                <FontAwesomeIcon
                                    icon={faUserFriends}
                                    className="text-blue-400 text-2xl"
                                />
                                <span className="text-white text-xl ml-2">
                                    {friends} Friends
                                </span>
                            </div>
                            <div className="mt-4 text-cyan-500 text-lg items-start">
                                <span>{friends_usdt} USDT</span>
                            </div>
                        </div>
                        {/* Tareas */}
                        <div className="bg-gray-800 bg-opacity-20 p-4 rounded-lg transition duration-300 transform hover:scale-105">
                            <div className="flex items-center mb-2">
                                <FontAwesomeIcon
                                    icon={faTasks}
                                    className="text-blue-400 text-2xl"
                                />
                                <span className="text-white text-xl ml-2">
                                    {tasks_len} Tasks
                                </span>
                            </div>
                            <div className="mt-4">
                                <p className="text-cyan-500 text-lg">
                                    {tasks_usdt} USDT
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* <div className="grid grid-cols-1 gap-4 mt-4">
                        <button className="item-center content-center transition duration-300 transform hover:scale-105 relative py-2 px-4 w-full bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 rounded-lg shadow-lg text-center hover:bg-gradient-to-r hover:from-cyan-700 hover:via-cyan-800 hover:to-cyan-900">
                            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-700 font-bold py-2 px-4 opacity-50 filter blur-lg"></div>
                            <div className="flex">
                                <p className="font-semibold text-xl text-white">
                                    Claim Reward{" "}
                                </p>
                                <img
                                    src={logoCoin}
                                    alt="Dollar Coin"
                                    className="w-8 h-8"
                                />
                            </div>
                        </button>
                    </div> */}
                    <div className="grid grid-cols-1 gap-4 mt-4">
                        <button
                            className="flex-grow-0 transition duration-300 transform hover:scale-105"
                            // onClick={recogerMonedas}
                        >
                            <div className="text-center transition duration-300 transform hover:scale-105 relative py-2 px-4 w-full bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 rounded-lg shadow-lg text-white hover:bg-gradient-to-r hover:from-cyan-700 hover:via-cyan-800 hover:to-cyan-900">
                                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-2 px-4 opacity-50 filter blur-lg"></div>
                                <div className="flex flex-row">
                                    <p className="font-semibold text-xl text-white">
                                        Claim Reward{" "}
                                    </p>
                                    <img
                                        src={logoCoin}
                                        alt="Dollar Coin"
                                        className="w-8 h-8 items-center"
                                    />
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <Navbar />
        </div>
    );
};

export default Friends;
