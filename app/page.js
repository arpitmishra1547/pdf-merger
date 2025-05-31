'use client';

import { useState } from 'react';
import PDFMerger from 'pdf-merger-js';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function Home() {
  const [files, setFiles] = useState([]);
  const [isMerging, setIsMerging] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles([...files, ...selectedFiles]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const mergePDFs = async () => {
    if (files.length < 2) {
      alert('Please select at least 2 PDF files to merge');
      return;
    }

    setIsMerging(true);
    try {
      const merger = new PDFMerger();
      
      for (const file of files) {
        await merger.add(file);
      }

      const mergedPdf = await merger.save();
      
      // Create download link
      const blob = new Blob([mergedPdf], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'merged.pdf';
      link.click();
      window.URL.revokeObjectURL(url);
      
      setFiles([]);
    } catch (error) {
      console.error('Error merging PDFs:', error);
      alert('Error merging PDFs. Please try again.');
    } finally {
      setIsMerging(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-blue-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Merge PDF Files Easily
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Combine multiple PDF files into one document in seconds
              </p>
            </div>
          </div>
        </section>

        {/* PDF Merger Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="mb-8">
                <input
                  type="file"
                  accept=".pdf"
                  multiple
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
              </div>

              {files.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Selected Files:</h3>
                  <ul className="space-y-2">
                    {files.map((file, index) => (
                      <li key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                        <span className="text-sm text-gray-600">{file.name}</span>
                        <button
                          onClick={() => removeFile(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={mergePDFs}
                disabled={isMerging || files.length < 2}
                className={`w-full py-3 px-4 rounded-md text-white font-medium
                  ${isMerging || files.length < 2
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                  }`}
              >
                {isMerging ? 'Merging...' : 'Merge PDFs'}
              </button>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Simple, Transparent Pricing</h2>
              <p className="mt-4 text-xl text-gray-600">Choose the plan that's right for you</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Free Plan */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Free</h3>
                <p className="text-4xl font-bold text-gray-900 mb-6">$0<span className="text-lg text-gray-600">/month</span></p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Merge up to 3 PDFs
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Basic PDF merging
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Standard support
                  </li>
                </ul>
                <button className="w-full py-3 px-4 bg-gray-200 text-gray-800 rounded-md font-medium hover:bg-gray-300">
                  Get Started
                </button>
              </div>

              {/* Premium Plan */}
              <div className="bg-blue-600 rounded-lg shadow-lg p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Premium</h3>
                <p className="text-4xl font-bold mb-6">$9.99<span className="text-lg opacity-80">/month</span></p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <span className="text-white mr-2">✓</span>
                    Unlimited PDF merging
                  </li>
                  <li className="flex items-center">
                    <span className="text-white mr-2">✓</span>
                    Advanced PDF features
                  </li>
                  <li className="flex items-center">
                    <span className="text-white mr-2">✓</span>
                    Priority support
                  </li>
                  <li className="flex items-center">
                    <span className="text-white mr-2">✓</span>
                    No ads
                  </li>
                </ul>
                <button className="w-full py-3 px-4 bg-white text-blue-600 rounded-md font-medium hover:bg-gray-100">
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
