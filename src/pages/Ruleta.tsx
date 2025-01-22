'use client'

import { useState } from "react";
import { Wheel } from 'react-custom-roulette'
import { trxlogo } from "../images";
import Navbar from "../components/Navbar";

const data = [
  { option: 'Premio 10', image: { uri: './usdt_10.png', landscape: true, sizeMultiplier: 0.35 }, style: { backgroundColor: '#FFA500', textColor: 'white' } },
  { option: 'Premio 25', image: { uri: './usdt_25.png', landscape: true, sizeMultiplier: 0.35 }, style: { backgroundColor: '#FF4500', textColor: 'black' } },
  { option: 'Gira Nuevamente', image: { uri: './again.png', landscape: true, sizeMultiplier: 0.35 }, style: { backgroundColor: '#D02424', textColor: 'white' } },
  { option: 'Premio 50', image: { uri: './usdt_50.png', landscape: true, sizeMultiplier: 0.35 }, style: { backgroundColor: '#0000FF', textColor: 'white' } },
  { option: 'Premio 0', image: { uri: './usdt_0.png', landscape: true, sizeMultiplier: 0.35 }, style: { backgroundColor: '#FF0000', textColor: 'white' } },
  { option: 'Premio 10', image: { uri: './usdt_10.png', landscape: true, sizeMultiplier: 0.35 }, style: { backgroundColor: '#FFA500', textColor: 'white' } },
  { option: 'Premio 500', image: { uri: './usdt_500.png', landscape: true, sizeMultiplier: 0.35 }, style: { backgroundColor: '#008000', textColor: 'white' } },
  { option: 'Gira Nuevamente', image: { uri: './again.png', landscape: true, sizeMultiplier: 0.35 }, style: { backgroundColor: '#D02424', textColor: 'white' } },
  { option: 'Premio 25', image: { uri: './usdt_25.png', landscape: true, sizeMultiplier: 0.35 }, style: { backgroundColor: '#FF4500', textColor: 'black' } },
  { option: 'Premio 5', image: { uri: './usdt_5.png', landscape: true, sizeMultiplier: 0.35 }, style: { backgroundColor: '#8B0000', textColor: 'black' } },
  { option: 'Premio 10', image: { uri: './usdt_10.png', landscape: true, sizeMultiplier: 0.35 }, style: { backgroundColor: '#FFA500', textColor: 'white' } },
  { option: 'Premio 25', image: { uri: './usdt_25.png', landscape: true, sizeMultiplier: 0.35 }, style: { backgroundColor: '#FF4500', textColor: 'black' } },
  { option: 'Premio 50', image: { uri: './usdt_50.png', landscape: true, sizeMultiplier: 0.35 }, style: { backgroundColor: '#0000FF', textColor: 'white' } },
  { option: 'Premio 25', image: { uri: './usdt_25.png', landscape: true, sizeMultiplier: 0.35 }, style: { backgroundColor: '#FF4500', textColor: 'black' } },
  { option: 'Premio 10', image: { uri: './usdt_10.png', landscape: true, sizeMultiplier: 0.35 }, style: { backgroundColor: '#FFA500', textColor: 'white' } }
];

export default function PrizeWheel() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [result, setResult] = useState('');

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      console.log("Numero De Girar",newPrizeNumber)
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  const handleStopSpinning = () => {
    setMustSpin(false);
    setResult(data[prizeNumber].option);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col min-h-screen bg-black">
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-8 justify-center">
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            onStopSpinning={handleStopSpinning}
            backgroundColors={['#000000', '#000000']}
            outerBorderColor="#FFD700"
            outerBorderWidth={20}
            innerRadius={20}
            innerBorderColor="#FFD700"
            innerBorderWidth={5}
            radiusLineColor="#000000"
            radiusLineWidth={1}
            textColors={['#ffffff']}
            fontSize={20}
            perpendicularText={true}
            textDistance={60}
          />
          <div className="flex flex-col items-center gap-4 text-white">
            <h1 className="text-2xl font-bold">Vamos a girar</h1>
            <p className="text-gray-400">¡Prueba tu suerte y gana premios en efectivo!</p>
            
            <button
              onClick={handleSpinClick}
              disabled={mustSpin}
              className="font-medium flex items-center text-white px-8 py-3 rounded-full relative bg-gradient-to-r from-black to-black via-green-800 shadow-lg text-center text-white hover:bg-gradient-to-r hover:via-green-900"
            >
              Gira por 1 TRX <img src={trxlogo} alt="TRX" className="w-7 h-7" />
            </button>
            {result && <p>¡Has ganado: {result}!</p>}
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  )
}

