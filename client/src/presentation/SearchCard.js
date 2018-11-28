import React from 'react';
import { Jumbotron, Grid, Row, Col } from 'react-bootstrap'
import SearchForm from '../container/SearchForm'

const SearchCard = ({ search }) =>
  <div className="container-fluid">
    <Grid>
      <Row className="show-grid">
        <Col xs={6} md={4}>
          <Jumbotron>
            <SearchForm key='form-1' />
          </Jumbotron>
        </Col>
        <Col xs={6} md={4}>
          <Jumbotron>
            <SearchForm key='form-2' />
          </Jumbotron>
        </Col>
        <Col xsHidden md={4}>
          <Jumbotron>
            <SearchForm key='form-3' />
          </Jumbotron>
        </Col>
      </Row>
    </Grid>
  </div>

export default SearchCard
