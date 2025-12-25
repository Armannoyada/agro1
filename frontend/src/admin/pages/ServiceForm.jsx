import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box, Card, CardContent, Typography, TextField, Button, Grid,
  FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel,
  InputAdornment, IconButton, Divider,
} from '@mui/material';
import { ArrowBack, Save, Delete } from '@mui/icons-material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getService, createService, updateService, getCategories } from '../services/api';
import toast from 'react-hot-toast';

const ServiceForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '', slug: '', category_id: '', short_description: '', description: '',
    cover_image: '', min_investment: '', max_investment: '', expected_returns: '',
    duration_months: '', risk_level: 'medium', is_active: true, is_featured: false,
  });

  useEffect(() => {
    fetchCategories();
    if (isEdit) fetchService();
  }, [id]);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data || []);
    } catch (error) {
      toast.error('Failed to fetch categories');
    }
  };

  const fetchService = async () => {
    try {
      const response = await getService(id);
      if (response.data) setFormData(response.data);
    } catch (error) {
      toast.error('Failed to fetch service');
      navigate('/admin/services');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (name === 'name') {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        await updateService(id, formData);
        toast.success('Service updated successfully');
      } else {
        await createService(formData);
        toast.success('Service created successfully');
      }
      navigate('/admin/services');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to save service');
    } finally {
      setLoading(false);
    }
  };

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
                    <TextField fullWidth label="Service Name" name="name" value={formData.name} onChange={handleChange} required />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Slug" name="slug" value={formData.slug} onChange={handleChange} required helperText="URL-friendly name" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Category</InputLabel>
                      <Select name="category_id" value={formData.category_id} onChange={handleChange} label="Category" required>
                        {categories.map((cat) => <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Risk Level</InputLabel>
                      <Select name="risk_level" value={formData.risk_level} onChange={handleChange} label="Risk Level">
                        <MenuItem value="low">Low</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="high">High</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Short Description" name="short_description" value={formData.short_description} onChange={handleChange} multiline rows={2} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" gutterBottom>Full Description</Typography>
                    <ReactQuill theme="snow" value={formData.description} onChange={(value) => setFormData((prev) => ({ ...prev, description: value }))} style={{ height: 250, marginBottom: 50 }} />
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
                    <TextField fullWidth label="Minimum Investment" name="min_investment" type="number" value={formData.min_investment} onChange={handleChange} InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Maximum Investment" name="max_investment" type="number" value={formData.max_investment} onChange={handleChange} InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Expected Returns" name="expected_returns" type="number" value={formData.expected_returns} onChange={handleChange} InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Duration" name="duration_months" type="number" value={formData.duration_months} onChange={handleChange} InputProps={{ endAdornment: <InputAdornment position="end">months</InputAdornment> }} />
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
                <FormControlLabel control={<Switch name="is_active" checked={formData.is_active} onChange={handleChange} color="primary" />} label="Active" />
                <FormControlLabel control={<Switch name="is_featured" checked={formData.is_featured} onChange={handleChange} color="primary" />} label="Featured" />
                <Box sx={{ mt: 3 }}>
                  <Button type="submit" variant="contained" startIcon={<Save />} disabled={loading} fullWidth>
                    {loading ? 'Saving...' : isEdit ? 'Update' : 'Create'}
                  </Button>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ mt: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>Cover Image</Typography>
                <Divider sx={{ mb: 3 }} />
                <TextField fullWidth label="Image URL" name="cover_image" value={formData.cover_image} onChange={handleChange} placeholder="https://example.com/image.jpg" sx={{ mb: 2 }} />
                {formData.cover_image && (
                  <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', '&:hover .delete-btn': { opacity: 1 } }}>
                    <img src={formData.cover_image} alt="Cover" style={{ width: '100%', height: 150, objectFit: 'cover' }} />
                    <IconButton className="delete-btn" sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'error.main', color: 'white', opacity: 0, transition: 'opacity 0.2s', '&:hover': { bgcolor: 'error.dark' } }} size="small" onClick={() => setFormData((prev) => ({ ...prev, cover_image: '' }))}><Delete fontSize="small" /></IconButton>
                  </Box>
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
