import React, { useState, useEffect } from 'react';
import {
  Box, Card, CardContent, Typography, Button, IconButton, Chip, TextField,
  Dialog, DialogTitle, DialogContent, DialogActions, Grid, Avatar,
  InputAdornment, FormControlLabel, Switch,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Add, Edit, Delete, Search, CheckCircle, Cancel } from '@mui/icons-material';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../services/api';
import toast from 'react-hot-toast';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialog, setDialog] = useState({ open: false, mode: 'add', category: null });
  const [formData, setFormData] = useState({ name: '', slug: '', description: '', icon: '', image: '', is_active: true });

  useEffect(() => { fetchCategories(); }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data || []);
    } catch (error) {
      toast.error('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (mode, category = null) => {
    if (mode === 'edit' && category) {
      setFormData({ name: category.name, slug: category.slug, description: category.description || '', icon: category.icon || '', image: category.image || '', is_active: category.is_active });
    } else {
      setFormData({ name: '', slug: '', description: '', icon: '', image: '', is_active: true });
    }
    setDialog({ open: true, mode, category });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (name === 'name') {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async () => {
    try {
      if (dialog.mode === 'add') {
        await createCategory(formData);
        toast.success('Category created successfully');
      } else {
        await updateCategory(dialog.category.id, formData);
        toast.success('Category updated successfully');
      }
      fetchCategories();
      setDialog({ open: false, mode: 'add', category: null });
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to save category');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id);
        toast.success('Category deleted successfully');
        fetchCategories();
      } catch (error) {
        toast.error('Failed to delete category');
      }
    }
  };

  const columns = [
    { field: 'image', headerName: 'Image', width: 80, renderCell: (params) => <Avatar src={params.value} variant="rounded" sx={{ width: 50, height: 50 }}>{params.row.name?.charAt(0)}</Avatar> },
    { field: 'name', headerName: 'Category Name', flex: 1, minWidth: 200 },
    { field: 'slug', headerName: 'Slug', width: 150 },
    { field: 'description', headerName: 'Description', flex: 1, minWidth: 200 },
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
          <Typography variant="h4" fontWeight={700}>Categories</Typography>
          <Typography color="text.secondary">Organize your services into categories</Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpenDialog('add')} sx={{ px: 3 }}>Add Category</Button>
      </Box>

      <Card>
        <CardContent>
          <Box sx={{ mb: 3 }}>
            <TextField placeholder="Search categories..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} size="small" sx={{ width: 300 }} InputProps={{ startAdornment: <InputAdornment position="start"><Search /></InputAdornment> }} />
          </Box>
          <DataGrid rows={categories.filter((c) => c.name?.toLowerCase().includes(searchTerm.toLowerCase()))} columns={columns} pageSize={10} autoHeight disableSelectionOnClick loading={loading} sx={{ border: 'none' }} />
        </CardContent>
      </Card>

      <Dialog open={dialog.open} onClose={() => setDialog({ open: false, mode: 'add', category: null })} maxWidth="sm" fullWidth>
        <DialogTitle>{dialog.mode === 'add' ? 'Add New Category' : 'Edit Category'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}><TextField fullWidth label="Category Name" name="name" value={formData.name} onChange={handleChange} required /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Slug" name="slug" value={formData.slug} onChange={handleChange} required /></Grid>
            <Grid item xs={12}><TextField fullWidth label="Description" name="description" value={formData.description} onChange={handleChange} multiline rows={2} /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Icon (emoji)" name="icon" value={formData.icon} onChange={handleChange} placeholder="🌾" /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Image URL" name="image" value={formData.image} onChange={handleChange} /></Grid>
            <Grid item xs={12}><FormControlLabel control={<Switch name="is_active" checked={formData.is_active} onChange={handleChange} />} label="Active" /></Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog({ open: false, mode: 'add', category: null })}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">{dialog.mode === 'add' ? 'Create' : 'Update'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Categories;
