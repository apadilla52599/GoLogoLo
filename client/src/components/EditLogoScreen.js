import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            textList {textName, color, fontSize, topPos, rightPos}
            text
            color
            backgroundColor
            fontSize
            borderColor
            borderRadius
            borderWidth
            padding
            margin
        }
    }
`;

const UPDATE_LOGO = gql`
    mutation updateLogo(
        $id: String!,
        $textList: [textsInput]!,
        $text: String!,
        $color: String!,
        $backgroundColor: String!
        $fontSize: Int!
        $borderColor: String!
        $borderRadius: Int!
        $borderWidth: Int!
        $padding: Int!
        $margin: Int!) {
            updateLogo(
                id: $id,
                textList: $textList
                text: $text,
                color: $color,
                backgroundColor: $backgroundColor,
                fontSize: $fontSize
                borderColor: $borderColor
                borderRadius: $borderRadius
                borderWidth: $borderWidth
                padding: $padding
                margin: $margin) {
                    lastUpdate
                }
        }
`;

class EditLogoScreen extends Component {

    constructor(props) {
        super(props);
        // WE'LL MANAGE THE UI CONTROL
        // VALUES HERE
        this.state = { 
            text: null,
            textList: [],
            rendered: false,
            flag: false,
            editText: null,
            textColor : null,
            fontSize : null ,
            backgroundColor: null,
            borderColor: null,
            borderRadius: null ,
            borderWidth: null,
            padding: null,
            margin: null,
        }
    }

    editingText = (event) => {
        this.setState({text: event.target.value})
        console.log(event.target.value)
    }
    
    handleColorChange = (event) => {
        this.setState({textColor: event.target.value})
    }
    
    handleFontSizeChange = (event) => {
        if(event.target.value > 144){
            event.target.value = 144
        }
        if(event.target.value < 4){
            event.target.value = 4
        }
        this.setState({fontSize: event.target.value})
    }
    
    handleBackgroundColorChange = (event) => {
        this.setState({backgroundColor: event.target.value})
    }

    handleBorderColorChange = (event) => {
        this.setState({borderColor: event.target.value})
    }

    handleBorderRadiusChange = (event) => {
        if(event.target.value > 144){
            event.target.value = 144
        }
        if(event.target.value < 4){
            event.target.value = 4
        }
        this.setState({borderRadius: event.target.value})
    }

    handleBorderWidthChange = (event) => {
        if(event.target.value > 144){
            event.target.value = 144
        }
        if(event.target.value < 4){
            event.target.value = 4
        }
        this.setState({borderWidth: event.target.value})
    }

    handlePaddingChange = (event) => {
        if(event.target.value > 144){
            event.target.value = 144
        }
        if(event.target.value < 4){
            event.target.value = 4
        }
        this.setState({padding: event.target.value})
    }

    handleMarginChange = (event) =>{
        if(event.target.value > 144){
            event.target.value = 144
        }
        if(event.target.value < 4){
            event.target.value = 4
        }
        this.setState({margin: event.target.value})
    }

    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderWidth, padding, margin;
        const styles = {
            container: {
                height: "400px",
                width: "400px",
                color: this.state.textColor,
                fontSize: this.state.fontSize + "pt" ,
                backgroundColor: this.state.backgroundColor,
                borderColor: this.state.borderColor,
                borderRadius: this.state.borderRadius + "px",
                borderWidth: this.state.borderWidth + "px",
                borderStyle: 'solid',
                padding: this.state.padding + "px",
                margin: this.state.margin + "px"
            },
            container2: {
                position: "absolute",
                top: "0px",
                right: "0px",
                height: "500px",
                color: this.state.textColor,
                fontSize: this.state.fontSize + "pt" ,
            }
        }
        return (
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    if(this.state.text === null){

                        this.setState({text: data.logo.text, textList: [data.logo.text], rendered: true, editText: data.logo.text, textColor: data.logo.color, fontSize: data.logo.fontSize, backgroundColor: data.logo.backgroundColor, borderColor: data.logo.borderColor, borderRadius: data.logo.borderRadius, borderWidth: data.logo.borderWidth, padding: data.logo.padding, margin: data.logo.margin}) //CHANGE OCCURED
                        // you changed textList to data.logo.text when it should be data.logo.textList, this is only working because you only have one text.
                    }
                    return (
                        <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`/`)}>
                            {(updateLogo, { loading, error }) => (
                                <div className="container">
                                    <div className = "row">
                                    <div className = "col-sm-4">
                                    <div className="card">
                                        <div className="card-header">
                                            <a href="/" className="btn btn-light" > Home </a>
                                            <h3 className="panel-title">
                                                Edit Logo
                                        </h3>
                                        </div>
                                        <div className="panel-body">                                            
                                            <form onSubmit={e => {
                                                e.preventDefault();
                                                updateLogo({ variables: { id: data.logo._id, text: text.value, textList: [{}], color: color.value, backgroundColor: backgroundColor.value,fontSize: parseInt(fontSize.value), borderColor: borderColor.value, borderRadius: parseInt(borderRadius.value), borderWidth: parseInt(borderWidth.value), padding: parseInt(padding.value), margin: parseInt(margin.value) } });
                                                text.value = "";
                                                color.value = "";
                                                fontSize.value = "";
                                                backgroundColor.value = "";
                                                borderColor.value = "";
                                                borderRadius.value = "";
                                                borderWidth.value = "";
                                                padding.value = "";
                                                margin.value = "";
                                            }}>
                                                <button className="btn btn-light" > ADD NEW TEXT(NOT OPERABLE YET)</button>
                                                <div className="form-group">
                                                    <label htmlFor="text">Text:</label>
                                                    <input type="text" value = {this.state.text} onChange={this.editingText} className="form-control" name="text" ref={node => {
                                                        text = node;
                                                    }} placeholder="Text" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="color">Color:</label>
                                                    <input type="color" className="form-control" value = {this.state.textColor} onChange={this.handleColorChange} name="color" ref={node => {
                                                        color = node;
                                                    }} placeholder="Color"  />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="fontSize">Font Size:</label>
                                                    <input type="number" className="form-control" value = {this.state.fontSize} onChange = {this.handleFontSizeChange} name="fontSize" ref={node => {
                                                        fontSize = node;
                                                    }} placeholder="Font Size" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="backgroundColor">Background Color:</label>
                                                    <input type="color" className="form-control" value = {this.state.backgroundColor} onChange = {this.handleBackgroundColorChange}name="backgroundColor" ref={node => {
                                                        backgroundColor = node;
                                                    }} placeholder="Background Color"  />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="borderColor">Border Color:</label>
                                                    <input type="color" className="form-control" value = {this.state.borderColor} onChange = {this.handleBorderColorChange} name="borderColor" ref={node => {
                                                        borderColor = node;
                                                    }} placeholder="Border Color"  />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="borderRadius">Border Radius:</label>
                                                    <input type="number" className="form-control" value = {this.state.borderRadius} onChange = {this.handleBorderRadiusChange} name="borderRadius" ref={node => {
                                                        borderRadius = node;
                                                    }} placeholder="Border Radius" defaultValue={data.logo.borderRadius} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="borderWidth">Border Width:</label>
                                                    <input type="number" className="form-control" value = {this.state.borderWidth} onChange = {this.handleBorderWidthChange} name="borderWidth" ref={node => {
                                                        borderWidth = node;
                                                    }} placeholder="Border Width" defaultValue={data.logo.borderWidth} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="padding">Padding:</label>
                                                    <input type="number" className="form-control" value = {this.state.padding} onChange = {this.handlePaddingChange} name="padding" ref={node => {
                                                        padding = node;
                                                    }} placeholder="Padding" defaultValue={data.logo.padding} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="margin">Margin:</label>
                                                    <input type="number" className="form-control" value = {this.state.margin} onChange = {this.handleMarginChange} name="margin" ref={node => {
                                                        margin = node;
                                                    }} placeholder="Margin" defaultValue={data.logo.margin} />
                                                </div>
                                                <button type="submit" className="btn btn-success">Submit</button>
                                            </form>
                                            {loading && <p>Loading...</p>}
                                            {error && <p>Error :( Please try again</p>}
                                        </div>
                                    </div>
                                    </div>
                                    <div className = "col-sm-8">
                                        <div style={ styles.container } >
                                            {this.state.textList[0]}
                                        </div>
                                        <div style={ styles.container2 } >
                                            {this.state.text}
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            )}
                        </Mutation>
                    );
                }}
            </Query>
        );
    }
}

export default EditLogoScreen;