import React, { useRef } from 'react';
import { Download, Upload, AlertCircle, FileText } from 'lucide-react';
import { storage } from '../lib/storage';
import { generatePrintableContent } from '../lib/export/printFormat';

export function DataManagement() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const data = storage.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `heal-journal-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrintableExport = () => {
    const entries = storage.getAllEntries();
    const content = generatePrintableContent(entries);
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `heal-journal-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const success = storage.importData(content);
      if (success) {
        alert('Data imported successfully!');
        window.location.reload();
      } else {
        alert('Failed to import data. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Manage Your Data</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={handleExport}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Download className="w-5 h-5" />
            Backup Data
          </button>

          <button
            onClick={handlePrintableExport}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <FileText className="w-5 h-5" />
            Export as Text
          </button>
        </div>

        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImport}
            accept=".json"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Upload className="w-5 h-5" />
            Import Backup
          </button>
        </div>

        <div className="flex items-start gap-2 text-amber-600 bg-amber-50 p-4 rounded-lg">
          <AlertCircle className="w-5 h-5 mt-0.5" />
          <div className="text-sm">
            Your journal entries are stored securely on your device.
            Remember to export regular backups to keep your data safe.
          </div>
        </div>
      </div>
    </div>
  );
}