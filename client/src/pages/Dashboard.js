import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../utils/api';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const [genderData, setGenderData] = useState([]);
    const [covidData, setCovidData] = useState([]);
    const [doseData, setDoseData] = useState([]);
    const [stats, setStats] = useState(null);
    const [selectedDose, setSelectedDose] = useState('Dose 1');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDose]);

    const fetchData = async () => {
        try {
            const [gender, covid, dose, overall] = await Promise.all([
                api.get('/analytics/gender'),
                api.get('/analytics/covid'),
                api.post('/analytics/dose', { dose: selectedDose }),
                api.get('/analytics/overall')
            ]);

            setGenderData(gender.data.gender);
            setCovidData(covid.data.covid);
            setDoseData(dose.data.dose);
            setStats(overall.data.stats);
        } catch (error) {
            toast.error('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-primary-500 mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    const statCards = [
        { title: 'Total Users', value: stats?.totalUsers || 0, icon: '👥', gradient: 'from-blue-500 to-blue-600', delay: '0' },
        { title: 'Total Bookings', value: stats?.totalBookings || 0, icon: '📅', gradient: 'from-green-500 to-green-600', delay: '100' },
        { title: 'Dose 1 Given', value: stats?.dose1Count || 0, icon: '💉', gradient: 'from-purple-500 to-purple-600', delay: '200' },
        { title: 'Dose 2 Given', value: stats?.dose2Count || 0, icon: '✅', gradient: 'from-pink-500 to-pink-600', delay: '300' }
    ];

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 animate-fadeIn">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                        Dashboard Overview
                    </h1>
                    <p className="text-gray-600">Monitor vaccination statistics and trends</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {statCards.map((stat, index) => (
                        <div
                            key={index}
                            className={`stat-card bg-gradient-to-br ${stat.gradient} text-white animate-fadeIn`}
                            style={{ animationDelay: `${stat.delay}ms` }}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm opacity-90 font-medium">{stat.title}</p>
                                    <p className="text-4xl font-bold mt-2">{stat.value}</p>
                                </div>
                                <div className="text-5xl opacity-80">{stat.icon}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Gender Distribution */}
                    <div className="card animate-slideIn" style={{ animationDelay: '400ms' }}>
                        <div className="flex items-center mb-6">
                            <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
                                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Gender Distribution</h3>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={genderData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="_id" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                                />
                                <Bar dataKey="count" fill="url(#colorGender)" radius={[8, 8, 0, 0]} />
                                <defs>
                                    <linearGradient id="colorGender" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#5B67CD" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#5B67CD" stopOpacity={0.3}/>
                                    </linearGradient>
                                </defs>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* COVID History */}
                    <div className="card animate-slideIn" style={{ animationDelay: '500ms' }}>
                        <div className="flex items-center mb-6">
                            <div className="h-10 w-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-3">
                                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">COVID History</h3>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={covidData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="_id" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                                />
                                <Bar dataKey="count" fill="url(#colorCovid)" radius={[8, 8, 0, 0]} />
                                <defs>
                                    <linearGradient id="colorCovid" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0.3}/>
                                    </linearGradient>
                                </defs>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Monthly Trends */}
                <div className="card animate-fadeIn" style={{ animationDelay: '600ms' }}>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <div className="flex items-center">
                            <div className="h-10 w-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-3">
                                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Monthly Booking Trends</h3>
                        </div>
                        <select
                            value={selectedDose}
                            onChange={(e) => setSelectedDose(e.target.value)}
                            className="input-field w-full sm:w-48 py-2"
                        >
                            <option value="Dose 1">Dose 1</option>
                            <option value="Dose 2">Dose 2</option>
                            <option value="Booster">Booster</option>
                        </select>
                    </div>
                    <ResponsiveContainer width="100%" height={350}>
                        <LineChart data={doseData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="_id" stroke="#6b7280" />
                            <YAxis stroke="#6b7280" />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                            />
                            <Legend />
                            <Line 
                                type="monotone" 
                                dataKey="count" 
                                stroke="#5B67CD" 
                                strokeWidth={3}
                                dot={{ fill: '#5B67CD', strokeWidth: 2, r: 5 }}
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
