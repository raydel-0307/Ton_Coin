import React, { useEffect, useState } from "react";
import axios from "axios";
//import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { ruletalogo, logoCoin, toncoin, trxlogo, agglogo, btlogo } from "../images";
import "../assets/styles/HomeStyles.css";
//import Header from '../components/Header';
//import { Lottie } from 'lottie-react';

declare namespace Telegram {
  namespace WebApp {
    const initDataUnsafe: any;
  }
}

const Home: React.FC = () => {
    //const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [usdtGenerated, setUsdtGenerated] = useState<number | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isNextOpen, setNextOpen] = useState(false);
    const [TRX_B, settrx] = useState(0)
    const [TON_B, setton] = useState(0)
    const [INV_B, setinv] = useState(0)
    const [inviteLink,setLink] = useState('')

    /*const openlink = () => {
        const url = 'https://t.me/seshacommunity';
        window.open(url, '_blank');
    };*/

    const ruleta_execute = () => {
        setNextOpen(true);
        setTimeout(() => {
            setNextOpen(false);
        }, 3000);

        //navigate(`/ruleta`, {});
    }

    useEffect(() => {
        const telegramUser = Telegram.WebApp.initDataUnsafe.user;
        axios
            .post('/getdata', 
                {
                    'user_id':telegramUser.id
                },
                {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                const data = res.data;
                setLink(data.basic_data.refer_id)
                setUsdtGenerated(data.data.total_usdt);
                settrx(data.data.trx);
                setton(data.data.ton);
                setinv(data.data.friends);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setUsdtGenerated(0);
                settrx(0);
                setton(0);
                setinv(0);
            })
            .finally(() => {
                setLoading(false);
            });

        axios
            .post('/getuser',
                {
                    'user_id':telegramUser.id
                },
                {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                const data = res.data;
                setIsPopupOpen(data.first_join);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setIsPopupOpen(false);
            })
            .finally(() => {
                setLoading(false);
            });

        setTimeout(() => {
            setIsPopupOpen(false);
        }, 4000);
        
    }, []);

    if (loading) {
        return <Loader isLoading={loading} message="Loading content..." />;
    }

    return (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full justify-around items-center z-50 bg-black text-center text-white">
            <div className="mb-20 min-h-screen flex flex-col justify-center overflow-hidden">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold">Sesha Airdrop</h1>
                </div>

                <div className="flex items-center justify-center bg-black mx-4 rounded-lg">
                  <div className="flex items-center mx-2">
                    <span className="text-3xl">🇪🇸</span>
                  </div>
                  <div className="h-8 relative bg-gradient-to-r from-black to-black via-green-700 shadow-lg text-center text-white hover:bg-gradient-to-r">
                    <span className="text-white font-bold text-sm">La billetera se lanzará en</span>
                  </div>
                  <div className="text-white mx-2">
                    <span className="text-2xl font-bold">32</span> <span className="text-sm">Días</span>
                  </div>
                </div>

                {/* BALANCE DISPLAY */}
                <div className="flex items-center justify-center my-1">
                  <div className="text-center">
                    <div className="flex flex-fil items-center justify-center gap-1">
                      <div className="mb-3 flex flex-fil items-center gap-1">
                        {/*<button className="w-20 h-20 relative">*/}
                        <button onClick={ruleta_execute} className="relative py-3 px-6 bg-gradient-to-r text-white font-semibold rounded-full shadow-lg transition-transform transform duration-300 ease-in-out hover:scale-110 hover:rotate-3 active:scale-95 active:rotate-0">
                          <img className="w-10" src={ruletalogo} alt="Dollar Coin" />
                          <span className="text-center text-white text-1xl font-semibold bg-[#00BFA5] rounded-lg mx-auto">Girar</span>
                        </button>
                        <div className="flex flex-fil items-center gap-1">
                          <span className="text-[#00BFA5] text-5xl font-semibold">$</span>
                          <span className="text-white text-4xl font-bold">{usdtGenerated?.toLocaleString() ?? 0}</span>
                        </div>
                        {/*<button className="w-20 h-20 relative ">*/}
                        <button onClick={ruleta_execute} className="relative py-3 px-6 bg-gradient-to-r text-white font-semibold rounded-full shadow-lg transition-transform transform duration-300 ease-in-out hover:scale-110 hover:rotate-3 active:scale-95 active:rotate-0">
                          <img className="w-10" src={btlogo} alt="Dollar Coin" />
                          <span className="text-center text-white text-1xl font-semibold bg-[#00BFA5] rounded-lg mx-auto">Ganar</span>
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-fil items-center justify-center gap-1">
                        <div className="flex flex-col items-center justify-center gap-1">
                          <span className="text-1xl text-1xl">USDT</span>
                          <div className="flex flex-fil items-center justify-center gap-1">
                            <img src={logoCoin} alt="Dollar Coin" className="w-7 h-7 pulse pulse-circle" />
                            <span className="text-white text-1xl font-bold">{usdtGenerated?.toLocaleString() ?? 0}</span>
                          </div>
                        </div>

                        <span className="text-1xl text-1xl">|</span>

                        <div className="flex flex-col items-center justify-center gap-1">
                          <span className="text-1xl text-1xl">TRX</span>
                          <div className="flex flex-fil items-center justify-center gap-1">
                            <img src={trxlogo} alt="Dollar Coin" className="w-7 h-7 pulse pulse-circle" />
                            <span className="text-white text-1xl font-bold">{TRX_B}</span>
                          </div>
                        </div>

                        <span className="text-1xl text-1xl">|</span>

                        <div className="flex flex-col items-center justify-center gap-1">
                          <span className="text-1xl text-1xl">TON</span>
                          <div className="flex flex-fil items-center justify-center gap-1">
                            <img src={toncoin} alt="Dollar Coin" className="w-7 h-7 pulse pulse-circle" />
                            <span className="text-white text-1xl font-bold">{TON_B}</span>
                          </div>
                        </div>

                        <span className="text-1xl text-1xl">|</span>
                        
                        <div className="flex flex-col items-center justify-center gap-1">
                          <span className="text-1xl text-1xl">Invitaciones</span>
                          <div className="flex flex-fil items-center justify-center gap-1">
                            <img src={agglogo} alt="Dollar Coin" className="w-7 h-7 pulse pulse-circle" />
                            <span className="text-white text-1xl font-bold">{INV_B}</span>
                          </div>
                        </div>

                    </div>
                  </div>
                </div>



                <div className="mb-2 fixed flex left-1/2 bottom-20 transform -translate-x-1/2 justify-center overflow-hidden">
                    <img
                        src={logoCoin}
                        alt="Dollar Coin"
                        className="w-40 h-40 mb-2 pulse pulse-circle"
                    />
                </div>
                <div className="mb-4 p-5 flex flex-fil items-center justify-center gap-1">
                    <div className="p-1 mb-1">
                        <div className="relative bg-gradient-to-r w-full from-cyan-600 via-black-100 to-cyan-600 rounded-lg shadow-lg text-center text-white hover:bg-gradient-to-r hover:from-cyan-700 hover:via-cyan-800 hover:to-cyan-900">
                            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-2 px-4 opacity-50 filter blur-lg"></div>
                            <div className="relative">
                                <h1 className="text-lg font-semibold">
                                    <a
                                        href={`https://t.me/share/url?url=${encodeURIComponent(inviteLink)}`} // Poner la url de la comunidad
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Gana 0.5 por Invitado
                                    </a>
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="p-1 mb-1">
                        <div className="relative bg-gradient-to-r w-full from-cyan-500 via-cyan-600 to-cyan-700 rounded-lg shadow-lg text-center text-white hover:bg-gradient-to-r hover:from-cyan-700 hover:via-cyan-800 hover:to-cyan-900">
                            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-2 px-4 opacity-50 filter blur-lg"></div>
                            <div className="relative">
                                <h1 className="text-lg font-semibold">
                                    <a
                                        href="https://t.me/seshacommunity" // Poner la url de la comunidad
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Accede a la Comunidad
                                    </a>
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
                {isPopupOpen && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex justify-center items-center z-50">
                        <div className="flex flex-col items-center justify-center bg-black rounded-lg shadow-lg p-4 w-30 h-1/3">
                            <span className="p-2 text-white text-8xl font-bold">🎉</span>
                            <div className="p-2 relative bg-gradient-to-r from-black to-black via-green-600 shadow-lg text-center text-white hover:bg-gradient-to-r hover:via-green-900">
                                <span className="text-white font-bold text-4xl">! Haz Recibido !</span>
                            </div>
                            <div className="p-2 flex flex-fil items-center gap-1">
                              <span className="text-[#00BFA5] text-5xl font-semibold">$</span>
                              <span className="text-white text-4xl font-bold">10 USDT</span>
                            </div>
                            {/*<button onClick={closePopup} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded absolute top-4 right-4">
                                X
                            </button>*/}
                        </div>
                    </div>
                )}
                {isNextOpen && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex justify-center items-center z-50">
                        <div className="flex flex-col items-center justify-center bg-black rounded-lg shadow-lg p-4 w-30 h-1/3">
                            <span className="mb-2 p-2 text-white text-8xl font-bold">🔥</span>
                            <div className="p-2 relative bg-gradient-to-r from-black to-black via-green-600 shadow-lg text-center text-white hover:bg-gradient-to-r hover:via-green-900">
                                <span className="text-white font-bold text-4xl">! Próximamente !</span>
                            </div>
                        </div>
                    </div>
                )}
                <Navbar />
            </div>
        </div>
    );
};

export default Home;
