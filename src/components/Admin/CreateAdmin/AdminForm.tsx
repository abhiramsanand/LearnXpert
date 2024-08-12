import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import SuccessModal from './SuccessModal';

const AdminSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Required'),
});

const AdminForm: React.FC<{ onAddAdmin: (admin: { username: string; email: string }) => void }> = ({ onAddAdmin }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (values: { username: string; email: string; password: string; confirmPassword: string }) => {
    onAddAdmin({ username: values.username, email: values.email });
    setIsModalOpen(true);
  };

  return (
    <Box
      sx={{
        mb: 2,
        maxWidth: '100%',
        maxHeight: '400px',
        mx: 'auto',
        p: 2,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
        borderRadius: 1,
        overflowY: 'auto',
        backgroundColor: '#fff', // Ensure background color to better see the shadow effect
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#A54BFF',
          borderRadius: '8px',
          mb:'2px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#F0F0F0',
          borderRadius: '8px',
          mb:'5px'
        },
      }}
    >
      <Typography variant="h6" gutterBottom>Create Admin</Typography>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={AdminSchema}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div>
              <Field
                as={TextField}
                label="Username"
                name="username"
                fullWidth
                margin="dense"
                error={touched.username && !!errors.username}
                helperText={touched.username && errors.username}
              />
            </div>
            <div>
              <Field
                as={TextField}
                label="Email"
                name="email"
                type="email"
                fullWidth
                margin="dense"
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />
            </div>
            <div>
              <Field
                as={TextField}
                label="Password"
                name="password"
                type="password"
                fullWidth
                margin="dense"
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
              />
            </div>
            <div>
              <Field
                as={TextField}
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                fullWidth
                margin="dense"
                error={touched.confirmPassword && !!errors.confirmPassword}
                helperText={touched.confirmPassword && errors.confirmPassword}
              />
            </div>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, width: '30%', alignContent: 'center' ,bgcolor:'#8518FF', '&:hover': {
                  bgcolor: '#6A1B9A', // Color on hover
                },}}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>

      <SuccessModal open={isModalOpen} onClose={handleCloseModal} />
    </Box>
  );
};

export default AdminForm;
