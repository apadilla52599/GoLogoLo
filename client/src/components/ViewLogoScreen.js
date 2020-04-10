import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text
            color
            fontSize
            backgroundColor
            borderColor
            borderRadius
            borderWidth
            padding
            margin
            lastUpdate
        }
    }
`;

const DELETE_LOGO = gql`
  mutation removeLogo($id: String!) {
    removeLogo(id:$id) {
      _id
    }
  }
`;

class ViewLogoScreen extends Component {

    render() {
        return (
            <Query pollInterval={500} query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    const styles = {
                        container: {
                            fontSize: data.logo.fontSize + 'pt',
                            color: data.logo.color,
                            backgroundColor: data.logo.backgroundColor,
                            borderColor: data.logo.borderColor,
                            borderRadius: data.logo.borderRadius + "px",
                            borderWidth: data.logo.borderThickness + "px",
                            borderStyle: 'solid',
                            padding: data.logo.padding + "px",
                            margin: data.logo.margin + "px"

                        }
                    }
                    return (
                        <div className="container">
                            <div className = "row">
                            <div className = "col">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h4><Link to="/">Home</Link></h4>
                                    <h3 className="panel-title">
                                        View Logo
                                    </h3>
                                </div>
                                <div className="panel-body">
                                    <dl>
                                        <dt>Text:</dt>
                                        <dd>{data.logo.text}</dd>
                                        <dt>Color:</dt>
                                        <dd>{data.logo.color}</dd>
                                        <dt>Font Size:</dt>
                                        <dd>{data.logo.fontSize}</dd>
                                        <dt>Last Updated:</dt>
                                        <dd>{data.logo.lastUpdate}</dd>
                                        <dt>Background Color:</dt>
                                        <dd>{data.logo.backgroundColor}</dd>
                                        <dt>Border Color:</dt>
                                        <dd>{data.logo.borderColor}</dd>
                                        <dt>Border Radius:</dt>
                                        <dd>{data.logo.borderRadius}</dd>
                                        <dt>Border Width:</dt>
                                        <dd>{data.logo.borderWidth}</dd>
                                        <dt>Padding:</dt>
                                        <dd>{data.logo.padding}</dd>
                                        <dt>Margin:</dt>
                                        <dd>{data.logo.margin}</dd>
                                    </dl>
                                    <Mutation mutation={DELETE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push('/')}>
                                        {(removeLogo, { loading, error }) => (
                                            <div>
                                                <form
                                                    onSubmit={e => {
                                                        e.preventDefault();
                                                        removeLogo({ variables: { id: data.logo._id } });
                                                    }}>
                                                    <Link to={`/edit/${data.logo._id}`} className="btn btn-success">Edit</Link>&nbsp;
                                                <button type="submit" className="btn btn-danger">Delete</button>
                                                </form>
                                                {loading && <p>Loading...</p>}
                                                {error && <p>Error :( Please try again</p>}
                                            </div>
                                        )}
                                    </Mutation>
                                </div>
                            </div></div>
                            <div className="col" style={{overflow: 'auto'}}>
                                <div style={ styles.container  } >
                                    {data.logo.text}
                                </div>
                                
                            </div></div>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default ViewLogoScreen;