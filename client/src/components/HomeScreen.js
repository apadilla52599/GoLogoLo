import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
// import {Button} from '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const GET_LOGOS = gql`
  {
    logos {
      _id
      text
      lastUpdate
    }
  }
`;

class HomeScreen extends Component {

    render() {
        return (
            <Query pollInterval={500} query={GET_LOGOS}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <div className="container row">
                            <div className="col s4">
                                <div className="card">
                                <h3>Recent Work</h3>
                                {data.logos.map((logo, index) => (
                                    <div key={index} className='home_logo_link'
                                        style={{ cursor: "pointer" }}>
                                        <Link to={`/view/${logo._id}`}>{logo.text}</Link>
                                    </div>
                                ))}</div>
                            </div>
                            <div className="col s8">
                                <div id="home_banner_container">
                                    GoLogoLo<br />
                                    
                                </div>
                                <div>
                                    {/* <Link id="add_logo_button" to="/create">Add Logo</Link> */}
                                    <a href="/create" className="btn btn-light" > Add logo </a>
                                </div>
                            </div>
                        </div>
                    );
                }
                }
            </Query >
        );
    }
}

export default HomeScreen;
