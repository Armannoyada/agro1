import React, { useState, useEffect } from 'react';
import {
  Box, Card, CardContent, Typography, Button, IconButton, Chip, TextField,
  Dialog, DialogTitle, DialogContent, DialogActions, Grid, Avatar,
  InputAdornment, FormControlLabel, Switch, Rating,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Add, Edit, Delete, Search, CheckCircle, Cancel } from '@mui/icons-material';
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../services/api';
import toast from 'react-hot-toast';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialog, setDialog] = useState({ open: false, mode: 'add', testimonial: null });
  const [formData, setFormData] = useState({ client_name: '', client_position: '', client_company: '', client_image: '', content: '', rating: 5, is_active: true });

  useEffect(() => { fetchTestimonials(); }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await getTestimonials();
      setTestimonials(response.data || []);
    } catch (error) {
      toast.error('Failed to fetch testimonials');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (mode, testimonial = null) => {
    if (mode === 'edit' && testimonial) {
      setFormData({ client_name: testimonial.client_name, client_position: testimonial.client_position || '', client_company: testimonial.client_company || '', client_image: testimonial.client_image || '', content: testimonial.content, rating: testimonial.rating || 5, is_active: testimonial.is_active });
    } else {
      setFormData({ client_name: '', client_position: '', client_company: '', client_image: '', content: '', rating: 5, is_active: true });
    }
    setDialog({ open: true, mode, testimonial });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async () => {
    try {
      if (dialog.mode === 'add') {
        await createTestimonial(formData);
        toast.success('Testimonial created successfully');
      } else {
        await updateTestimonial(dialog.testimonial.id, formData);
        toast.success('Testimonial updated successfully');
      }
      fetchTestimonials();
      setDialog({ open: false, mode: 'add', testimonial: null });
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to save testimonial');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await deleteTestimonial(id);
        toast.success('Testimonial deleted successfully');
        fetchTestimonials();
      } catch (error) {
        toast.error('Failed to delete testimonial');
      }
    }
  };

  const columns = [
    { field: 'client_image', headerName: 'Photo', width: 70, renderCell: (params) => <Avatar src={params.value} sx={{ width: 45, height: 45 }}>{params.row.client_name?.charAt(0)}</Avatar> },
    { field: 'client_name', headerName: 'Client Name', width: 180 },
    { field: 'client_position', headerName: 'Position', width: 150 },
    { field: 'content', headerName: 'Testimonial', flex: 1, minWidth: 250, renderCell: (params) => <Typography noWrap title={params.value}>{params.value}</Typography> },
    { field: 'rating', headerName: 'Rating', width: 140, renderCell: (params) => <Rating value={params.value || 5} size="small" readOnly /> },
    { field: 'is_active', headerName: 'Status', width: 100, renderCell: (params) => <Chip icon={params.value ? <CheckCircle fontSize="small" /> : <Cancel fontSize="small" />} label={params.value ? 'Active' : 'Inactive'} size="small" color={params.value ? 'success' : 'default'} /> },
    { field: 'actions', headerName: 'Actions', width: 100, sortable: false, renderCell: (params) => (
      <Box>
        <IconButton size="small" color="primary" onClick={() => handleOpenDialog('edit', params.row)}><Edit /></IconButton>
        <IconButton size="small" color="error" onClick={() => handleDelete(params.row.id)}><Delete /></IconButton>
      </Box>
    )},
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={700}>Testimonials</Typography>
          <Typography color="text.secondary">Manage client testimonials and reviews</Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpenDialog('add')} sx={{ px: 3 }}>Add Testimonial</Button>
      </Box>

      <Card>
        <CardContent>
          <Box sx={{ mb: 3 }}>
            <TextField placeholder="Search testimonials..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} size="small" sx={{ width: 300 }} InputProps={{ startAdornment: <InputAdornment position="start"><Search /></InputAdornment> }} />
          </Box>
          <DataGrid rows={testimonials.filter((t) => t.client_name?.toLowerCase().includes(searchTerm.toLowerCase()))} columns={columns} pageSize={10} autoHeight disableSelectionOnClick loading={loading} sx={{ border: 'none' }} />
        </CardContent>
      </Card>

      <Dialog open={dialog.open} onClose={() => setDialog({ open: false, mode: 'add', testimonial: null })} maxWidth="sm" fullWidth>
        <DialogTitle>{dialog.mode === 'add' ? 'Add New Testimonial' : 'Edit Testimonial'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}><TextField fullWidth label="Client Name" name="client_name" value={formData.client_name} onChange={handleChange} required /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Position" name="client_position" value={formData.client_position} onChange={handleChange} /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Company/Location" name="client_company" value={formData.client_company} onChange={handleChange} /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Photo URL" name="client_image" value={formData.client_image} onChange={handleChange} /></Grid>
            <Grid item xs={12}><TextField fullWidth label="Testimonial Content" name="content" value={formData.content} onChange={handleChange} multiline rows={4} required /></Grid>
            <Grid item xs={12} md={6}><Typography variant="subtitle2" gutterBottom>Rating</Typography><Rating name="rating" value={formData.rating} onChange={(e, value) => setFormData((prev) => ({ ...prev, rating: value }))} size="large" /></Grid>
            <Grid item xs={12} md={6}><FormControlLabel control={<Switch name="is_active" checked={formData.is_active} onChange={handleChange} />} label="Active" /></Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog({ open: false, mode: 'add', testimonial: null })}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">{dialog.mode === 'add' ? 'Create' : 'Update'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Testimonials;
