import React from "react";
import Image from "next/image";

interface QRCodeDisplayProps {
  qrCode: string;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ qrCode }) => {
  return (
    <div className="output mt-5 flex flex-col items-center">
      <h3 className="text-white text-xl mb-2">Resultado:</h3>
      <Image src={qrCode} alt="QR Code" width={150} height={150} />
    </div>
  );
};

export default QRCodeDisplay;
