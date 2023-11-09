"use client"
import React, { Component, ChangeEvent, KeyboardEvent } from 'react';
import QRCodeDisplay from './Display';
import { IoMdSend } from 'react-icons/io';
import QRCode from 'qrcode';
import { Tooltip } from 'react-tooltip';

const MAX_TEXT_LENGTH = 1000;

interface GeneratorState {
  text: string;
  qrCode: string;
  isLoading: boolean;
}

class QRCodeGenerator extends Component<{}, GeneratorState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      text: '',
      qrCode: '',
      isLoading: false,
    };
  }

  generateQRCode = () => {
    const { text } = this.state;

    if (text.trim() === '') {
      return 1;
    }

    if (text.length > MAX_TEXT_LENGTH) {
      return 1;
    }

    this.setState({ isLoading: true });

    setTimeout(() => {
      QRCode.toDataURL(this.state.text, { errorCorrectionLevel: 'H' }, (err: any, dataUrl: string | undefined) => {
        if (err) {
          console.error(err);
        } else {
          this.setState({ qrCode: dataUrl || '', isLoading: false });
        }
      });
    }, 2000);
  };


  handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ text: event.target.value });
  };

  handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.generateQRCode();
    }
  };

  handleSendClick = () => {
    this.generateQRCode();
  };

  render() {
    const { text, qrCode, isLoading } = this.state;

    return (
      <div className="flex flex-col justify-center items-center h-screen gradient-background">
        <div className="lg:border-2 lg:border-indigo-500/100 lg:rounded-xl p-4">
          <h1 className="lg:text-4xl md:text-3xl font-bold text-white mb-4">Gerador de QR Code</h1>
          <div className="flex flex-row items-center space-x-4">
            <input
              type="text"
              placeholder="Digite o texto do QR Code..."
              value={text}
              onChange={this.handleTextChange}
              onKeyDown={this.handleKeyPress}
              className="border rounded p-2 w-64"
              style={{
                borderImage: 'linear-gradient(90deg, #1a5276, #7d3c98) 1',
                borderImageSlice: '1',
              }}
            />
            <button
              onClick={this.handleSendClick}
              disabled={isLoading}
              data-tooltip-id="tooltip-generate-button" 
              data-tooltip-content="Gerar QR Code"
              className={`${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600 hover:from-blue-600 hover:via-blue-500 hover:to-blue-400'
              } text-white py-2 px-4 rounded font-bold`}
            >
              <IoMdSend className="text-2xl" />
              <Tooltip 
              id="tooltip-generate-button"
              className="tooltip-generate-button"
              place={"right-start"}
              />
            </button>
          </div>
          {qrCode && <QRCodeDisplay qrCode={qrCode} />}
        </div>
      </div>
    );
  }
}

export default QRCodeGenerator;
