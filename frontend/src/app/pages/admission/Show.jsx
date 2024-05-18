import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { currentUser } from '../../../helpers/current_user_helper';
import { deleteAdmission, showAdmission } from '../../redux/actions/admission_action';

const Show = () => {
  const dispatcher = useDispatch();
  const { admissions, admission } = useSelector((state) => state.admission);
  const user = currentUser();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const active_admission = filterAdmission();
    dispatcher(showAdmission(id, active_admission));
  }, [admission]);

  const filterAdmission = () => {
    return admissions.find((val) => val._id === id);
  };

  const handleDelete = () => {
    const c = window.confirm('Are you sure you want to delete this record?');
    if (c) {
      dispatcher(deleteAdmission(id));
      navigate('/');
    }
  };
  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='card-title'>Admission Record</h5>
      </div>
      <ul className='list-group list-group-flush'>
        <li className='list-group-item'>
          <b>Case</b>: {admission?.admission_case}
        </li>
        <li className='list-group-item'>
          <b>Ward Info</b>: {admission?.ward_details}
        </li>
        <li className='list-group-item'>
          <b>Created At</b>: {admission?.created_at}
        </li>
        <li className='list-group-item'>
          <b>Updated At</b>: {admission?.updated_at}
        </li>
        <li className='list-group-item'>
          <div className='card'>
            <div className='card-body'>
              <h5 className='card-title'>Patient</h5>
            </div>
            <ul className='list-group list-group-flush'>
              <ul className='list-group list-group-flush'>
                <li className='list-group-item'>
                  <b>User Email</b>: {admission?.patient?.user_email}
                </li>
              </ul>
            </ul>
          </div>
        </li>
        <li className='list-group-item'>
          <div className='card'>
            <div className='card-body'>
              <h5 className='card-title'>Doctor</h5>
            </div>
            <ul className='list-group list-group-flush'>
              <li className='list-group-item'>
                <b>User Email</b>: {admission?.doctor?.user_email}
              </li>
            </ul>
          </div>
        </li>
      </ul>
      {(user?.role === 'admin' || user?.role === 'doctor') && (
        <div className='card-body'>
          <Link className='btn btn-warning mx-1' to={`/admissions/${id}/edit`} title='Show'>
            Edit
          </Link>
          <button className='btn btn-danger' onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Show;
