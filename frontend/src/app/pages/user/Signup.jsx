import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { USER_URL } from '../../../utils/app_constants';
import axios from 'axios';
import { toast } from 'react-toastify';

const Signup = () => {
  let signup = async (inputs) => {
    try {
      let response = await axios.post(`${USER_URL}/register`, inputs);
      localStorage.setItem(
        'user',
        JSON.stringify({
          ...response.data.user,
        }),
      );
      toast.success(`${response.data.user.user_email} Successfully Signed up`, {
        autoClose: 2000,
      });
      setTimeout(() => (window.location.href = './'), 2000);
    } catch (e) {
      toast.error(e.response?.data?.error?.messages ? e.response?.data?.error?.messages : e.message || 'Network Error');
    }
  };

  const validationSchema = Yup.object().shape({
    user_email: Yup.string().email('Please enter a valid email').required('User Email is required'),
    password: Yup.string()
      .required('Password is required')
      .matches(/^(?=.*\d)(?=.*[\W_])(?=.*[A-Z])(?=.*[a-z]+).{8,25}$/, {
        message:
          'Password must contains atleast 8-25 characters, 1 capital and 1 or more lower case letter,1 symbol and a numberic digit',
      }),
    confirm_password: Yup.string()
      .required('Please confirm your password')
      .oneOf([Yup.ref('password')], 'Password and confirm password must match'),
  });
  return (
    <>
      <h2 className='text-center'>Sign up</h2>
      <div className='container'>
        <Formik
          initialValues={{ user_email: '', password: '', confirm_password: '', role: 'patient' }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            signup(values);
          }}
        >
          {(formik) => (
            <FormikForm>
              <div className='mb-3'>
                <label htmlFor='user_email' className='form-label'>
                  User Email:
                </label>
                <Field type='email' className='form-control' id='user_email' name='user_email' />
                <ErrorMessage className='text-danger' component={'small'} name='user_email' />
              </div>

              <div className='mb-3'>
                <label htmlFor='password' className='form-label'>
                  Password:
                </label>
                <Field type='password' className='form-control' id='password' name='password' />
                <ErrorMessage className='text-danger' component={'small'} name='password' />
              </div>
              <div className='mb-3'>
                <label htmlFor='passpwrd' className='form-label'>
                  Confirm Password:
                </label>
                <Field type='password' className='form-control' id='confirm_password' name='confirm_password' />
                <ErrorMessage className='text-danger' component={'small'} name='confirm_password' />
              </div>
              <div className='mb-3'>
                <label htmlFor='role' className='form-label'>
                  Role:
                </label>
                <Field as='select' className='form-control' id='role' name='role'>
                  <option value='patient'>Patient</option>
                  <option value='doctor'>Doctor</option>
                </Field>
              </div>
              <button type='submit' className='btn btn-success mt-5' disabled={!formik.isValid || formik.isSubmitting}>
                Sign up
              </button>
            </FormikForm>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Signup;
