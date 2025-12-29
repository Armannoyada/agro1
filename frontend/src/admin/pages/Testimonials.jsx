import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Card, CardContent, Typography, Button, IconButton, Chip, TextField,
  Dialog, DialogTitle, DialogContent, DialogActions, Grid, Avatar,
  InputAdornment, FormControlLabel, Switch, Rating, CircularProgress,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Add, Edit, Delete, Search, CheckCircle, Cancel, CloudUpload, Star } from '@mui/icons-material';
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial, uploadImage } from '../services/api';
import toast from 'react-hot-toast';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialog, setDialog] = useState({ open: false, mode: 'add', testimonial: null });
  const [uploading, setUploading] = useState(false);
  const imageInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    company: '',
    photo: '',
    testimonial: '',
    rating: 5,
    is_featured: false,
    is_active: true,
  });

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
      setFormData({
        name: testimonial.name || '',
        designation: testimonial.designation || '',
        company: testimonial.company || '',
        photo: testimonial.photo || '',
        testimonial: testimonial.testimonial || '',
        rating: testimonial.rating || 5,
        is_featured: Boolean(testimonial.is_featured),
        is_active: Boolean(testimonial.is_active),
      });
    } else {
      setFormData({
        name: '',
        designation: '',
        company: '',
        photo: '',
        testimonial: '',
        rating: 5,
        is_featured: false,
        is_active: true,
      });
    }
    setDialog({ open: true, mode, testimonial });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Invalid file type. Allowed: JPG, PNG, GIF, WEBP');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image too large. Max size: 5MB');
      return;
    }

    setUploading(true);
    try {
      const response = await uploadImage(file, 'testimonials');
      if (response.success) {
        setFormData((prev) => ({ ...prev, photo: response.url }));
        toast.success('Photo uploaded successfully');
      } else {
        toast.error(response.error || 'Upload failed');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to upload photo');
    } finally {
      setUploading(false);
      if (imageInputRef.current) imageInputRef.current.value = '';
    }
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast.error('Please enter a name');
      return;
    }
    if (!formData.testimonial.trim()) {
      toast.error('Please enter testimonial content');
      return;
    }

    try {
      const payload = {
        name: formData.name,
        designation: formData.designation || null,
        company: formData.company || null,
        photo: formData.photo || null,
        testimonial: formData.testimonial,
        rating: formData.rating,
        is_featured: formData.is_featured ? 1 : 0,
        is_active: formData.is_active ? 1 : 0,
      };

      if (dialog.mode === 'add') {
        await createTestimonial(payload);
        toast.success('Testimonial created successfully');
      } else {
        await updateTestimonial(dialog.testimonial.id, payload);
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
    {
      field: 'photo',
      headerName: 'Photo',
      width: 80,
      renderCell: (params) => (
        <Avatar
          src={params.value}
          sx={{ width: 50, height: 50 }}
        >
          {params.row.name?.charAt(0)}
        </Avatar>
      ),
    },
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'designation', headerName: 'Designation', width: 150 },
    { field: 'company', headerName: 'Company/Location', width: 150 },
    {
      field: 'testimonial',
      headerName: 'Testimonial',
      flex: 1,
      minWidth: 250,
      renderCell: (params) => (
        <Typography noWrap title={params.value} sx={{ py: 1 }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'rating',
      headerName: 'Rating',
      width: 140,
      renderCell: (params) => <Rating value={params.value || 5} size="small" readOnly />,
    },
    {
      field: 'is_featured',
      headerName: 'Featured',
      width: 100,
      renderCell: (params) => (
        params.value ? <Star sx={{ color: 'warning.main' }} /> : null
      ),
    },
    {
      field: 'is_active',
      headerName: 'Status',
      width: 100,
      renderCell: (params) => (
        <Chip
          icon={params.value ? <CheckCircle fontSize="small" /> : <Cancel fontSize="small" />}
          label={params.value ? 'Active' : 'Inactive'}
          size="small"
          color={params.value ? 'success' : 'default'}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton size="small" color="primary" onClick={() => handleOpenDialog('edit', params.row)}>
            <Edit />
          </IconButton>
          <IconButton size="small" color="error" onClick={() => handleDelete(params.row.id)}>
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={700}>Testimonials</Typography>
          <Typography color="text.secondary">Manage client testimonials and reviews</Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpenDialog('add')} sx={{ px: 3 }}>
          Add Testimonial
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Box sx={{ mb: 3 }}>
            <TextField
              placeholder="Search testimonials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              sx={{ width: 300 }}
              InputProps={{ startAdornment: <InputAdornment position="start"><Search /></InputAdornment> }}
            />
          </Box>
          <DataGrid
            rows={testimonials.filter((t) =>
              t.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              t.testimonial?.toLowerCase().includes(searchTerm.toLowerCase())
            )}
            columns={columns}
            pageSize={10}
            autoHeight
            disableSelectionOnClick
            loading={loading}
            sx={{ border: 'none' }}
            getRowHeight={() => 'auto'}
          />
        </CardContent>
      </Card>

      <Dialog open={dialog.open} onClose={() => setDialog({ open: false, mode: 'add', testimonial: null })} maxWidth="sm" fullWidth>
        <DialogTitle>{dialog.mode === 'add' ? 'Add New Testimonial' : 'Edit Testimonial'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {/* Photo Upload Section */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
                <Avatar
                  src={formData.photo}
                  sx={{ width: 80, height: 80, bgcolor: 'primary.light' }}
                >
                  {formData.name?.charAt(0) || '?'}
                </Avatar>
                <Box>
                  <input
                    type="file"
                    ref={imageInputRef}
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={uploading ? <CircularProgress size={16} /> : <CloudUpload />}
                    onClick={() => imageInputRef.current?.click()}
                    disabled={uploading}
                  >
                    {uploading ? 'Uploading...' : 'Upload Photo'}
                  </Button>
                  <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 0.5 }}>
                    Max 5MB (JPG, PNG, GIF, WEBP)
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                placeholder="e.g. Business Owner, IT Professional"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Company / Location"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. Mumbai, Maharashtra"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Testimonial Content"
                name="testimonial"
                value={formData.testimonial}
                onChange={handleChange}
                multiline
                rows={4}
                required
                placeholder="What the client says about your services..."
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>Rating</Typography>
              <Rating
                name="rating"
                value={formData.rating}
                onChange={(e, value) => setFormData((prev) => ({ ...prev, rating: value || 5 }))}
                size="large"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <FormControlLabel
                  control={<Switch name="is_active" checked={formData.is_active} onChange={handleChange} />}
                  label="Active"
                />
                <FormControlLabel
                  control={<Switch name="is_featured" checked={formData.is_featured} onChange={handleChange} color="warning" />}
                  label="Featured"
                />
              </Box>
            </Grid>
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
