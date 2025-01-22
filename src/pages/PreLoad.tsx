import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoCoin } from "../images"; // Ajusta esta importación según tus rutas
import Swal from "sweetalert2";
import axios from "axios";
import "../assets/styles/HomeStyles.css";

declare namespace Telegram {
  namespace WebApp {
    const initDataUnsafe: any;
    function expand(): void;
  }
}


const PreLoad: React.FC = () => {
    const navigate = useNavigate();
    //const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        Telegram.WebApp.expand();
        const telegramUser = Telegram.WebApp.initDataUnsafe.user;

        const postData = {
            first_name: telegramUser.first_name,
            user_id: telegramUser.id,
            username: telegramUser.username,
        };

        axios
            .post("/login", postData, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                const data = res.data;
                if (!data.status) {
                    Swal.fire({
                        title: "Error",
                        text: "Hubo un error de autenticación",
                        icon: "error",
                        confirmButtonText: "Aceptar",
                    });
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            })
            .finally(() => {
                //setLoading(false);
                // Redirigir a la página principal después de la autenticación
                setTimeout(() => {
                    navigate(`/home`, {
                        state: { user_id: telegramUser.id },
                    });
                }, 5000);
            });
    }, [navigate]);

    return (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full flex justify-around items-center z-50 bg-black text-center text-white">
            <div className="min-h-screen flex flex-col items-center justify-center p-4 overflow-y-auto">
                <img
                    src={logoCoin}
                    alt="Dollar Coin"
                    className="w-50 h-50 mb-2" //"w-50 h-50 mb-2 rotate-animation"
                />
            </div>
        </div>
    );
};

export default PreLoad;
