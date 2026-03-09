import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Country, State, City } from 'country-state-city';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';

const BookSlot = () => {
    const [capacity, setCapacity] = useState([]);
    const [checking, setChecking] = useState(false);
    const navigate = useNavigate();

    const timeSlots = [
        '8:00-8:15', '8:15-8:30', '8:30-8:45', '8:45-9:00', '9:00-9:15', '9:15-9:30',
        '9:30-9:45', '9:45-10:00', '10:00-10:15', '10:15-10:30', '10:30-10:45', '10:45-11:00',
        '11:00-11:15', '11:15-11:30', '11:30-11:45', '11:45-12:00', '1:00-1:15', '1:15-1:30',
        '1:30-1:45', '1:45-2:00', '2:00-2:15', '2:15-2:30', '2:30-2:45', '2:45-3:00',
        '3:00-3:15', '3:15-3:30', '3:30-3:45', '3:45-4:00', '4:00-4:15', '4:15-4:30'
    ];

    const formik = useFormik({
        initialValues: {
            country: '', state: '', city: '', slot_date: '', slot_id: '',
            dose: '', vaccine_type: 'Covishield'
        },
        validationSchema: Yup.object({
            country: Yup.string().required('Required'),
            state: Yup.string().required('Required'),
            city: Yup.string().required('Required'),
            slot_date: Yup.date().required('Required'),
            slot_id: Yup.string().required('Required'),
            dose: Yup.string().required('Required')
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                await api.post('/slots/book', values);
                toast.success('🎉 Slot booked successfully!');
                navigate('/my-bookings');
            } catch (error) {
                toast.error(error.response?.data?.message || 'Booking failed');
            } finally {
                setSubmitting(false);
            }
        }
    });

    const checkCapacity = async () => {
        if (!formik.values.slot_date || !formik.values.country || !formik.values.state || !formik.values.city) {
            return;
        }

        setChecking(true);
        try {
            const { data } = await api.post('/slots/capacity', {
                date: formik.values.slot_date,
                country: formik.values.country,
                state: formik.values.state,
                city: formik.values.city
            });
            setCapacity(data.capacity);
            toast.success('✅ Slot availability updated');
        } catch (error) {
            toast.error('Failed to check capacity');
        } finally {
            setChecking(false);
        }
    };

    useEffect(() => {
        if (formik.values.slot_date && formik.values.city) {
            checkCapacity();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formik.values.slot_date, formik.values.city]);

    const countries = Country.getAllCountries();
    const states = formik.values.country 
        ? State.getStatesOfCountry(countries.find(c => c.name === formik.values.country)?.isoCode)
        : [];
    const cities = formik.values.state
        ? City.getCitiesOfState(
            countries.find(c => c.name === formik.values.country)?.isoCode,
            states.find(s => s.name === formik.values.state)?.isoCode
          )
        : [];

    const getSlotStatus = (slotId) => {
        const slot = capacity.find(c => c._id === slotId);
        if (!slot) return { available: 2, status: 'available' };
        const available = 2 - slot.count;
        return {
            available,
            status: available === 0 ? 'full' : available === 1 ? 'limited' : 'available'
        };
    };

    const minDate = new Date(Date.now() + 86400000).toISOString().split('T')[0];

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="card animate-fadeIn">
                    <div className="flex items-center mb-8">
                        <div className="h-12 w-12 bg-gradient-to-r from-primary-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-4">
                            <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Book Vaccination Slot</h2>
                            <p className="text-gray-600">Select your preferred date, time, and location</p>
                        </div>
                    </div>

                    <form onSubmit={formik.handleSubmit} className="space-y-6">
                        {/* Location Section */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <svg className="h-5 w-5 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Location Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Country *</label>
                                    <select {...formik.getFieldProps('country')} className="input-field">
                                        <option value="">Select Country</option>
                                        {countries.map(c => <option key={c.isoCode} value={c.name}>{c.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">State *</label>
                                    <select {...formik.getFieldProps('state')} className="input-field">
                                        <option value="">Select State</option>
                                        {states.map(s => <option key={s.isoCode} value={s.name}>{s.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                                    <select {...formik.getFieldProps('city')} className="input-field">
                                        <option value="">Select City</option>
                                        {cities.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Date & Vaccine Section */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
                                <input type="date" min={minDate} {...formik.getFieldProps('slot_date')} className="input-field" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Dose *</label>
                                <select {...formik.getFieldProps('dose')} className="input-field">
                                    <option value="">Select Dose</option>
                                    <option value="Dose 1">Dose 1</option>
                                    <option value="Dose 2">Dose 2</option>
                                    <option value="Booster">Booster</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Vaccine Type *</label>
                                <select {...formik.getFieldProps('vaccine_type')} className="input-field">
                                    <option value="Covishield">Covishield</option>
                                    <option value="Covaxin">Covaxin</option>
                                    <option value="Sputnik V">Sputnik V</option>
                                    <option value="Moderna">Moderna</option>
                                    <option value="Pfizer">Pfizer</option>
                                </select>
                            </div>
                        </div>

                        {/* Time Slots */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <label className="block text-sm font-semibold text-gray-700">Select Time Slot *</label>
                                {checking && <span className="text-sm text-primary-600 animate-pulse">Checking availability...</span>}
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                {timeSlots.map(slot => {
                                    const { available, status } = getSlotStatus(slot);
                                    return (
                                        <button
                                            key={slot}
                                            type="button"
                                            disabled={status === 'full'}
                                            onClick={() => formik.setFieldValue('slot_id', slot)}
                                            className={`py-3 px-2 rounded-xl font-medium text-sm transition-all ${
                                                formik.values.slot_id === slot
                                                    ? 'bg-primary-500 text-white shadow-lg scale-105'
                                                    : status === 'full'
                                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                    : status === 'limited'
                                                    ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border-2 border-yellow-200'
                                                    : 'bg-green-50 text-green-700 hover:bg-green-100 border-2 border-green-200'
                                            }`}
                                        >
                                            <div>{slot}</div>
                                            <div className="text-xs mt-1">
                                                {status === 'full' ? '❌ Full' : `✅ ${available} left`}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="flex items-center gap-6 text-sm bg-gray-50 p-4 rounded-xl">
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-green-200 rounded mr-2"></div>
                                <span>Available</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-yellow-200 rounded mr-2"></div>
                                <span>Limited</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
                                <span>Full</span>
                            </div>
                        </div>

                        <button type="submit" disabled={formik.isSubmitting} className="w-full btn-primary text-lg py-4">
                            {formik.isSubmitting ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Booking...
                                </span>
                            ) : (
                                '🎯 Confirm Booking'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookSlot;
