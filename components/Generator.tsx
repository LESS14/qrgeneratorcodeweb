import React, { useState } from "react";
import { openLimitExceededModal } from "./LimitExceededModal";
import QRCodeDisplay from "./QRCodeDisplay";
import { IoMdSend } from "react-icons/io";
import QRCode from "qrcode";

const MAX_TEXT_LENGTH = 2953;

const QRCodeGenerator: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [qrCode, setQRCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);



  const generateQRCode = () => {
    if (text.trim() === "") {
      return 1;
    }


    if (text.length > MAX_TEXT_LENGTH) {
      openLimitExceededModal();
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      QRCode.toDataURL(text, (err: any, dataUrl: any) => {
        if (err) {
          console.error(err);
        } else {
          setQRCode(dataUrl);
        }
        setIsLoading(false);
      });
    }, 2000);
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
      <div className="lg:border-2 lg:border-indigo-500/100 lg:rounded-xl p-4">
        <h1 className="lg:text-4xl md:text-3xl font-bold text-white mb-4">Gerador de QR Code</h1>
        <div className="flex flex-row items-center space-x-4">
          <input
            type="text"
            placeholder="Digite o texto do QR Code..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={handleKeyPress}
            className="border rounded p-2 w-64"
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
        {qrCode && <QRCodeDisplay qrCode={qrCode} />}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
