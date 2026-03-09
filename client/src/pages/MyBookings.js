import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import api from '../utils/api';
import toast from 'react-hot-toast';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const { data } = await api.get('/slots/my-bookings');
            setBookings(data.slots);
        } catch (error) {
            toast.error('Failed to load bookings');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (id) => {
        if (!window.confirm('Are you sure you want to cancel this booking?')) return;

        try {
            await api.patch(`/slots/cancel/${id}`);
            toast.success('✅ Booking cancelled successfully');
            fetchBookings();
        } catch (error) {
            toast.error('Failed to cancel booking');
        }
    };

    const filteredBookings = bookings.filter(b => 
        filter === 'all' || b.status === filter
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-primary-500 mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading bookings...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8 animate-fadeIn">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">My Bookings</h1>
                    <p className="text-gray-600">View and manage your vaccination appointments</p>
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-3 mb-6 animate-slideIn">
                    {[
                        { value: 'all', label: 'All', icon: '📋' },
                        { value: 'confirmed', label: 'Confirmed', icon: '✅' },
                        { value: 'cancelled', label: 'Cancelled', icon: '❌' }
                    ].map(tab => (
                        <button
                            key={tab.value}
                            onClick={() => setFilter(tab.value)}
                            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                                filter === tab.value
                                    ? 'bg-primary-500 text-white shadow-lg scale-105'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                            }`}
                        >
                            <span className="mr-2">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {filteredBookings.length === 0 ? (
                    <div className="card text-center py-16 animate-fadeIn">
                        <div className="text-6xl mb-4">📅</div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No bookings found</h3>
                        <p className="text-gray-600 mb-6">Start by booking your vaccination slot</p>
                        <a href="/book-slot" className="btn-primary inline-block">
                            Book a Slot →
                        </a>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {filteredBookings.map((booking, index) => (
                            <div 
                                key={booking._id} 
                                className="card hover:shadow-2xl transition-all animate-fadeIn"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="flex flex-col lg:flex-row justify-between gap-6">
                                    <div className="flex-1">
                                        {/* Status & Dose Badges */}
                                        <div className="flex flex-wrap items-center gap-3 mb-4">
                                            <span className={`px-4 py-2 rounded-xl text-sm font-bold ${
                                                booking.status === 'confirmed' 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : booking.status === 'cancelled' 
                                                    ? 'bg-red-100 text-red-800' 
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}>
                                                {booking.status === 'confirmed' && '✅ '}
                                                {booking.status === 'cancelled' && '❌ '}
                                                {booking.status.toUpperCase()}
                                            </span>
                                            <span className="px-4 py-2 rounded-xl text-sm font-bold bg-blue-100 text-blue-800">
                                                💉 {booking.dose}
                                            </span>
                                            <span className="px-4 py-2 rounded-xl text-sm font-bold bg-purple-100 text-purple-800">
                                                {booking.vaccine_type}
                                            </span>
                                        </div>

                                        {/* Booking Details Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl">
                                                <p className="text-xs text-gray-600 font-semibold mb-1">📅 Date</p>
                                                <p className="font-bold text-gray-900">{format(new Date(booking.slot_date), 'PPP')}</p>
                                            </div>
                                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
                                                <p className="text-xs text-gray-600 font-semibold mb-1">🕐 Time</p>
                                                <p className="font-bold text-gray-900">{booking.slot_id}</p>
                                            </div>
                                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
                                                <p className="text-xs text-gray-600 font-semibold mb-1">📍 Location</p>
                                                <p className="font-bold text-gray-900">{booking.city}, {booking.state}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    {booking.status === 'confirmed' && (
                                        <div className="flex items-center">
                                            <button
                                                onClick={() => handleCancel(booking._id)}
                                                className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                                            >
                                                Cancel Booking
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;
