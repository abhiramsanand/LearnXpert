import React, { useState } from 'react';
import { Modal, Box, TextField, Button, IconButton, Typography, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface AddTraineeModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (userName: string, email: string, percipioEmail: string, password: string) => void;
  batchId: number;
  onAddTrainee: (userName: string, email: string, percipioEmail: string, password: string) => Promise<void>;
}

const AddTraineeModal: React.FC<AddTraineeModalProps> = ({ open, onClose, onSubmit, batchId }) => {
  const [loading, setLoading] = useState(false); // Loading state for submit button
  const [error, setError] = useState<string | null>(null); // Error state to show errors during submission

  const emailDomainValidation = /^[a-zA-Z][\w.%+-]*@experionglobal\.com$/; // Common validation for emails

  const validationSchema = Yup.object({
    userName: Yup.string()
      .required('User name is required')
      .matches(/^[a-zA-Z ]+$/, 'Name should only contain letters and spaces')
      .test('no-only-spaces', 'Name cannot be only spaces', (value) => value?.trim().length > 0),
    email: Yup.string()
      .required('Email is required')
      .matches(emailDomainValidation, 'Email must start with a letter and end with @experionglobal.com'),
    percipioEmail: Yup.string()
      .required('Percipio email is required')
      .matches(emailDomainValidation, 'Percipio email must start with a letter and end with @experionglobal.com'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password should be at least 6 characters long'),
  });

  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      percipioEmail: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      setError(null);

      const newTrainee = {
        userName: values.userName,
        role: 'Trainee',
        email: values.email,
        percipioEmail: values.percipioEmail,
        password: values.password,
      };

      fetch(`http://localhost:8080/api/v1/batches/${batchId}/trainees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTrainee),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .then(() => {
          onSubmit(values.userName, values.email, values.percipioEmail, values.password);
          formik.resetForm();
          onClose();
        })
        .catch(() => {
          setError('Failed to add trainee. Please try again.');
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #8061C3',
          borderRadius: '8px',
          boxShadow: 24,
          p: 4,
          outline: 'none',
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: '#8061C3',
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2" align="center" sx={{ mb: 1, fontWeight: 'bold' }}>
          Add New Trainee
        </Typography>
        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="User Name"
            placeholder="Enter trainee's name..."
            {...formik.getFieldProps('userName')}
            error={formik.touched.userName && Boolean(formik.errors.userName)}
            helperText={formik.touched.userName && formik.errors.userName}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            placeholder="Enter email..."
            {...formik.getFieldProps('email')}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Percipio Email"
            placeholder="Enter Percipio email..."
            {...formik.getFieldProps('percipioEmail')}
            error={formik.touched.percipioEmail && Boolean(formik.errors.percipioEmail)}
            helperText={formik.touched.percipioEmail && formik.errors.percipioEmail}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            placeholder="Enter password..."
            {...formik.getFieldProps('password')}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            variant="outlined"
            margin="normal"
            type="password"
          />
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button
              variant="contained"
              type="submit"
              sx={{ bgcolor: '#8061C3' }}
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} />}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddTraineeModal;
