import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Country, State, City } from 'country-state-city';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    const formik = useFormik({
        initialValues: {
            first_name: '', last_name: '', email: '', password: '', gender: '',
            covid: '', phone: '', aadhar: '', dob: '', country: '', state: '', city: ''
        },
        validationSchema: Yup.object({
            first_name: Yup.string().required('Required'),
            last_name: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email').required('Required'),
            password: Yup.string().min(6, 'Min 6 characters').required('Required'),
            gender: Yup.string().required('Required'),
            covid: Yup.string().required('Required'),
            phone: Yup.string().matches(/^\d{10}$/, '10 digits required').required('Required'),
            aadhar: Yup.string().matches(/^\d{12}$/, '12 digits required').required('Required'),
            dob: Yup.date().required('Required'),
            country: Yup.string().required('Required'),
            state: Yup.string().required('Required'),
            city: Yup.string().required('Required')
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                await register(values);
                toast.success('🎉 Account created successfully!');
                navigate('/dashboard');
            } catch (error) {
                toast.error(error.response?.data?.message || 'Registration failed');
            } finally {
                setSubmitting(false);
            }
        }
    });

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

    const nextStep = () => {
        const step1Fields = ['first_name', 'last_name', 'email', 'password'];
        const step2Fields = ['gender', 'phone', 'aadhar', 'dob'];
        
        if (step === 1) {
            const hasErrors = step1Fields.some(field => formik.errors[field]);
            if (!hasErrors && step1Fields.every(field => formik.values[field])) {
                setStep(2);
            } else {
                step1Fields.forEach(field => formik.setFieldTouched(field, true));
            }
        } else if (step === 2) {
            const hasErrors = step2Fields.some(field => formik.errors[field]);
            if (!hasErrors && step2Fields.every(field => formik.values[field])) {
                setStep(3);
            } else {
                step2Fields.forEach(field => formik.setFieldTouched(field, true));
            }
        }
    };

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Progress Bar */}
                <div className="mb-8 animate-fadeIn">
                    <div className="flex items-center justify-center mb-4">
                        {[1, 2, 3].map((s) => (
                            <React.Fragment key={s}>
                                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all duration-300 ${
                                    step >= s ? 'bg-primary-500 text-white shadow-lg scale-110' : 'bg-gray-200 text-gray-500'
                                }`}>
                                    {s}
                                </div>
                                {s < 3 && (
                                    <div className={`w-20 h-1 mx-2 transition-all duration-300 ${
                                        step > s ? 'bg-primary-500' : 'bg-gray-200'
                                    }`} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-gray-600 font-medium">
                            {step === 1 && 'Personal Information'}
                            {step === 2 && 'Contact & Health Details'}
                            {step === 3 && 'Location Information'}
                        </p>
                    </div>
                </div>

                <div className="card animate-fadeIn">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Create Your Account</h2>
                        <p className="text-gray-600 mt-2">Join VaxBook for easy vaccination booking</p>
                    </div>

                    <form onSubmit={formik.handleSubmit} className="space-y-6">
                        {/* Step 1: Personal Info */}
                        {step === 1 && (
                            <div className="space-y-4 animate-slideIn">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
                                        <input {...formik.getFieldProps('first_name')} className="input-field" placeholder="John" />
                                        {formik.touched.first_name && formik.errors.first_name && (
                                            <p className="text-red-500 text-xs mt-1">{formik.errors.first_name}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
                                        <input {...formik.getFieldProps('last_name')} className="input-field" placeholder="Doe" />
                                        {formik.touched.last_name && formik.errors.last_name && (
                                            <p className="text-red-500 text-xs mt-1">{formik.errors.last_name}</p>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                                    <input type="email" {...formik.getFieldProps('email')} className="input-field" placeholder="john@example.com" />
                                    {formik.touched.email && formik.errors.email && (
                                        <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Password *</label>
                                    <input type="password" {...formik.getFieldProps('password')} className="input-field" placeholder="Min 6 characters" />
                                    {formik.touched.password && formik.errors.password && (
                                        <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Step 2: Contact & Health */}
                        {step === 2 && (
                            <div className="space-y-4 animate-slideIn">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Gender *</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {['Male', 'Female', 'Other'].map(g => (
                                            <button
                                                key={g}
                                                type="button"
                                                onClick={() => formik.setFieldValue('gender', g)}
                                                className={`py-3 px-4 rounded-xl font-medium transition-all ${
                                                    formik.values.gender === g
                                                        ? 'bg-primary-500 text-white shadow-lg'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                            >
                                                {g}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                                        <input {...formik.getFieldProps('phone')} className="input-field" placeholder="10 digits" maxLength="10" />
                                        {formik.touched.phone && formik.errors.phone && (
                                            <p className="text-red-500 text-xs mt-1">{formik.errors.phone}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Aadhar Number *</label>
                                        <input {...formik.getFieldProps('aadhar')} className="input-field" placeholder="12 digits" maxLength="12" />
                                        {formik.touched.aadhar && formik.errors.aadhar && (
                                            <p className="text-red-500 text-xs mt-1">{formik.errors.aadhar}</p>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth *</label>
                                    <input type="date" {...formik.getFieldProps('dob')} className="input-field" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Previously infected with COVID? *</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {['Yes', 'No'].map(c => (
                                            <button
                                                key={c}
                                                type="button"
                                                onClick={() => formik.setFieldValue('covid', c)}
                                                className={`py-3 px-4 rounded-xl font-medium transition-all ${
                                                    formik.values.covid === c
                                                        ? 'bg-primary-500 text-white shadow-lg'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                            >
                                                {c}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Location */}
                        {step === 3 && (
                            <div className="space-y-4 animate-slideIn">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Country *</label>
                                    <select {...formik.getFieldProps('country')} className="input-field">
                                        <option value="">Select Country</option>
                                        {countries.map(c => <option key={c.isoCode} value={c.name}>{c.name}</option>)}
                                    </select>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between pt-6 border-t">
                            {step > 1 && (
                                <button type="button" onClick={() => setStep(step - 1)} className="btn-secondary">
                                    ← Previous
                                </button>
                            )}
                            {step < 3 ? (
                                <button type="button" onClick={nextStep} className="btn-primary ml-auto">
                                    Next →
                                </button>
                            ) : (
                                <button type="submit" disabled={formik.isSubmitting} className="btn-primary ml-auto">
                                    {formik.isSubmitting ? 'Creating Account...' : 'Create Account'}
                                </button>
                            )}
                        </div>
                    </form>

                    <p className="text-center text-sm text-gray-600 mt-6">
                        Already have an account?{' '}
                        <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-500">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
