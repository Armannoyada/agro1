import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCompanyInfo, getStatistics } from '../services/api';

// Create the context
const CompanyContext = createContext(null);

// Provider component
export const CompanyProvider = ({ children }) => {
    const [companyInfo, setCompanyInfo] = useState(null);
    const [statistics, setStatistics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [companyRes, statsRes] = await Promise.all([
                    getCompanyInfo(),
                    getStatistics()
                ]);

                if (companyRes.success && companyRes.data) {
                    setCompanyInfo(companyRes.data);
                }

                if (statsRes.success && statsRes.data) {
                    setStatistics(statsRes.data);
                }
            } catch (err) {
                console.error('Error fetching company data:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Helper function to get social links
    const getSocialLinks = () => {
        if (!companyInfo) return [];

        const links = [];
        if (companyInfo.facebook) links.push({ name: 'facebook', url: companyInfo.facebook });
        if (companyInfo.twitter) links.push({ name: 'twitter', url: companyInfo.twitter });
        if (companyInfo.instagram) links.push({ name: 'instagram', url: companyInfo.instagram });
        if (companyInfo.linkedin) links.push({ name: 'linkedin', url: companyInfo.linkedin });
        if (companyInfo.youtube) links.push({ name: 'youtube', url: companyInfo.youtube });
        if (companyInfo.whatsapp) links.push({ name: 'whatsapp', url: `https://wa.me/${companyInfo.whatsapp.replace(/\D/g, '')}` });

        return links;
    };

    // Helper function to get contact info
    const getContactInfo = () => {
        if (!companyInfo) return null;

        return {
            companyName: companyInfo.company_name || 'AgroTech Solutions',
            tagline: companyInfo.tagline || 'Growing Together, Harvesting Success',
            email: companyInfo.email || 'info@agrotech.com',
            phone: companyInfo.phone || '+91 9876543210',
            alternatePhone: companyInfo.alternate_phone || '',
            supportEmail: companyInfo.support_email || '',
            address: companyInfo.address || '',
            city: companyInfo.city || '',
            state: companyInfo.state || '',
            country: companyInfo.country || 'India',
            pincode: companyInfo.pincode || '',
            workingHours: companyInfo.working_hours || 'Mon - Sat: 9:00 AM - 6:00 PM',
            whatsapp: companyInfo.whatsapp || '',
            logo: companyInfo.logo || '',
            logoDark: companyInfo.logo_dark || '',
            aboutShort: companyInfo.about_short || '',
            mission: companyInfo.mission || '',
            vision: companyInfo.vision || '',
            foundedYear: companyInfo.founded_year || '',
            mapEmbed: companyInfo.map_embed || ''
        };
    };

    const value = {
        companyInfo,
        statistics,
        loading,
        error,
        getSocialLinks,
        getContactInfo
    };

    return (
        <CompanyContext.Provider value={value}>
            {children}
        </CompanyContext.Provider>
    );
};

// Custom hook to use the context
export const useCompany = () => {
    const context = useContext(CompanyContext);
    if (!context) {
        throw new Error('useCompany must be used within a CompanyProvider');
    }
    return context;
};

export default CompanyContext;
