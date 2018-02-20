import React, { Component } from 'react';
import toastr from 'toastr';
import {
  Grid,
  Row,
  Col,
  Table
} from 'react-bootstrap';
import api from '../../lib/api';
import LoadingIndicator from '../../components/LoadingIndicator'
import './style.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smartNodes: [],
      loading: true
    }
  }
  componentDidMount() {
    api.service('smart-node').find()
      .then(result => {
        this.setState({
          smartNodes: result.data,
          loading: false
        });
      })
      .catch(err => {
        toastr.error(err.message)
      })
  }
  render() {
    if (this.state.loading) { return <LoadingIndicator /> }
    return (
      <div className="Dashboard">
        <Grid>
          <Row>
            <Col xs={10} xsOffset={1}>
              <Table responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Address</th>
                    <th>Label</th>
                    <th>Sent</th>
                    <th>Received</th>
                    <th>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.smartNodes.map(node => (
                    <tr key={node._id}>
                      <td>{node._id}</td>
                      <td>{node.address}</td>
                      <td>{node.label}</td>
                      <td>{node.content.sent}</td>
                      <td>{node.content.received}</td>
                      <td>{node.content.balance}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;