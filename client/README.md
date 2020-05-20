*This README is for the GRAPHiQL queries* 

to add a logo, run this query:

mutation {
  addLogo(
    text: "sample text",
    color: "#ff33dd",
    backgroundColor: "#00ff00",
    fontSize: 44,
    textList: [{//enter text object -- check logoschema for text}],
    imgList: [{//enter img object -- check logoschema for text}],
    height: 344,
    width 355,
    borderColor:"#ff00ff",
    borderRadius:40,
    borderWidth:40,
    padding:40
    margin:40
  ) {
    lastUpdate
  }
}

to update a logo, run this query:
keep in mind that ID must be a valid ID for a logo that already exists in the database

mutation{
    updateLogo(
      id: "",
      text: "sample text",
      color: "#ffffff",
      backgroundColor: "#00ff00",
      fontSize: 40,
      textList: [{//enter text object -- check logoschema for text}],
      imgList: [{//enter img object -- check logoschema for text}],
      height: 344,
      width 355,
      borderColor: "#ff00ff",
      borderRadius: 40,
      borderWidth: 40,
      padding: 40,
      margin: 40,
    ){
   lastUpdate
  }
}

to geta specific logo, use this query:
keep in mind that ID must be a valid ID for a logo that already exists in the database

{
  logo(id: "") {
    _id
    text
    texList
    imgList
    height
    width
    backgroundColor
    borderColor
    borderWidth
    fontSize
    borderRadius
    padding
    margin
  }
}

to remove a specific logo, use this query: 
keep in mind that ID must be a valid ID for a logo that already exists in the database

mutation {
  removeLogo (id: "") {
    _id
  }
}

to get all logos, use this query:
{
  logos {
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