import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
// import { Link } from 'react-router-dom';

const ADD_LOGO = gql`
    mutation AddLogo(

        $text: String!,
        $color: String!,
        $backgroundColor: String!,
        $fontSize: Int!
        $borderColor: String!
        $borderRadius: Int!
        $borderWidth: Int!
        $padding: Int!
        $margin: Int!) {
        addLogo(

            text: $text,
            color: $color,
            backgroundColor: $backgroundColor,
            fontSize: $fontSize,
            borderColor: $borderColor,
            borderRadius: $borderRadius,
            borderWidth: $borderWidth,
            padding: $padding,
            margin: $margin) {
            _id
        }
    }
`;

class CreateLogoScreen extends Component {
    constructor(props) {
        super(props);
        // WE'LL MANAGE THE UI CONTROL
        // VALUES HERE
        this.state = { 
            text: "goLogoLo",
            rendered: false,
            flag: false,
            editText: "goLogoLo",
            textColor : "#ffffff",
            fontSize : 40,
            backgroundColor: "#00ff00",
            borderColor: "#ff00ff",
            borderRadius:  40,
            borderWidth: 40,
            padding: 40,
            margin: 40,
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
                color: this.state.textColor,
                fontSize: this.state.fontSize + "pt" ,
                backgroundColor: this.state.backgroundColor,
                borderColor: this.state.borderColor,
                borderRadius: this.state.borderRadius + "px",
                borderWidth: this.state.borderWidth + "px",
                borderStyle: 'solid',
                padding: this.state.padding + "px",
                margin: this.state.margin + "px"
            }
        }
        return (
            <Mutation mutation={ADD_LOGO} onCompleted={() => this.props.history.push('/')}>
                {(addLogo, { loading, error }) => (
                    <div className="container">
                        <div className = "row">
                        <div className = "col-sm-4">
                        <div className="card">
                            <div className="card-header">
                                <a href="/" className="btn btn-light" > Home </a>
                                <h3 className="panel-title">
                                    Create Logo
                            </h3>
                            </div>
                            <div className="panel-body">
                                <form onSubmit={e => {
                                    e.preventDefault();
                                    addLogo({ variables: { text: text.value, color: color.value, backgroundColor: backgroundColor.value, fontSize: parseInt(fontSize.value),  borderColor: borderColor.value, borderRadius: parseInt(borderRadius.value), borderWidth: parseInt(borderWidth.value), padding: parseInt(padding.value), margin: parseInt(margin.value)} });
                                    text.value = "";
                                    color.value = "";
                                    fontSize.value = "";
                                    backgroundColor = "";
                                    borderColor = "";
                                    borderRadius = "";
                                    borderWidth = "";
                                    padding = "";
                                    margin = "";
                                }}>
                                    <div className="form-group">
                                        <label htmlFor="text">Text:</label>
                                        <input type="text"value = {this.state.text} onChange={this.editingText} className="form-control" name="text" ref={node => {
                                            text = node;
                                        }} placeholder="Text" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="color">Color:</label>
                                        <input type="color" value = {this.state.textColor} onChange={this.handleColorChange} className="form-control" name="color" ref={node => {
                                            color = node;
                                        }} placeholder="Color" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fontSize">Font Size:</label>
                                        <input type="number" className="form-control"  value = {this.state.fontSize} onChange = {this.handleFontSizeChange} name="fontSize" ref={node => {
                                            fontSize = node;
                                        }} placeholder="Font Size" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="backgroundColor">Background Color:</label>
                                        <input type="color" className="form-control" value = {this.state.backgroundColor} onChange = {this.handleBackgroundColorChange} name="backgroundColor" ref={node => {
                                            backgroundColor = node;
                                        }} placeholder="Background Color" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderColor">Border Color:</label>
                                        <input type="color" className="form-control" value = {this.state.borderColor} onChange = {this.handleBorderColorChange} name="borderColor" ref={node => {
                                            borderColor = node;
                                        }} placeholder="Border Color" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderRadius">Border Radius:</label>
                                        <input type="number" className="form-control" value = {this.state.borderRadius} onChange = {this.handleBorderRadiusChange} name="borderRadius" ref={node => {
                                            borderRadius = node;
                                        }} placeholder="Border Radius" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderWidth">Border Width:</label>
                                        <input type="number" className="form-control" value = {this.state.borderWidth} onChange = {this.handleBorderWidthChange} name="borderWidth" ref={node => {
                                            borderWidth = node;
                                        }} placeholder="Border Width" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="padding">Padding:</label>
                                        <input type="number" className="form-control" value = {this.state.padding} onChange = {this.handlePaddingChange} name="padding" ref={node => {
                                            padding = node;
                                        }} placeholder="Padding" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="margin">Margin:</label>
                                        <input type="number" className="form-control"  value = {this.state.margin} onChange = {this.handleMarginChange} name="margin" ref={node => {
                                            margin = node;
                                        }} placeholder="Margin" />
                                    </div>
                                    <button type="submit" className="btn btn-success">Submit</button>
                                </form>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error :( Please try again</p>}
                            </div>
                            </div>
                            </div>
                            <div className = "col-sm-8">
                            <div style={ styles.container  } >
                                {this.state.text}
                            </div>
                            </div>
                        </div>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default CreateLogoScreen;