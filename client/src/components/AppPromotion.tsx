import React from 'react';

const AppPromotion = () => {
  return (
    <section className="py-8 bg-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gray-200 rounded-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Left Content */}
            <div className="flex-1 p-8 lg:p-12">
              <div className="max-w-lg">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  <span className="text-orange-500 font-script text-3xl lg:text-4xl block mb-2">Unlock</span>
                  <span className="text-black">EXCLUSIVE</span>
                </h2>
                <h3 className="text-6xl lg:text-7xl font-black text-black mb-8">
                  OFFERS!
                </h3>
              </div>
            </div>
            
            {/* Center Phone */}
            <div className="flex-shrink-0 px-4">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=300&h=600&fit=crop"
                  alt="Phone mockup"
                  className="w-48 h-96 object-cover rounded-3xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 rounded-3xl"></div>
              </div>
            </div>
            
            {/* Right Content */}
            <div className="flex-1 p-8 lg:p-12 text-right">
              <div className="max-w-lg ml-auto">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                  DOWNLOAD THE<br />
                  <span className="text-black font-black">NIKZONE APP!</span>
                </h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                  <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center space-x-2">
                    <span>📱</span>
                    <div className="text-left">
                      <div className="text-xs">Download on the</div>
                      <div className="text-sm font-bold">App Store</div>
                    </div>
                  </button>
                  <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center space-x-2">
                    <span>📱</span>
                    <div className="text-left">
                      <div className="text-xs">GET IT ON</div>
                      <div className="text-sm font-bold">Google Play</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppPromotion;