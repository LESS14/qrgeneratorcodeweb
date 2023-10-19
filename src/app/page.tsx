"use client"
import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import Image from "next/image";
import { IoMdSend } from "react-icons/io";

const Home: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [qrCode, setQRCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const generateQRCode = () => {
    setIsLoading(true); // Inicia o estado de carregamento
    setTimeout(() => {
      QRCode.toDataURL(text, (err: any, dataUrl: any) => {
        if (err) {
          console.error(err);
        } else {
          setQRCode(dataUrl);
        }
        setIsLoading(false); // Encerra o estado de carregamento após 2 segundos
      });
    }, 2000); // Tempo de atraso de 2 segundos
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      generateQRCode();
    }
  };

  const handleSendClick = () => {
    generateQRCode();
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gradient-background">
      <div className="border-4 border-indigo-500/100 rounded-xl p-4">
        <h1 className="text-4xl font-bold text-white mb-4">Gerador de QR Code</h1>
        <div className="flex flex-row items-center space-x-4">
          <input
            type="text"
            placeholder="Digite o texto do QR Code..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={handleKeyPress}
            className="border rounded p-2 w-64 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
            style={{
              borderImage: "linear-gradient(90deg, #1a5276, #7d3c98) 1",
              borderImageSlice: 1,
            }}
          />
          <button
            onClick={handleSendClick}
            disabled={isLoading}
            className={`${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600 hover:from-blue-600 hover:via-blue-500 hover:to-blue-400"
            } text-white py-2 px-4 rounded font-bold`}
          >
            <IoMdSend className="text-2xl" />
          </button>
        </div>
        {qrCode && (
        <div className="output mt-5 flex flex-col items-center">
          <h3 className="text-white text-xl mb-2">Resultado:</h3>
          <Image src={qrCode} alt="QR Code" width={150} height={150} />
        </div>
      )}
      </div>
    </div>
  );
};

export default Home;
