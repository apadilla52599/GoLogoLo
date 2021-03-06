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
        $imgList: [imgInput]!,
        $backgroundColor: String!,
        $fontSize: Int!,
        $height: Int!,
        $width: Int!,
        $borderColor: String!
        $borderRadius: Int!
        $borderWidth: Int!
        $padding: Int!
        $margin: Int!) {
        addLogo(
            textList: $textList,
            text: $text,
            color: $color,
            imgList: $imgList,
            backgroundColor: $backgroundColor,
            fontSize: $fontSize,
            height: $height,
            width: $width,
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
            imgList: [],
            imgURL: "",
            imgTop: 250,
            imgRight: 250,
            imgHeight: 200,
            imgWidth: 200,
            currentImgID: 0,
            height: "400px",
            width: "400px",
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

    handleHeightChange = (event) =>{
        this.setState({height: event.target.value})
    }

    handleWidthChange = (event) =>{
        this.setState({width: event.target.value})
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
        // for(let i = 0; i < this.state.textList.length;i++){
        //     if( intid === this.state.textList[i].id){
                console.log("did it work?")
                temptex = this.state.textList[0].textName
                tempcol = this.state.textList[0].color
                tempfont = this.state.textList[0].fontSize
                tempposx = this.state.textList[0].right
                tempposy = this.state.textList[0].top
                console.log(temptex,tempcol,tempfont,tempposx,tempposy)
        //     }
        // }
        this.setState({text: temptex, textColor: tempcol, fontSize: tempfont, top: tempposy, right: tempposx})
       
    }

    handleTopChange = (event) =>{
        this.setState({top: event.target.value, textList: this.state.textList.map(text=>{text.id === this.state.currentTextID ? text.top = parseInt(event.target.value): console.log() ; return text})})
    }

    handleRightChange = (event) =>{
        this.setState({right: event.target.value, textList: this.state.textList.map(text=>{text.id === this.state.currentTextID ? text.right = parseInt(event.target.value): console.log() ; return text})})
    }
    
    handleNew = (event) =>{
        
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
        console.log(copy)
        this.setState({textList: copy, currentTextID: id, text: text.textName, fontSize: text.fontSize, textColor: text.color, top: text.top, right: text.right})
        // and then select it
    }
    
    handleDeleteText = (event) =>{
        if(this.state.textList.length >1){
        var temparr = this.state.textList.slice()
        var index = 0;
        for(let i = 0; i <this.state.textList.length;i++){
            if(this.state.currentTextID === this.state.textList[i].id){
                index = i
            }
        }
        temparr.splice(index,1)
        this.setState({textList: temparr})
        if(this.state.textList.length > 1){
            this.setTextProperies();
            }
    }
    }

    handleDeleteImg = (event) =>{
        if(this.state.imgList.length > 0){
        var temparr = this.state.imgList.slice()
        var index = 0;
        for(let i = 0; i <this.state.imgList.length;i++){
            if(this.state.currentImgID === this.state.imgList[i].id){
                index = i
            }
        }
        temparr.splice(index,1)
        this.setState({imgList: temparr})
        
        if(temparr.length >1){
        }
    }
    }

    handleImgSelect = (event) => {
        console.log("CLICKED");
        this.setState({currentImgID: parseInt(event.currentTarget.id)})
        console.log(event.currentTarget)
        let tempheight = 0
        let tempwidth = 0
        let tempposx = 0
        let tempposy = 0
        for(let i = 0; i < this.state.imgList.length;i++){
            if( parseInt(event.currentTarget.id) === this.state.imgList[i].id){
                tempheight = this.state.imgList[i].height
                tempwidth = this.state.imgList[i].width
                tempposx = this.state.imgList[i].right
                tempposy = this.state.imgList[i].top
            }
        }
        this.setState({imgHeight: tempheight, imgWidth: tempwidth, imgTop: tempposy, imgRight: tempposx})

    }

    handleURLChange = (event) => {
        console.log(event.target.value)
        this.setState({imgURL: event.target.value})
    }

    handleNewImage = (event) => {
        let temp = 0
        for(let i = 0; i< this.state.imgList.length; i++){
            if(this.state.imgList[i].id > temp){
                temp = this.state.imgList[i].id
            }
        }
        let id = temp + 1
        if(this.state.imgURL !== ""){
            let img = {id: id, imgURL: this.state.imgURL, height: 200, width: 200, top: 250, right: 250 }
            let copy = this.state.imgList.slice()
            copy.push(img)
            this.setState({imgList: copy, currentImgID: id})
            console.log("added")
        }

    }

    handleImgTopChange = (event) =>{
        console.log("in top change")
        this.setState({imgTop: event.target.value, imgList: this.state.imgList.map(img=>{img.id === this.state.currentImgID ? img.top = parseInt(event.target.value): console.log() ; return img})})
    }

    handleImgRightChange = (event) =>{
        this.setState({imgRight: event.target.value, imgList: this.state.imgList.map(img=>{img.id === this.state.currentImgID ? img.right = parseInt(event.target.value): console.log() ; return img})})
    }

    handleImgHeightChange = (event) =>{
        this.setState({imgHeight: event.target.value, imgList: this.state.imgList.map(img=>{img.id === this.state.currentImgID ? img.height = parseInt(event.target.value): console.log() ; return img})})
    }

    handleImgWidthChange = (event) =>{
        this.setState({imgWidth: event.target.value, imgList: this.state.imgList.map(img=>{img.id === this.state.currentImgID ? img.width = parseInt(event.target.value): console.log() ; return img})})
    }

    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderWidth, padding, margin, height, width;
        const styles = {
            container: {
                //CHANGE
                height: this.state.height,
                width: this.state.width,
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

                                    delete cleaned.__typename
                                    cleaned.map((item) => (
                                       
                                        delete item.__typename
                                    ))

                                    let cleanedimg = JSON.parse(JSON.stringify(this.state.imgList))
                                                delete cleanedimg.__typename
                                                cleanedimg.map((item) => (
                                                    delete item.__typename
                                                ))
                                    addLogo({ variables: { textList: cleaned, text: this.state.text, color: this.state.textColor, imgList: cleanedimg, backgroundColor: backgroundColor.value, fontSize: parseInt(this.state.fontSize), height: parseInt(this.state.height), width: parseInt(this.state.width),  borderColor: borderColor.value, borderRadius: parseInt(borderRadius.value), borderWidth: parseInt(borderWidth.value), padding: parseInt(padding.value), margin: parseInt(margin.value)} });
                                    text.value = "";
                                    color.value = "";
                                    fontSize.value = "";
                                    backgroundColor = "";
                                    borderColor = "";
                                    borderRadius = "";
                                    borderWidth = "";
                                    padding = "";
                                    margin = "";
                                    height.value = "";
                                    width.value = "";
                                }}>
                                    <label>Select a text:</label>
                                    <Dropdown onChange={this.handleTextSelect} options={this.state.textList.map(text => [text.textName, ', '+ text.id ] )} placeholder={this.state.text}>
                                    </Dropdown>
                                    <label>Or add new: </label>
                                    <a className="btn btn-light" onClick={this.handleNew}>ADD NEW</a> 
                                    <a className="btn btn-light" onClick={this.handleDeleteText}>DELETE TEXT</a>
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
                                    <label>Enter a URL for an image! (click img to change properties)</label>
                                    <input type="text" onChange={this.handleURLChange} placeholder="Valid Image URL"></input>
                                    <button type="button" className="btn btn-light" onClick={this.handleNewImage}>ADD</button>
                                    <button type="button" className="btn btn-light" onClick={this.handleDeleteImg}>DELETE</button>
                                    <br></br>
                                    <label>Change img position x: </label>
                                    <br></br>
                                    <input type="Number" value = {this.state.imgRight} onChange={this.handleImgRightChange} placeholder="Change position x of image"></input>
                                    <br></br>
                                    <label>Change img position y: </label>
                                    <br></br>
                                    <input type="Number" value = {this.state.imgTop} onChange={this.handleImgTopChange} placeholder="Change position y of image"></input>
                                    <br></br>
                                    <label>Change img height: </label>
                                    <br></br>
                                    <input type="Number" value = {this.state.imgHeight} onChange={this.handleImgHeightChange} placeholder="Change height of image"></input>
                                    <br></br>
                                    <label>Change img width: </label>
                                    <br></br>
                                    <input type="Number" value = {this.state.imgWidth} onChange={this.handleImgWidthChange} placeholder="Change qidth of image"></input>
                                    <div className="form-group">
                                        <label htmlFor="height">logo height:</label>
                                        <input type="number" className="form-control" value = {this.state.height} onChange = {this.handleHeightChange} name="height" ref={node => {
                                            height = node;
                                        }} placeholder="logo height" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="width">logo width:</label>
                                        <input type="number" className="form-control" value = {this.state.width} onChange = {this.handleWidthChange} name="width" ref={node => {
                                            width = node;
                                        }} placeholder="logo width" />
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
                            {this.state.imgList.map(img =>(<img id={img.id} onClick={this.handleImgSelect} src={img.imgURL} style={{position: "absolute", height: img.height, width: img.width, top: img.top, right: img.right}}></img>))}
                            </div>
                        </div>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default CreateLogoScreen;