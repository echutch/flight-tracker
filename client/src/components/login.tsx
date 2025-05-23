import React, { useState } from 'react';
import { User, SavedFlight } from '../services/service';

interface LoginProps {
    user: User | null;
    onLogin: (password: string) => void;
    onLogout: () => void;
    onSave: () => void;
    saved: SavedFlight[] | null;
    onDelete: (flightID: number) => void;
    onUpdate: (savedFlightID: number, quantity: number) => void;
}

const Login: React.FC<LoginProps> = ({ user, onLogin, onLogout, onSave, saved, onDelete, onUpdate} ) => {
    const [isLoginVisible, setIsLoginVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [isSavedVisible, setIsSavedVisible] = useState(false);

    const handleLoginClick = () => {
        setIsLoginVisible(true);
    };

    const handleCloseClick = () => {
        setIsLoginVisible(false);
        setIsSavedVisible(false);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onLogin(password);
        setPassword('');
        setIsLoginVisible(false);
    };

    const handleLogout = () => {
        onLogout();
    };

    const handleSaved = () => {
        onSave();
        setIsSavedVisible(true);
    };

    return (
        <div>
            {!user ? (
                <button
                    onClick={handleLoginClick}
                    className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                >
                    Login
                </button>
            ) : (
                <div className="flex items-center space-x-4">
                    <span className="text-lg font-semibold">Welcome, {user.FirstName}!</span>
                        <button
                            onClick={handleSaved}
                            className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                        >
                            Saved Flights
                        </button>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                        >
                            Logout
                        </button>
                </div>

            )}
            
            {isLoginVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Enter your password"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={handleCloseClick}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

{isSavedVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-128">
                        <h2 className="text-xl font-bold mb-4 text-center">Saved Flights</h2>
                        <div className="space-y-4"> 
  {saved && saved.map((flight) => (
    <div
      key={flight.FlightID}
      className="p-4 border border-gray-300 rounded-lg shadow-sm bg-white"
    >
      <p className="text-sm text-gray-900">
        <span className="font-semibold text-indigo-600">Flight ID:</span> {flight.FlightID} |{" "}
        <span className="font-semibold text-indigo-600">From:</span> {flight.DepName} |{" "}
        <span className="font-semibold text-indigo-600">To:</span> {flight.DestName} |{" "}
        <span className="font-semibold text-indigo-600">Price:</span> ${flight.FlightPrice}
        
      </p>
      <div className="mt-2 flex justify-center items-center space-x-4">
        <button
          className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
          onClick={(event) => onDelete(flight.FlightID)}
        >
          Delete Flight
        </button>
        <div className="flex items-center space-x-2">
    <label htmlFor={`quantity-${flight.FlightID}`} className="text-sm font-medium text-gray-700">
      Quantity:
    </label>
    <select
      id={`quantity-${flight.FlightID}`}
      className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
      defaultValue={flight.Quantity}
      onChange={(event) => {
        const newQuantity = parseInt(event.target.value);
        onUpdate(flight.SavedFlightID, newQuantity);
        flight.Quantity = newQuantity; }}
    >
      {Array.from({ length: 150 }, (_, i) => (
        <option key={i + 1} value={i + 1}>
          {i + 1}
        </option>
      ))}
    </select>
  </div>
      </div>
    </div>
  ))}
</div>
<div className="mt-6 flex justify-end"> 
  <button
    type="button"
    onClick={handleCloseClick}
    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
  >
    Close
  </button>
</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;