import './index.scss';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deleteAdmission, listAdmission } from '../../redux/actions/admission_action';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '../../components/CustomTable';
import { currentUser } from '../../../helpers/current_user_helper';

const Index = () => {
  const dispatcher = useDispatch();
  const user = currentUser();
  const { admissions } = useSelector((state) => state.admission);
  useEffect(() => {
    dispatcher(listAdmission());
  }, []);

  const handleDelete = (id) => {
    const c = window.confirm('Are you sure you want to delete this record?');
    if (c) {
      dispatcher(deleteAdmission(id));
    }
  };

  const columns = [
    {
      title: 'Admission Case',
      prop: 'admission_case',
      isSortable: true,
      isFilterable: true,
    },
    {
      title: 'Ward Details',
      prop: 'ward_details',
      isSortable: true,
      isFilterable: true,
    },
    {
      title: 'Doctor',
      prop: 'doctor.user_email',
      cell: (row) => row.doctor?.user_email,
      isSortable: true,
      isFilterable: true,
    },
    {
      title: 'Patient',
      prop: 'patient.user_email',
      cell: (row) => row.patient?.user_email,
      isSortable: true,
      isFilterable: true,
    },
    {
      prop: 'action',
      title: 'Action',
      cell: (row) => {
        return (
          <div className='action-buttons'>
            <Link className='btn btn-primary mx-1' to={`/admissions/${row._id}/show`} title='Show'>
              Show
            </Link>
            {(user?.role === 'admin' || user?.role === 'doctor') && (
              <>
                <Link className='btn btn-warning mx-1' to={`/admissions/${row._id}/edit`} title='Show'>
                  Edit
                </Link>
                <button className='btn btn-danger' onClick={() => handleDelete(row._id)}>
                  Delete
                </button>
              </>
            )}
          </div>
        );
      },
    },
  ];
  return <CustomTable data={admissions} headers={columns} />;
};

export default Index;
