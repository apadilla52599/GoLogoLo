import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import  Dropdown  from 'react-dropdown';
import 'react-dropdown/style.css';
// import { Link } from 'react-router-dom';

const ADD_LOGO = gql`
    mutation AddLogo(
        $textList: [textsInput]!,
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
            textList: $textList,
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
    
        this.state = { 
            text: "goLogoLo",
            texts: [['goLogoLo']],
            textList: [{id: 0, textName: "goLogoLo", fontSize: 40, color: "#ffffff", top: 185, right: 412}],
            currentTextID: 0,
            top: 185,
            right: 412,
            flag: false,
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
        this.setState({text: event.target.value, textList: this.state.textList.map(text=>{text.id === this.state.currentTextID ? text.textName = event.target.value: console.log() ; return text})})
    }
    
    handleColorChange = (event) => {
        this.setState({textColor: event.target.value, textList: this.state.textList.map(text=>{text.id === this.state.currentTextID ? text.color = event.target.value: console.log() ; return text})})
    }
    
    handleFontSizeChange = (event) => {
        if(event.target.value > 144){
            event.target.value = 144
        }
        if(event.target.value < 4){
            event.target.value = 4
        }
        this.setState({fontSize: event.target.value, textList: this.state.textList.map(text=>{text.id === this.state.currentTextID ? text.fontSize = parseInt(event.target.value): console.log() ; return text})})
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

    handleTextSelect = (event) =>{
        var res = (''+event.value).split(', ')
        let string= res[0].replace(',', '')
        console.log(res[1])
        let intid = parseInt(res[1])
        this.setState({currentTextID: intid, text: string})
        this.setTextProperies(intid);

    }

    setTextProperies = (intid) =>{
        console.log(this.state)
        let temptex = ''
        let tempcol = ''
        let tempfont = 0
        let tempposx = 0
        let tempposy = 0
        for(let i = 0; i < this.state.textList.length;i++){
            if( intid === this.state.textList[i].id){
                console.log("stinky poop")
                console.log(intid)
                temptex = this.state.textList[i].textName
                tempcol = this.state.textList[i].color
                tempfont = this.state.textList[i].fontSize
                tempposx = this.state.textList[i].right
                tempposy = this.state.textList[i].top
                console.log(temptex,tempcol,tempfont,tempposx,tempposy)
            }
        }
        this.setState({text: temptex, textColor: tempcol, fontSize: tempfont, top: tempposy, right: tempposx})
       
    }

    handleTopChange = (event) =>{
        this.setState({top: event.target.value, textList: this.state.textList.map(text=>{text.id === this.state.currentTextID ? text.top = parseInt(event.target.value): console.log() ; return text})})
    }

    handleRightChange = (event) =>{
        this.setState({right: event.target.value, textList: this.state.textList.map(text=>{text.id === this.state.currentTextID ? text.right = parseInt(event.target.value): console.log() ; return text})})
    }
    
    handleNew = (event) =>{
        console.log("needs implementation")
        // calculate last ID and then add one to it 
        // create new one with default settings
        let temp = 0
        for(let i = 0; i< this.state.textList.length; i++){
            if(this.state.textList[i].id > temp){
                temp = this.state.textList[i].id
            }
        }
        let id = temp + 1
        let text = {id: id, textName: "goLogoLo", fontSize: 40, color: "#ffffff", top: 250, right: 100}
        let copy = this.state.textList.slice()
        copy.push(text)
        console.log(this.state.textList)
        console.log(this.state.copy)
        this.setState({textList: copy, currentTextID: id})
        // and then select it
    }


    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderWidth, padding, margin;
        const styles = {
            container: {
                //CHANGE
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
                                    let cleaned = JSON.parse(JSON.stringify(this.state.textList))

                                    // Strip __typename from uiParent and item list
                                    delete cleaned.__typename
                                    cleaned.map((item) => (
                                        // eslint-disable-next-line no-param-reassign
                                        delete item.__typename
                                    ))
                                    addLogo({ variables: { textList: cleaned, text: this.state.text, color: this.state.textColor, backgroundColor: backgroundColor.value, fontSize: parseInt(this.state.fontSize),  borderColor: borderColor.value, borderRadius: parseInt(borderRadius.value), borderWidth: parseInt(borderWidth.value), padding: parseInt(padding.value), margin: parseInt(margin.value)} });
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
                                    <label>Select a text:</label>
                                    <Dropdown onChange={this.handleTextSelect} options={this.state.textList.map(text => [text.textName, ', '+ text.id ] )} placeholder={this.state.text}>
                                    </Dropdown>
                                    <label>Or add new: </label>
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
                                        <input type="number" className="form-control"  value = {this.state.fontSize} onChange = {this.handleFontSizeChange} name="fontSize" ref={node => {
                                            fontSize = node;
                                        }} placeholder="Font Size" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="right">postion x:</label>
                                        <input type="number" className="form-control" value = {this.state.right} onChange = {this.handleRightChange} name="right" ref={node => {
                                            fontSize = node;
                                        }} placeholder="Font Size" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="top">position y:</label>
                                        <input type="number" className="form-control" value = {this.state.top} onChange = {this.handleTopChange} name="top" ref={node => {
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
                            </div>
                            {this.state.textList.map(textobj => (<div  style={{color: textobj.color, fontSize: textobj.fontSize, position: "absolute", top: textobj.top + "px", right: textobj.right + "px"}}> {textobj.textName} </div>))} 
                            </div>
                        </div>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default CreateLogoScreen;