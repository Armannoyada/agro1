import React, { useState, useEffect } from 'react';
import {
  Box, Card, CardContent, Typography, Chip, TextField, InputAdornment,
  IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Grid, Tabs, Tab,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Search, Visibility, CheckCircle, Cancel, Pending, Email, Phone } from '@mui/icons-material';
import { getServiceInquiries, updateInquiryStatus } from '../services/api';
import toast from 'react-hot-toast';

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState('all');
  const [viewDialog, setViewDialog] = useState({ open: false, inquiry: null });

  useEffect(() => { fetchInquiries(); }, []);

  const fetchInquiries = async () => {
    try {
      const response = await getServiceInquiries();
      setInquiries(response.data || []);
    } catch (error) {
      toast.error('Failed to fetch inquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateInquiryStatus(id, status);
      toast.success('Status updated successfully');
      fetchInquiries();
      setViewDialog({ open: false, inquiry: null });
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const getStatusChip = (status) => {
    const config = { pending: { icon: <Pending fontSize="small" />, color: 'warning' }, approved: { icon: <CheckCircle fontSize="small" />, color: 'success' }, rejected: { icon: <Cancel fontSize="small" />, color: 'error' } }[status] || { icon: <Pending fontSize="small" />, color: 'warning' };
    return <Chip icon={config.icon} label={status?.charAt(0).toUpperCase() + status?.slice(1)} size="small" color={config.color} />;
  };

  const filteredInquiries = inquiries.filter((i) => {
    const matchesSearch = i.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || i.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = tabValue === 'all' || i.status === tabValue;
    return matchesSearch && matchesTab;
  });

  const columns = [
    { field: 'full_name', headerName: 'Name', width: 180 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 140 },
    { field: 'service_name', headerName: 'Service', width: 180 },
    { field: 'investment_amount', headerName: 'Investment', width: 130, renderCell: (params) => `₹${params.value?.toLocaleString() || 0}` },
    { field: 'status', headerName: 'Status', width: 120, renderCell: (params) => getStatusChip(params.value) },
    { field: 'created_at', headerName: 'Date', width: 120, renderCell: (params) => new Date(params.value).toLocaleDateString() },
    { field: 'actions', headerName: 'Actions', width: 80, sortable: false, renderCell: (params) => <Tooltip title="View Details"><IconButton size="small" color="primary" onClick={() => setViewDialog({ open: true, inquiry: params.row })}><Visibility /></IconButton></Tooltip> },
  ];

  const tabCounts = { all: inquiries.length, pending: inquiries.filter((i) => i.status === 'pending').length, approved: inquiries.filter((i) => i.status === 'approved').length, rejected: inquiries.filter((i) => i.status === 'rejected').length };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>Service Inquiries</Typography>
        <Typography color="text.secondary">Manage investment applications and service requests</Typography>
      </Box>

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
            <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
              <Tab label={`All (${tabCounts.all})`} value="all" />
              <Tab label={`Pending (${tabCounts.pending})`} value="pending" />
              <Tab label={`Approved (${tabCounts.approved})`} value="approved" />
              <Tab label={`Rejected (${tabCounts.rejected})`} value="rejected" />
            </Tabs>
            <TextField placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} size="small" sx={{ width: 250 }} InputProps={{ startAdornment: <InputAdornment position="start"><Search /></InputAdornment> }} />
          </Box>
          <DataGrid rows={filteredInquiries} columns={columns} pageSize={10} autoHeight disableSelectionOnClick loading={loading} sx={{ border: 'none' }} />
        </CardContent>
      </Card>

      <Dialog open={viewDialog.open} onClose={() => setViewDialog({ open: false, inquiry: null })} maxWidth="md" fullWidth>
        <DialogTitle>Inquiry Details</DialogTitle>
        <DialogContent>
          {viewDialog.inquiry && (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}><Typography variant="subtitle2" color="text.secondary">Full Name</Typography><Typography fontWeight={500}>{viewDialog.inquiry.full_name}</Typography></Grid>
              <Grid item xs={12} md={6}><Typography variant="subtitle2" color="text.secondary">Service</Typography><Typography fontWeight={500}>{viewDialog.inquiry.service_name || 'N/A'}</Typography></Grid>
              <Grid item xs={12} md={6}><Typography variant="subtitle2" color="text.secondary">Email</Typography><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Email fontSize="small" color="primary" /><Typography>{viewDialog.inquiry.email}</Typography></Box></Grid>
              <Grid item xs={12} md={6}><Typography variant="subtitle2" color="text.secondary">Phone</Typography><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Phone fontSize="small" color="primary" /><Typography>{viewDialog.inquiry.phone}</Typography></Box></Grid>
              <Grid item xs={12} md={6}><Typography variant="subtitle2" color="text.secondary">Investment Amount</Typography><Typography variant="h6" color="primary.main">₹{viewDialog.inquiry.investment_amount?.toLocaleString()}</Typography></Grid>
              <Grid item xs={12} md={6}><Typography variant="subtitle2" color="text.secondary">Current Status</Typography><Box sx={{ mt: 0.5 }}>{getStatusChip(viewDialog.inquiry.status)}</Box></Grid>
              <Grid item xs={12}><Typography variant="subtitle2" color="text.secondary">Address</Typography><Typography>{viewDialog.inquiry.address}, {viewDialog.inquiry.city}, {viewDialog.inquiry.state} - {viewDialog.inquiry.pincode}</Typography></Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>Update Status</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button variant={viewDialog.inquiry.status === 'pending' ? 'contained' : 'outlined'} color="warning" onClick={() => handleStatusChange(viewDialog.inquiry.id, 'pending')} startIcon={<Pending />}>Pending</Button>
                  <Button variant={viewDialog.inquiry.status === 'approved' ? 'contained' : 'outlined'} color="success" onClick={() => handleStatusChange(viewDialog.inquiry.id, 'approved')} startIcon={<CheckCircle />}>Approve</Button>
                  <Button variant={viewDialog.inquiry.status === 'rejected' ? 'contained' : 'outlined'} color="error" onClick={() => handleStatusChange(viewDialog.inquiry.id, 'rejected')} startIcon={<Cancel />}>Reject</Button>
                </Box>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions><Button onClick={() => setViewDialog({ open: false, inquiry: null })}>Close</Button></DialogActions>
      </Dialog>
    </Box>
  );
};

export default Inquiries;
