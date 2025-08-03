import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../contexts/BookingContext';
import { CreditCard, Wallet, Gift, CheckCircle, Clock, MapPin } from 'lucide-react';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { currentBooking, confirmBooking } = useBooking();
  const [paymentMethod, setPaymentMethod] = useState<'crypto' | 'card'>('crypto');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });
  const [walletConnected, setWalletConnected] = useState(false);
  const [processing, setProcessing] = useState(false);

  if (!currentBooking) {
    navigate('/stations');
    return null;
  }

  const handleConnectWallet = async () => {
    setProcessing(true);
    // Simulate wallet connection
    setTimeout(() => {
      setWalletConnected(true);
      setProcessing(false);
    }, 2000);
  };

  const handlePayment = async () => {
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const bookingId = confirmBooking();
      setProcessing(false);
      navigate('/dashboard', { 
        state: { 
          showSuccess: true, 
          bookingId,
          nftMinted: Math.random() > 0.5 
        } 
      });
    }, 3000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Booking</h1>
        <p className="text-gray-600">Review your details and complete payment</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Booking Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Booking Summary</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium">{currentBooking.stationName}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium">{formatDate(currentBooking.date)}</p>
                <p className="text-gray-600">{currentBooking.time}</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4 mb-6">
            <h3 className="font-semibold mb-3">Selected Services</h3>
            <div className="space-y-3">
              {currentBooking.services.map((service: any) => (
                <div key={service.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-gray-600">{service.duration} minutes</p>
                  </div>
                  <span className="font-medium">${service.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total</span>
              <span className="text-purple-600">${currentBooking.totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
          
          {/* Payment Method Selection */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => setPaymentMethod('crypto')}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                paymentMethod === 'crypto'
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Wallet className="h-6 w-6 mx-auto mb-2 text-purple-600" />
              <span className="text-sm font-medium">Hedera Crypto</span>
            </button>
            <button
              onClick={() => setPaymentMethod('card')}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                paymentMethod === 'card'
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <CreditCard className="h-6 w-6 mx-auto mb-2 text-teal-600" />
              <span className="text-sm font-medium">Credit/Debit Card</span>
            </button>
          </div>

          {/* Crypto Payment */}
          {paymentMethod === 'crypto' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Gift className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-purple-800">NFT Reward</p>
                    <p className="text-xs text-purple-600">
                      Complete this booking with crypto to receive a unique NFT collectible!
                    </p>
                  </div>
                </div>
              </div>

              {!walletConnected ? (
                <button
                  onClick={handleConnectWallet}
                  disabled={processing}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 font-semibold disabled:opacity-50"
                >
                  {processing ? 'Connecting...' : 'Connect Hedera Wallet'}
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Wallet Connected</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Wallet Address:</p>
                    <p className="font-mono text-sm">0x742d35cc0bf4d8e...9d61f8f9</p>
                  </div>
                  <button
                    onClick={handlePayment}
                    disabled={processing}
                    className="w-full bg-gradient-to-r from-purple-600 to-teal-600 text-white py-4 px-4 rounded-lg hover:from-purple-700 hover:to-teal-700 transition-all duration-200 font-semibold disabled:opacity-50"
                  >
                    {processing ? 'Processing Payment...' : `Pay ${currentBooking.totalPrice} HBAR`}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Card Payment */}
          {paymentMethod === 'card' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails(prev => ({ ...prev, number: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails(prev => ({ ...prev, expiry: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              
              <button
                onClick={handlePayment}
                disabled={processing}
                className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-4 px-4 rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all duration-200 font-semibold disabled:opacity-50"
              >
                {processing ? 'Processing Payment...' : `Pay $${currentBooking.totalPrice}`}
              </button>
            </div>
          )}

          {processing && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <p className="text-blue-800 font-medium">
                  {paymentMethod === 'crypto' ? 'Processing blockchain transaction...' : 'Processing payment...'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;