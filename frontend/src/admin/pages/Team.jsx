import React, { useState, useEffect } from 'react';
import {
  Box, Card, CardContent, Typography, Button, IconButton, Chip, TextField,
  Dialog, DialogTitle, DialogContent, DialogActions, Grid, Avatar,
  InputAdornment, FormControlLabel, Switch,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Add, Edit, Delete, Search, LinkedIn, Twitter, Facebook, CheckCircle, Cancel } from '@mui/icons-material';
import { getTeam, createTeamMember, updateTeamMember, deleteTeamMember } from '../services/api';
import toast from 'react-hot-toast';

const Team = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialog, setDialog] = useState({ open: false, mode: 'add', member: null });
  const [formData, setFormData] = useState({ name: '', position: '', bio: '', image: '', email: '', phone: '', linkedin: '', twitter: '', facebook: '', display_order: 0, is_active: true });

  useEffect(() => { fetchTeam(); }, []);

  const fetchTeam = async () => {
    try {
      const response = await getTeam();
      setTeam(response.data || []);
    } catch (error) {
      toast.error('Failed to fetch team members');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (mode, member = null) => {
    if (mode === 'edit' && member) {
      setFormData({ name: member.name, position: member.position || '', bio: member.bio || '', image: member.image || '', email: member.email || '', phone: member.phone || '', linkedin: member.linkedin || '', twitter: member.twitter || '', facebook: member.facebook || '', display_order: member.display_order || 0, is_active: member.is_active });
    } else {
      setFormData({ name: '', position: '', bio: '', image: '', email: '', phone: '', linkedin: '', twitter: '', facebook: '', display_order: team.length, is_active: true });
    }
    setDialog({ open: true, mode, member });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async () => {
    try {
      if (dialog.mode === 'add') {
        await createTeamMember(formData);
        toast.success('Team member added successfully');
      } else {
        await updateTeamMember(dialog.member.id, formData);
        toast.success('Team member updated successfully');
      }
      fetchTeam();
      setDialog({ open: false, mode: 'add', member: null });
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to save team member');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      try {
        await deleteTeamMember(id);
        toast.success('Team member deleted successfully');
        fetchTeam();
      } catch (error) {
        toast.error('Failed to delete team member');
      }
    }
  };

  const columns = [
    { field: 'image', headerName: 'Photo', width: 70, renderCell: (params) => <Avatar src={params.value} sx={{ width: 45, height: 45 }}>{params.row.name?.charAt(0)}</Avatar> },
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'position', headerName: 'Position', width: 180 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'social', headerName: 'Social', width: 120, renderCell: (params) => (
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        {params.row.linkedin && <IconButton size="small" href={params.row.linkedin} target="_blank"><LinkedIn fontSize="small" /></IconButton>}
        {params.row.twitter && <IconButton size="small" href={params.row.twitter} target="_blank"><Twitter fontSize="small" /></IconButton>}
        {params.row.facebook && <IconButton size="small" href={params.row.facebook} target="_blank"><Facebook fontSize="small" /></IconButton>}
      </Box>
    )},
    { field: 'display_order', headerName: 'Order', width: 80 },
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
          <Typography variant="h4" fontWeight={700}>Team Members</Typography>
          <Typography color="text.secondary">Manage your team and leadership profiles</Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpenDialog('add')} sx={{ px: 3 }}>Add Member</Button>
      </Box>

      <Card>
        <CardContent>
          <Box sx={{ mb: 3 }}>
            <TextField placeholder="Search team members..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} size="small" sx={{ width: 300 }} InputProps={{ startAdornment: <InputAdornment position="start"><Search /></InputAdornment> }} />
          </Box>
          <DataGrid rows={team.filter((m) => m.name?.toLowerCase().includes(searchTerm.toLowerCase()))} columns={columns} pageSize={10} autoHeight disableSelectionOnClick loading={loading} sx={{ border: 'none' }} />
        </CardContent>
      </Card>

      <Dialog open={dialog.open} onClose={() => setDialog({ open: false, mode: 'add', member: null })} maxWidth="md" fullWidth>
        <DialogTitle>{dialog.mode === 'add' ? 'Add New Team Member' : 'Edit Team Member'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}><TextField fullWidth label="Full Name" name="name" value={formData.name} onChange={handleChange} required /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Position" name="position" value={formData.position} onChange={handleChange} required /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Phone" name="phone" value={formData.phone} onChange={handleChange} /></Grid>
            <Grid item xs={12}><TextField fullWidth label="Photo URL" name="image" value={formData.image} onChange={handleChange} /></Grid>
            <Grid item xs={12}><TextField fullWidth label="Bio" name="bio" value={formData.bio} onChange={handleChange} multiline rows={3} /></Grid>
            <Grid item xs={12} md={4}><TextField fullWidth label="LinkedIn URL" name="linkedin" value={formData.linkedin} onChange={handleChange} InputProps={{ startAdornment: <InputAdornment position="start"><LinkedIn /></InputAdornment> }} /></Grid>
            <Grid item xs={12} md={4}><TextField fullWidth label="Twitter URL" name="twitter" value={formData.twitter} onChange={handleChange} InputProps={{ startAdornment: <InputAdornment position="start"><Twitter /></InputAdornment> }} /></Grid>
            <Grid item xs={12} md={4}><TextField fullWidth label="Facebook URL" name="facebook" value={formData.facebook} onChange={handleChange} InputProps={{ startAdornment: <InputAdornment position="start"><Facebook /></InputAdornment> }} /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Display Order" name="display_order" type="number" value={formData.display_order} onChange={handleChange} /></Grid>
            <Grid item xs={12} md={6}><FormControlLabel control={<Switch name="is_active" checked={formData.is_active} onChange={handleChange} />} label="Active" sx={{ mt: 1 }} /></Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog({ open: false, mode: 'add', member: null })}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">{dialog.mode === 'add' ? 'Create' : 'Update'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Team;
