import React, { useState } from 'react';
import { ExternalLink, Copy, Check, QrCode } from 'lucide-react';

interface CryptoOption {
  name: string;
  logo: string;
  qrCode: string;
  address: string;
}

const cryptoOptions: CryptoOption[] = [
  {
    name: 'Bitcoin',
    logo: 'https://imgur.com/3ta1XxF.png',
    qrCode: 'https://imgur.com/otw6V0x.png',
    address: 'bc1qcqzyqlaz23cfpc8mcjdm7jqvcjwlkc87nx4f0a'
  },
  {
    name: 'Ethereum',
    logo: 'https://imgur.com/vytHCSk.png',
    qrCode: 'https://imgur.com/MIGJGxF.png',
    address: '0x01471a6d0AF741A87172961c599a06bA2f0fDB09'
  },
  {
    name: 'Solana',
    logo: 'https://imgur.com/5HGpric.png',
    qrCode: 'https://imgur.com/BJboPoo.png',
    address: 'DtSAjnYg76tjL1atVQKJ5bkSpKM2mQxmkvXJchkbYick'
  },
  {
    name: 'XRP',
    logo: 'https://imgur.com/XQCUymB.png',
    qrCode: 'https://imgur.com/3C4GbBq.png',
    address: 'rpTyKsuDFi3fwirZbtE2hx2pGZujdjCvvD'
  }
];

export function Tithe() {
  const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null);
  const [showQR, setShowQR] = useState(true);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const handleCopyAddress = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(address);
      setTimeout(() => setCopiedAddress(null), 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Support Our Ministry</h2>
        <div className="max-w-2xl mx-auto bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-50 p-6 rounded-xl shadow-sm mb-8">
          <blockquote className="text-gray-700 italic space-y-4">
            <p>"Bring ye all the tithes into the storehouse, that there may be meat in mine house, and prove me now herewith, saith the Lord of hosts, if I will not open you the windows of heaven, and pour you out a blessing, that there shall not be room enough to receive it.</p>
            <p>And I will rebuke the devourer for your sakes, and he shall not destroy the fruits of your ground; neither shall your vine cast her fruit before the time in the field, saith the Lord of hosts.</p>
            <p>And all nations shall call you blessed: for ye shall be a delightsome land, saith the Lord of hosts."</p>
            <footer className="text-right font-medium text-gray-600 not-italic">- Malachi 3:10-12</footer>
          </blockquote>
        </div>
        <a
          href="https://www.thereisnothingbutgod.com/tithing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
        >
          Learn More About Tithing
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Traditional Tithing</h3>
          <p className="text-gray-600 mb-4">
            Support our ministry through traditional methods by visiting our website.
          </p>
          <a
            href="https://www.thereisnothingbutgod.com/tithing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Tithe Now
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Crypto Tithing</h3>
          <p className="text-gray-600 mb-4">
            Support our ministry using your preferred cryptocurrency.
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowQR(true)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                showQR ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <QrCode className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowQR(false)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                !showQR ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Address
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cryptoOptions.map((crypto) => (
          <button
            key={crypto.name}
            onClick={() => setSelectedCrypto(crypto.name)}
            className={`relative p-4 rounded-xl transition-all ${
              selectedCrypto === crypto.name
                ? 'bg-white shadow-lg scale-105'
                : 'bg-gray-50 hover:bg-white hover:shadow-md'
            }`}
          >
            <img
              src={crypto.logo}
              alt={`${crypto.name} logo`}
              className="w-16 h-16 mx-auto mb-2 object-contain"
            />
            <p className="text-sm font-medium text-gray-900">{crypto.name}</p>
          </button>
        ))}
      </div>

      {selectedCrypto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {selectedCrypto} {showQR ? 'QR Code' : 'Address'}
              </h3>
              <button
                onClick={() => setSelectedCrypto(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {showQR ? (
              <img
                src={cryptoOptions.find(c => c.name === selectedCrypto)?.qrCode}
                alt={`${selectedCrypto} QR code`}
                className="w-full h-auto rounded-lg shadow-inner"
              />
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-gray-500 mb-2">Click to copy address:</p>
                <button
                  onClick={() => handleCopyAddress(
                    cryptoOptions.find(c => c.name === selectedCrypto)?.address || ''
                  )}
                  className="w-full p-3 bg-gray-50 rounded-lg text-left font-mono text-sm break-all hover:bg-gray-100 flex items-center justify-between group"
                >
                  <span>{cryptoOptions.find(c => c.name === selectedCrypto)?.address}</span>
                  {copiedAddress === cryptoOptions.find(c => c.name === selectedCrypto)?.address ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}