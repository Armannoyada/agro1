import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box, Card, CardContent, Typography, TextField, Button, Grid,
  FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel,
  InputAdornment, IconButton, Divider, CircularProgress,
} from '@mui/material';
import { ArrowBack, Save, Delete, CloudUpload } from '@mui/icons-material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getService, createService, updateService } from '../services/api';
import toast from 'react-hot-toast';
import axios from 'axios';

// Static category mapping: label (display) -> value (database)
const CATEGORIES = [
  { label: 'Organic Farming', value: 'farming' },
  { label: 'Dairy Farming', value: 'livestock' },
  { label: 'Hydroponic Systems', value: 'technology' },
];

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost/Agro/agro1/backend';
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80';

const ServiceForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: '',
    description: '',
    image: '',
    min_investment: '',
    roi_min: '',
    roi_max: '',
    duration_months: '',
    status: 1,
    featured: 0,
  });

  useEffect(() => {
    if (isEdit) fetchService();
  }, [id]);

  const fetchService = async () => {
    try {
      const response = await getService(id);
      if (response.data) {
        setFormData({
          title: response.data.title || '',
          slug: response.data.slug || '',
          category: response.data.category || '',
          description: response.data.description || '',
          image: response.data.image || '',
          min_investment: response.data.min_investment || '',
          roi_min: response.data.roi_min || '',
          roi_max: response.data.roi_max || '',
          duration_months: response.data.duration_months || '',
          status: response.data.status ?? 1,
          featured: response.data.featured ?? 0,
        });
      }
    } catch (error) {
      toast.error('Failed to fetch service');
      navigate('/admin/services');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = type === 'checkbox' ? (checked ? 1 : 0) : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    // Auto-generate slug from title
    if (name === 'title') {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  // Handle file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Invalid file type. Allowed: JPG, PNG, GIF, WEBP');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File too large. Max size: 5MB');
      return;
    }

    setUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('image', file);

      const response = await axios.post(`${API_URL}/upload.php`, formDataUpload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        setFormData((prev) => ({ ...prev, image: response.data.url }));
        toast.success('Image uploaded successfully');
      } else {
        toast.error(response.data.error || 'Upload failed');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to upload image');
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.title || !formData.category || !formData.min_investment) {
      toast.error('Please fill in all required fields: Title, Category, Min Investment');
      return;
    }

    // Prepare payload with exact backend fields
    const payload = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      min_investment: parseFloat(formData.min_investment) || 0,
      roi_min: parseFloat(formData.roi_min) || null,
      roi_max: parseFloat(formData.roi_max) || null,
      duration_months: parseInt(formData.duration_months) || null,
      image: formData.image || null,
      featured: formData.featured ? 1 : 0,
      status: formData.status ? 1 : 0,
    };

    setLoading(true);
    try {
      if (isEdit) {
        await updateService(id, payload);
        toast.success('Service updated successfully');
      } else {
        await createService(payload);
        toast.success('Service created successfully');
      }
      navigate('/admin/services');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to save service');
    } finally {
      setLoading(false);
    }
  };

  // Get display image (use default if none)
  const displayImage = formData.image || DEFAULT_IMAGE;

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <IconButton onClick={() => navigate('/admin/services')}><ArrowBack /></IconButton>
        <Box>
          <Typography variant="h4" fontWeight={700}>{isEdit ? 'Edit Service' : 'Create New Service'}</Typography>
          <Typography color="text.secondary">{isEdit ? 'Update service information' : 'Add a new agricultural service'}</Typography>
        </Box>
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>Basic Information</Typography>
                <Divider sx={{ mb: 3 }} />
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Service Title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Slug"
                      name="slug"
                      value={formData.slug}
                      onChange={handleChange}
                      required
                      helperText="URL-friendly name"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Category</InputLabel>
                      <Select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        label="Category"
                      >
                        {CATEGORIES.map((cat) => (
                          <MenuItem key={cat.value} value={cat.value}>{cat.label}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Minimum Investment"
                      name="min_investment"
                      type="number"
                      value={formData.min_investment}
                      onChange={handleChange}
                      required
                      InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" gutterBottom>Description</Typography>
                    <ReactQuill
                      theme="snow"
                      value={formData.description}
                      onChange={(value) => setFormData((prev) => ({ ...prev, description: value }))}
                      style={{ height: 250, marginBottom: 50 }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card sx={{ mt: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>Investment Details</Typography>
                <Divider sx={{ mb: 3 }} />
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="ROI Min"
                      name="roi_min"
                      type="number"
                      value={formData.roi_min}
                      onChange={handleChange}
                      InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="ROI Max"
                      name="roi_max"
                      type="number"
                      value={formData.roi_max}
                      onChange={handleChange}
                      InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Duration"
                      name="duration_months"
                      type="number"
                      value={formData.duration_months}
                      onChange={handleChange}
                      InputProps={{ endAdornment: <InputAdornment position="end">months</InputAdornment> }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>Publish</Typography>
                <Divider sx={{ mb: 3 }} />
                <FormControlLabel
                  control={
                    <Switch
                      name="status"
                      checked={formData.status === 1}
                      onChange={handleChange}
                      color="primary"
                    />
                  }
                  label="Active"
                />
                <FormControlLabel
                  control={
                    <Switch
                      name="featured"
                      checked={formData.featured === 1}
                      onChange={handleChange}
                      color="primary"
                    />
                  }
                  label="Featured"
                />
                <Box sx={{ mt: 3 }}>
                  <Button type="submit" variant="contained" startIcon={<Save />} disabled={loading} fullWidth>
                    {loading ? 'Saving...' : isEdit ? 'Update' : 'Create'}
                  </Button>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ mt: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>Service Image</Typography>
                <Divider sx={{ mb: 3 }} />

                {/* File Upload */}
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={uploading ? <CircularProgress size={20} /> : <CloudUpload />}
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  sx={{ mb: 2 }}
                >
                  {uploading ? 'Uploading...' : 'Upload Image'}
                </Button>

                {/* OR divider */}
                <Typography variant="body2" color="text.secondary" align="center" sx={{ my: 1 }}>
                  — OR —
                </Typography>

                {/* URL Input */}
                <TextField
                  fullWidth
                  label="Image URL"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  sx={{ mb: 2 }}
                  size="small"
                />

                {/* Image Preview */}
                <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', '&:hover .delete-btn': { opacity: 1 } }}>
                  <img
                    src={displayImage}
                    alt="Cover"
                    style={{ width: '100%', height: 150, objectFit: 'cover' }}
                    onError={(e) => { e.target.src = DEFAULT_IMAGE; }}
                  />
                  {formData.image && (
                    <IconButton
                      className="delete-btn"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'error.main',
                        color: 'white',
                        opacity: 0,
                        transition: 'opacity 0.2s',
                        '&:hover': { bgcolor: 'error.dark' }
                      }}
                      size="small"
                      onClick={() => setFormData((prev) => ({ ...prev, image: '' }))}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  )}
                </Box>
                {!formData.image && (
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1, textAlign: 'center' }}>
                    Using default placeholder image
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ServiceForm;
