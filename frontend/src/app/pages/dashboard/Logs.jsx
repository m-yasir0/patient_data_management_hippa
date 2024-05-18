import './index.scss';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '../../components/CustomTable';
import { currentUser } from '../../../helpers/current_user_helper';
import { listLogs } from '../../redux/actions/logs_action';

const Logs = () => {
  const dispatcher = useDispatch();
  const { logs } = useSelector((state) => state.logs);
  useEffect(() => {
    dispatcher(listLogs());
  }, []);

  const columns = [
    {
      title: 'Level',
      prop: 'level',
      isSortable: true,
      isFilterable: true,
    },
    {
      title: 'Message',
      prop: 'message',
      isSortable: true,
      isFilterable: true,
    },
    {
      title: 'User',
      prop: 'meta.user',
      cell: (row) => row.meta?.user,
      isFilterable: true,
    },
    {
      title: 'Log Action',
      prop: 'meta.action',
      cell: (row) => row.meta?.action,
      isFilterable: true,
    },
  ];
  return <CustomTable data={logs} headers={columns} />;
};

export default Logs;
