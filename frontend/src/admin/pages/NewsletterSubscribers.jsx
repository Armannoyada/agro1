import React, { useState, useEffect } from 'react';
import {
    Box, Card, CardContent, Typography, TextField, InputAdornment,
    Button, Chip,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Search, FileDownload, CheckCircle, Cancel } from '@mui/icons-material';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost/Agro/agro1/backend';

const NewsletterSubscribers = () => {
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => { fetchSubscribers(); }, []);

    const fetchSubscribers = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/newsletter.php`);
            setSubscribers(response.data.data || []);
        } catch (error) {
            toast.error('Failed to fetch newsletter subscribers');
            setSubscribers([]);
        } finally {
            setLoading(false);
        }
    };

    const handleExportExcel = () => {
        window.open(`${API_URL}/export-newsletter.php`, '_blank');
        toast.success('Downloading Excel file...');
    };

    const formatDate = (dateString) => {
        if (!dateString) return '—';
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const filteredSubscribers = subscribers.filter((s) =>
        (s.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

    const columns = [
        { field: 'id', headerName: 'ID', width: 80 },
        { field: 'email', headerName: 'Email', width: 300 },
        {
            field: 'is_active',
            headerName: 'Status',
            width: 120,
            renderCell: (params) => (
                params.value === 1 || params.value === '1' ? (
                    <Chip icon={<CheckCircle fontSize="small" />} label="Active" size="small" color="success" />
                ) : (
                    <Chip icon={<Cancel fontSize="small" />} label="Unsubscribed" size="small" color="error" />
                )
            )
        },
        {
            field: 'subscribed_at',
            headerName: 'Subscribed At',
            width: 200,
            renderCell: (params) => formatDate(params.value)
        },
        {
            field: 'unsubscribed_at',
            headerName: 'Unsubscribed At',
            width: 200,
            renderCell: (params) => formatDate(params.value)
        },
    ];

    const activeCount = subscribers.filter(s => s.is_active === 1 || s.is_active === '1').length;
    const inactiveCount = subscribers.length - activeCount;

    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h4" fontWeight={700}>Newsletter Subscribers</Typography>
                <Typography color="text.secondary">Manage email newsletter subscriptions</Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Card sx={{ flex: 1 }}>
                    <CardContent>
                        <Typography variant="h4" color="success.main" fontWeight={700}>{activeCount}</Typography>
                        <Typography color="text.secondary">Active Subscribers</Typography>
                    </CardContent>
                </Card>
                <Card sx={{ flex: 1 }}>
                    <CardContent>
                        <Typography variant="h4" color="error.main" fontWeight={700}>{inactiveCount}</Typography>
                        <Typography color="text.secondary">Unsubscribed</Typography>
                    </CardContent>
                </Card>
                <Card sx={{ flex: 1 }}>
                    <CardContent>
                        <Typography variant="h4" color="primary.main" fontWeight={700}>{subscribers.length}</Typography>
                        <Typography color="text.secondary">Total</Typography>
                    </CardContent>
                </Card>
            </Box>

            <Card>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <TextField
                            placeholder="Search by email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            size="small"
                            sx={{ width: 300 }}
                            InputProps={{ startAdornment: <InputAdornment position="start"><Search /></InputAdornment> }}
                        />
                        <Button
                            variant="contained"
                            color="success"
                            startIcon={<FileDownload />}
                            onClick={handleExportExcel}
                            disabled={subscribers.length === 0}
                        >
                            Export Excel
                        </Button>
                    </Box>
                    <DataGrid
                        rows={filteredSubscribers}
                        columns={columns}
                        pageSize={25}
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        autoHeight
                        disableSelectionOnClick
                        loading={loading}
                        sx={{ border: 'none' }}
                        initialState={{
                            sorting: {
                                sortModel: [{ field: 'subscribed_at', sort: 'desc' }],
                            },
                        }}
                    />
                </CardContent>
            </Card>
        </Box>
    );
};

export default NewsletterSubscribers;
