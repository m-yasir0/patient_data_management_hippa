import React from 'react';
import { DatatableWrapper, Filter, Pagination, PaginationOptions, TableBody, TableHeader } from 'react-bs-datatable';
import { Col, Row, Table } from 'react-bootstrap';

const CustomTable = ({ headers, data }) => {
  return (
    <DatatableWrapper
      body={data}
      headers={headers}
      paginationOptionsProps={{
        initialState: {
          rowsPerPage: 10,
          options: [5, 10, 15, 20],
        },
      }}
    >
      <Row className='mb-4 p-2'>
        <Col xs={12} lg={4} className='d-flex flex-col justify-content-end align-items-end'>
          <Filter />
        </Col>
        <Col
          xs={12}
          sm={6}
          lg={4}
          className='d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0'
        >
          <PaginationOptions />
        </Col>
        <Col xs={12} sm={6} lg={4} className='d-flex flex-col justify-content-end align-items-end'>
          <Pagination />
        </Col>
      </Row>
      <div className='table-responsive'>
        <Table>
          <TableHeader />
          <TableBody />
        </Table>
      </div>
    </DatatableWrapper>
  );
};

export default CustomTable;
