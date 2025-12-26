import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Card, CardContent, Typography, Button, IconButton, Chip,
  Avatar, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, InputAdornment,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Add, Edit, Delete, Visibility, Search, CheckCircle, Cancel } from '@mui/icons-material';
import { getServices, deleteService } from '../services/api';
import toast from 'react-hot-toast';

const Services = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialog, setDeleteDialog] = useState({ open: false, service: null });

  useEffect(() => { fetchServices(); }, []);

  const fetchServices = async () => {
    try {
      const response = await getServices();
      setServices(response.data || []);
    } catch (error) {
      toast.error('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteService(deleteDialog.service.id);
      toast.success('Service deleted successfully');
      fetchServices();
      setDeleteDialog({ open: false, service: null });
    } catch (error) {
      toast.error('Failed to delete service');
    }
  };

  const filteredServices = services.filter((s) =>
    s.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      field: 'image', headerName: 'Image', width: 80,
      renderCell: (params) => <Avatar src={params.value} variant="rounded" sx={{ width: 50, height: 50 }}>{params.row.title?.charAt(0)}</Avatar>,
    },
    { field: 'title', headerName: 'Service Title', flex: 1, minWidth: 200 },
    {
      field: 'category', headerName: 'Category', width: 150,
      renderCell: (params) => <Chip label={params.value || 'Uncategorized'} size="small" variant="outlined" />,
    },
    { field: 'min_investment', headerName: 'Min Investment', width: 130, renderCell: (params) => `₹${params.value?.toLocaleString() || 0}` },
    {
      field: 'roi_range', headerName: 'ROI', width: 100,
      renderCell: (params) => {
        const min = params.row.roi_min || 0;
        const max = params.row.roi_max || 0;
        return min === max ? `${min}%` : `${min}-${max}%`;
      }
    },
    { field: 'duration_months', headerName: 'Duration', width: 100, renderCell: (params) => `${params.value || 0} months` },
    {
      field: 'status', headerName: 'Status', width: 100,
      renderCell: (params) => <Chip icon={params.value === 1 ? <CheckCircle fontSize="small" /> : <Cancel fontSize="small" />} label={params.value === 1 ? 'Active' : 'Inactive'} size="small" color={params.value === 1 ? 'success' : 'default'} />,
    },
    {
      field: 'featured', headerName: 'Featured', width: 100,
      renderCell: (params) => params.value === 1 ? <Chip label="Featured" size="small" color="primary" /> : null,
    },
    {
      field: 'actions', headerName: 'Actions', width: 130, sortable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="View"><IconButton size="small" color="info" onClick={() => window.open(`/services/${params.row.slug}`, '_blank')}><Visibility /></IconButton></Tooltip>
          <Tooltip title="Edit"><IconButton size="small" color="primary" onClick={() => navigate(`/admin/services/edit/${params.row.id}`)}><Edit /></IconButton></Tooltip>
          <Tooltip title="Delete"><IconButton size="small" color="error" onClick={() => setDeleteDialog({ open: true, service: params.row })}><Delete /></IconButton></Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={700}>Services</Typography>
          <Typography color="text.secondary">Manage your agricultural services and investment plans</Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => navigate('/admin/services/new')} sx={{ px: 3 }}>Add Service</Button>
      </Box>

      <Card>
        <CardContent>
          <Box sx={{ mb: 3 }}>
            <TextField
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              sx={{ width: 300 }}
              InputProps={{ startAdornment: <InputAdornment position="start"><Search /></InputAdornment> }}
            />
          </Box>
          <DataGrid
            rows={filteredServices}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 25]}
            autoHeight
            disableSelectionOnClick
            loading={loading}
            sx={{ border: 'none', '& .MuiDataGrid-cell:focus': { outline: 'none' } }}
          />
        </CardContent>
      </Card>

      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, service: null })}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete "{deleteDialog.service?.title}"? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, service: null })}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Services;
