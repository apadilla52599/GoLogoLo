import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            textList {id textName color fontSize top right}
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
                            // CHANGE
                            height: "400px",
                            width: "400px",
                            fontSize: data.logo.fontSize + 'pt',
                            color: data.logo.color,
                            backgroundColor: data.logo.backgroundColor,
                            borderColor: data.logo.borderColor,
                            borderRadius: data.logo.borderRadius + "px",
                            borderWidth: data.logo.borderWidth + "px",
                            borderStyle: 'solid',
                            padding: data.logo.padding + "px",
                            margin: data.logo.margin + "px"

                        }
                    }
                    console.log(this.state)
                    return (
                        <div className="container">
                            <div className = "row">
                            <div className = "col-sm-4">
                            <div className="card">
                                <div className="card-header">
                                    <a href="/" className="btn btn-light" > Home </a>
                                    <h3 className="card-title">
                                        View Logo
                                    </h3>
                                </div>
                                <div className="panel-body">
                                    <dl>
                                        <dt>Texts:</dt>
                                        <dd>{data.logo.textList.length}</dd>
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
                            <div className="col-sm-8" style={{overflow: 'auto'}}>
                                <div style={ styles.container  } >
                                </div>
                                {data.logo.textList.map(textobj => (<div  style={{color: textobj.color, fontSize: textobj.fontSize, position: "absolute", top: textobj.top + "px", right: textobj.right + "px"}}> {textobj.textName} </div>))}
                            </div></div>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default ViewLogoScreen;