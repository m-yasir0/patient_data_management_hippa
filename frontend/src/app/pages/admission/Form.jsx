import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { fetchData } from '../../../helpers/fetch_helper';
import { ADMISSION_URL, USER_URL } from '../../../utils/app_constants';
import { showAdmission } from '../../redux/actions/admission_action';
import { useNavigate } from 'react-router-dom';

const Form = ({ action }) => {
  const [patients, setPatients] = useState([]);
  const initialValues = {
    admission_case: '',
    ward_details: '',
    patient: { user_email: '', password: '', id: '' },
  };
  const dispatcher = useDispatch();
  const { admissions, admission } = useSelector((state) => state.admission);
  var form = null;
  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    async function loadPatients() {
      const p = await fetchData(`${USER_URL}/patients`, 'get');
      setPatients(p.data.patients);
    }
    if (action === 'new') loadPatients();
    else {
      const active_admission = filterAdmission();
      dispatcher(showAdmission(id, active_admission));
    }
    if (form && action === 'edit') {
      form.resetForm({
        values: {
          ...admission,
        },
      });
    }
  }, [admission]);

  const filterAdmission = () => {
    return admissions.find((val) => val._id === id);
  };

  async function submit(values) {
    if (action === 'new') await fetchData(`${ADMISSION_URL}/create`, 'post', 'Admission created!', values);
    else await fetchData(`${ADMISSION_URL}/${id}/update`, 'put', 'Admission Updated!', values);

    navigate('/');
  }

  const [tabKey, setTabKey] = useState('new_patient');

  const validationSchema = Yup.object().shape({
    admission_case: Yup.string().required('Admission Case is required'),
    ward_details: Yup.string().required('Ward details are required'),
    patient:
      action === 'new' &&
      Yup.object().shape({
        user_email:
          (tabKey === 'new_patient' || !patients.length) &&
          Yup.string().email('Please enter a valid email').required('User Email is required'),
        password:
          (tabKey === 'new_patient' || !patients.length) &&
          Yup.string()
            .required('Password is required')
            .matches(/^(?=.*\d)(?=.*[\W_])(?=.*[A-Z])(?=.*[a-z]+).{8,25}$/, {
              message:
                'Password must contains atleast 8-25 characters, 1 capital and 1 or more lower case letter,1 symbol and a numberic digit',
            }),
        id: tabKey === 'existing_patient' && Yup.string().required('Select a patient.').min(1),
      }),
  });
  return (
    <>
      <h2 className='text-center'>{action === 'edit' ? 'Update Admission Record' : 'Create New Admission'}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          if (tabKey === 'new_patient') delete values['patient']['id'];
          else {
            delete values['patient']['user_email'];
            delete values['patient']['password'];
          }
          if (action === 'edit') delete values['patient'];
          submit(values);
        }}
      >
        {(formik) => {
          form = formik;
          return (
            <FormikForm>
              <div className='mb-3'>
                <label htmlFor='admission_case' className='form-label'>
                  Admission Case:
                </label>
                <Field as='textarea' className='form-control' id='admission_case' name='admission_case' />
                <ErrorMessage className='text-danger' component={'small'} name='admission_case' />
              </div>

              <div className='mb-3'>
                <label htmlFor='admission_case' className='form-label'>
                  Ward Details:
                </label>
                <Field as='textarea' className='form-control' id='ward_details' name='ward_details' />
                <ErrorMessage className='text-danger' component={'small'} name='ward_details' />
              </div>

              {action === 'new' && (
                <Tabs id='controlled-tab-example' activeKey={tabKey} onSelect={(k) => setTabKey(k)} className='mb-3'>
                  <Tab eventKey='new_patient' title='New Patient'>
                    <div className='container p-5'>
                      <h3>Register New Patient</h3>
                      <div className='mb-3'>
                        <label htmlFor='user_email' className='form-label'>
                          User Email:
                        </label>
                        <Field type='email' className='form-control' id='user_email' name='patient.user_email' />
                        <ErrorMessage className='text-danger' component={'small'} name='patient.user_email' />
                      </div>
                      <div className='mb-3'>
                        <label htmlFor='password' className='form-label'>
                          Password:
                        </label>
                        <Field type='password' className='form-control' id='password' name='patient.password' />
                        <ErrorMessage className='text-danger' component={'small'} name='patient.password' />
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey='existing_patient' title='Existing Patient'>
                    <div className='container p-5'>
                      <h3>Select Patient</h3>
                      <Field as='select' className='form-control' id='id' name='patient.id'>
                        <option disabled value=''>
                          (Make a Selection)
                        </option>
                        {patients.map((val) => {
                          return (
                            <option key={val._id} value={val._id}>
                              {val.user_email}
                            </option>
                          );
                        })}
                      </Field>
                      <ErrorMessage className='text-danger' component={'small'} name='patient.id' />
                    </div>
                  </Tab>
                </Tabs>
              )}

              <button type='submit' className='btn btn-success mt-5' disabled={!formik.isValid || formik.isSubmitting}>
                {action === 'edit' ? 'Update Admission Case' : 'Create Admission'}
              </button>
            </FormikForm>
          );
        }}
      </Formik>
    </>
  );
};

export default Form;
