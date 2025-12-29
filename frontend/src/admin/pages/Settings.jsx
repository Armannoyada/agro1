import React, { useState, useEffect } from 'react';
import {
  Box, Card, CardContent, Typography, Button, TextField, Grid, Divider,
  Tabs, Tab, IconButton, Avatar, List, ListItem, ListItemText, ListItemSecondaryAction,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
} from '@mui/material';
import { Save, Add, Delete, Edit, Business, Assessment, Image } from '@mui/icons-material';
import { getCompanyInfo, updateCompanyInfo, getStatistics, createStatistic, updateStatistic, deleteStatistic } from '../services/api';
import toast from 'react-hot-toast';

const TabPanel = ({ children, value, index }) => (
  <Box role="tabpanel" hidden={value !== index} sx={{ py: 3 }}>{value === index && children}</Box>
);

const Settings = () => {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [companyInfo, setCompanyInfo] = useState({
    company_name: '', tagline: '', description: '', mission: '', vision: '',
    email: '', phone: '', alternate_phone: '', address: '', city: '', state: '',
    pincode: '', country: '', logo: '', favicon: '', facebook: '', twitter: '',
    instagram: '', linkedin: '', youtube: '', whatsapp: '', founding_year: '', registration_number: '',
  });
  const [statistics, setStatistics] = useState([]);
  const [newStat, setNewStat] = useState({ label: '', value: '', suffix: '', icon: '' });
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null, label: '' });
  const [editDialog, setEditDialog] = useState({ open: false, stat: null });
  const [editFormData, setEditFormData] = useState({ label: '', value: '', suffix: '', icon: '' });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [companyRes, statsRes] = await Promise.all([getCompanyInfo(), getStatistics()]);
      if (companyRes.data) setCompanyInfo(companyRes.data);
      setStatistics(statsRes.data || []);
    } catch (error) {
      toast.error('Failed to fetch settings');
    }
  };

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompanyInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveCompanyInfo = async () => {
    setLoading(true);
    try {
      await updateCompanyInfo(companyInfo);
      toast.success('Company info updated successfully');
    } catch (error) {
      toast.error('Failed to update company info');
    } finally {
      setLoading(false);
    }
  };

  const handleAddStat = async () => {
    if (newStat.label && newStat.value) {
      setLoading(true);
      try {
        const response = await createStatistic(newStat);
        if (response.success) {
          setStatistics((prev) => [...prev, { ...newStat, id: response.id }]);
          setNewStat({ label: '', value: '', suffix: '', icon: '' });
          toast.success('Statistic added successfully');
        }
      } catch (error) {
        toast.error('Failed to add statistic');
      } finally {
        setLoading(false);
      }
    } else {
      toast.error('Please fill in label and value');
    }
  };

  // Edit handlers
  const handleEditClick = (stat) => {
    setEditFormData({
      label: stat.label || '',
      value: stat.value || '',
      suffix: stat.suffix || '',
      icon: stat.icon || '',
    });
    setEditDialog({ open: true, stat });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async () => {
    if (!editFormData.label || !editFormData.value) {
      toast.error('Label and value are required');
      return;
    }

    setLoading(true);
    try {
      const response = await updateStatistic(editDialog.stat.id, editFormData);
      if (response.success) {
        setStatistics((prev) =>
          prev.map((s) => (s.id === editDialog.stat.id ? { ...s, ...editFormData } : s))
        );
        setEditDialog({ open: false, stat: null });
        toast.success('Statistic updated successfully');
      }
    } catch (error) {
      toast.error('Failed to update statistic');
    } finally {
      setLoading(false);
    }
  };

  const handleEditCancel = () => {
    setEditDialog({ open: false, stat: null });
  };

  // Delete handlers
  const handleDeleteClick = (id, label) => {
    setDeleteConfirm({ open: true, id, label });
  };

  const handleDeleteConfirm = async () => {
    const { id } = deleteConfirm;
    setDeleteConfirm({ open: false, id: null, label: '' });
    setLoading(true);
    try {
      const response = await deleteStatistic(id);
      if (response.success) {
        setStatistics((prev) => prev.filter((s) => s.id !== id));
        toast.success('Statistic deleted successfully');
      }
    } catch (error) {
      toast.error('Failed to delete statistic');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm({ open: false, id: null, label: '' });
  };

  return (
    <>
      <Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight={700}>Settings</Typography>
          <Typography color="text.secondary">Manage your website settings and company information</Typography>
        </Box>

        <Card>
          <CardContent>
            <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
              <Tab icon={<Business />} label="Company Info" iconPosition="start" />
              <Tab icon={<Assessment />} label="Statistics" iconPosition="start" />
              <Tab icon={<Image />} label="Branding" iconPosition="start" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <Grid container spacing={3}>
                <Grid item xs={12}><Typography variant="h6" fontWeight={600} gutterBottom>Basic Information</Typography><Divider sx={{ mb: 2 }} /></Grid>
                <Grid item xs={12} md={6}><TextField fullWidth label="Company Name" name="company_name" value={companyInfo.company_name} onChange={handleCompanyChange} /></Grid>
                <Grid item xs={12} md={6}><TextField fullWidth label="Tagline" name="tagline" value={companyInfo.tagline} onChange={handleCompanyChange} /></Grid>
                <Grid item xs={12}><TextField fullWidth label="Description" name="description" value={companyInfo.description} onChange={handleCompanyChange} multiline rows={3} /></Grid>
                <Grid item xs={12} md={6}><TextField fullWidth label="Mission" name="mission" value={companyInfo.mission} onChange={handleCompanyChange} multiline rows={2} /></Grid>
                <Grid item xs={12} md={6}><TextField fullWidth label="Vision" name="vision" value={companyInfo.vision} onChange={handleCompanyChange} multiline rows={2} /></Grid>

                <Grid item xs={12}><Typography variant="h6" fontWeight={600} gutterBottom sx={{ mt: 2 }}>Contact Details</Typography><Divider sx={{ mb: 2 }} /></Grid>
                <Grid item xs={12} md={4}><TextField fullWidth label="Email" name="email" type="email" value={companyInfo.email} onChange={handleCompanyChange} /></Grid>
                <Grid item xs={12} md={4}><TextField fullWidth label="Phone" name="phone" value={companyInfo.phone} onChange={handleCompanyChange} /></Grid>
                <Grid item xs={12} md={4}><TextField fullWidth label="Alternate Phone" name="alternate_phone" value={companyInfo.alternate_phone} onChange={handleCompanyChange} /></Grid>
                <Grid item xs={12}><TextField fullWidth label="Address" name="address" value={companyInfo.address} onChange={handleCompanyChange} /></Grid>
                <Grid item xs={12} md={3}><TextField fullWidth label="City" name="city" value={companyInfo.city} onChange={handleCompanyChange} /></Grid>
                <Grid item xs={12} md={3}><TextField fullWidth label="State" name="state" value={companyInfo.state} onChange={handleCompanyChange} /></Grid>
                <Grid item xs={12} md={3}><TextField fullWidth label="Pincode" name="pincode" value={companyInfo.pincode} onChange={handleCompanyChange} /></Grid>
                <Grid item xs={12} md={3}><TextField fullWidth label="Country" name="country" value={companyInfo.country} onChange={handleCompanyChange} /></Grid>

                <Grid item xs={12}><Typography variant="h6" fontWeight={600} gutterBottom sx={{ mt: 2 }}>Social Media</Typography><Divider sx={{ mb: 2 }} /></Grid>
                <Grid item xs={12} md={4}><TextField fullWidth label="Facebook" name="facebook" value={companyInfo.facebook} onChange={handleCompanyChange} /></Grid>
                <Grid item xs={12} md={4}><TextField fullWidth label="Twitter" name="twitter" value={companyInfo.twitter} onChange={handleCompanyChange} /></Grid>
                <Grid item xs={12} md={4}><TextField fullWidth label="Instagram" name="instagram" value={companyInfo.instagram} onChange={handleCompanyChange} /></Grid>
                <Grid item xs={12} md={4}><TextField fullWidth label="LinkedIn" name="linkedin" value={companyInfo.linkedin} onChange={handleCompanyChange} /></Grid>
                <Grid item xs={12} md={4}><TextField fullWidth label="YouTube" name="youtube" value={companyInfo.youtube} onChange={handleCompanyChange} /></Grid>
                <Grid item xs={12} md={4}><TextField fullWidth label="WhatsApp" name="whatsapp" value={companyInfo.whatsapp} onChange={handleCompanyChange} /></Grid>

                <Grid item xs={12}><Button variant="contained" startIcon={<Save />} onClick={handleSaveCompanyInfo} disabled={loading} sx={{ mt: 2 }}>{loading ? 'Saving...' : 'Save Company Info'}</Button></Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Typography variant="h6" fontWeight={600} gutterBottom>Website Statistics</Typography>
              <Typography color="text.secondary" sx={{ mb: 3 }}>These numbers are displayed on the homepage. Click the edit icon to modify existing statistics.</Typography>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} md={3}><TextField fullWidth label="Label" value={newStat.label} onChange={(e) => setNewStat((prev) => ({ ...prev, label: e.target.value }))} size="small" placeholder="e.g. Happy Farmers" /></Grid>
                <Grid item xs={12} md={3}><TextField fullWidth label="Value" value={newStat.value} onChange={(e) => setNewStat((prev) => ({ ...prev, value: e.target.value }))} size="small" placeholder="e.g. 5000" /></Grid>
                <Grid item xs={12} md={2}><TextField fullWidth label="Suffix" value={newStat.suffix} onChange={(e) => setNewStat((prev) => ({ ...prev, suffix: e.target.value }))} size="small" placeholder="e.g. +" /></Grid>
                <Grid item xs={12} md={2}><TextField fullWidth label="Icon" value={newStat.icon} onChange={(e) => setNewStat((prev) => ({ ...prev, icon: e.target.value }))} size="small" placeholder="e.g. users" /></Grid>
                <Grid item xs={12} md={2}><Button variant="outlined" startIcon={<Add />} onClick={handleAddStat} fullWidth sx={{ height: '100%' }}>Add</Button></Grid>
              </Grid>
              <List>
                {statistics.map((stat, index) => (
                  <ListItem key={stat.id || index} divider sx={{ py: 2 }}>
                    <Avatar sx={{ mr: 2, bgcolor: 'primary.light' }}>{stat.icon || stat.label?.charAt(0)}</Avatar>
                    <ListItemText
                      primary={<Typography fontWeight={600}>{stat.label}</Typography>}
                      secondary={`${stat.value}${stat.suffix || ''}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton color="primary" onClick={() => handleEditClick(stat)} sx={{ mr: 1 }}>
                        <Edit />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDeleteClick(stat.id, stat.label)}>
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
              {statistics.length === 0 && (
                <Typography color="text.secondary" textAlign="center" sx={{ py: 4 }}>
                  No statistics added yet. Add your first statistic above.
                </Typography>
              )}
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Typography variant="h6" fontWeight={600} gutterBottom>Branding Assets</Typography>
              <Typography color="text.secondary" sx={{ mb: 3 }}>Manage your logo and favicon</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined" sx={{ p: 3 }}>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>Logo</Typography>
                    <Box sx={{ mb: 2 }}>{companyInfo.logo ? <Avatar src={companyInfo.logo} variant="rounded" sx={{ width: 120, height: 120 }} /> : <Box sx={{ width: 120, height: 120, bgcolor: 'grey.100', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Image sx={{ fontSize: 48, color: 'grey.400' }} /></Box>}</Box>
                    <TextField fullWidth label="Logo URL" name="logo" value={companyInfo.logo} onChange={handleCompanyChange} size="small" />
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined" sx={{ p: 3 }}>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>Favicon</Typography>
                    <Box sx={{ mb: 2 }}>{companyInfo.favicon ? <Avatar src={companyInfo.favicon} variant="rounded" sx={{ width: 64, height: 64 }} /> : <Box sx={{ width: 64, height: 64, bgcolor: 'grey.100', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Image sx={{ fontSize: 32, color: 'grey.400' }} /></Box>}</Box>
                    <TextField fullWidth label="Favicon URL" name="favicon" value={companyInfo.favicon} onChange={handleCompanyChange} size="small" />
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}><TextField fullWidth label="Founding Year" name="founding_year" value={companyInfo.founding_year} onChange={handleCompanyChange} /></Grid>
                <Grid item xs={12} md={6}><TextField fullWidth label="Registration Number" name="registration_number" value={companyInfo.registration_number} onChange={handleCompanyChange} /></Grid>
                <Grid item xs={12}><Button variant="contained" startIcon={<Save />} onClick={handleSaveCompanyInfo} disabled={loading}>{loading ? 'Saving...' : 'Save Branding'}</Button></Grid>
              </Grid>
            </TabPanel>
          </CardContent>
        </Card>
      </Box>

      {/* Edit Statistic Dialog */}
      <Dialog open={editDialog.open} onClose={handleEditCancel} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Statistic</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Label"
                name="label"
                value={editFormData.label}
                onChange={handleEditChange}
                required
                placeholder="e.g. Happy Farmers"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Value"
                name="value"
                value={editFormData.value}
                onChange={handleEditChange}
                required
                placeholder="e.g. 5000"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Suffix"
                name="suffix"
                value={editFormData.suffix}
                onChange={handleEditChange}
                placeholder="e.g. + or %"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Icon"
                name="icon"
                value={editFormData.icon}
                onChange={handleEditChange}
                placeholder="e.g. users, landscape, calendar"
                helperText="Icon name for display (optional)"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditCancel}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirm.open} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the statistic "{deleteConfirm.label}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Settings;
