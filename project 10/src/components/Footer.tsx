import React from 'react';
import { ExternalLink } from 'lucide-react';

const links = [
  { name: 'Privacy Policy', url: 'https://thereisnothingbutgod.com/privacy' },
  { name: 'Terms and Conditions', url: 'https://thereisnothingbutgod.com/terms-conditions-1#fabb29ed-cba7-4721-bc63-139a4b4ec7a8' },
  { name: 'Disclaimer', url: 'https://thereisnothingbutgod.com/disclaimer' },
  { name: 'GDPR', url: 'https://thereisnothingbutgod.com/gdpr' },
  { name: 'Cookie Policy', url: 'https://thereisnothingbutgod.com/cookie-policy' }
];

export function Footer() {
  return (
    <footer className="mt-auto">
      {/* Developer section with neon effect */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative w-[180px] h-[180px] mx-auto mb-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse blur-md"></div>
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl">
              <img
                src="https://imgur.com/4xHwLuT.png"
                alt="Matthew David Hurtado"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
          <p className="text-center text-2xl font-dancing-script text-gray-800 mb-12" style={{ fontFamily: 'cursive' }}>
            Developed by Matthew David Hurtado
          </p>
        </div>
      </div>

      {/* Ministry section with dark gradient */}
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <p className="text-2xl font-semibold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                ALLOW MINISTRIES 508(C)(1)(A)
              </p>
              <div className="space-y-2 text-gray-300">
                <p>1505 S US HWY 301, SUITE 82</p>
                <p>TAMPA, FL 33619</p>
              </div>
            </div>

            <div className="text-gray-300">
              <p className="font-medium">Emergency Only:</p>
              <a 
                href="tel:+16084590664" 
                className="text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                608-459-0664
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
              {links.map((link, index) => (
                <React.Fragment key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-1"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  {index < links.length - 1 && (
                    <span className="text-gray-600">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="pt-8 border-t border-gray-700">
              <p className="text-sm text-gray-400">
                Copyright © {new Date().getFullYear()} ALLOW MINISTRIES. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}