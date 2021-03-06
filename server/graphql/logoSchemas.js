var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLInputObjectType = require('graphql').GraphQLInputObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var LogoModel = require('../models/Logo');

var logoType = new GraphQLObjectType({
    name: 'logo',
    fields: function () {
        return {
            _id: {
                type: GraphQLString
            },
            textList:{
                type: GraphQLList(textType)
            },
            imgList:{
                type: GraphQLList(imgType)
            },
            text: {
                type: GraphQLString
            },
            color: {
                type: GraphQLString
            },
            height: {
                type: GraphQLInt
            },
            width: {
                type: GraphQLInt
            },
            backgroundColor: {
                type: GraphQLString
            },
            fontSize: {
                type: GraphQLInt
            },
            borderColor: {
                type: GraphQLString
            },
            borderRadius: {
                type: GraphQLInt
            },
            borderWidth: {
                type: GraphQLInt
            },
            padding: {
                type: GraphQLInt
            },
            margin: {
                type: GraphQLInt
            },
            lastUpdate: {
                type: GraphQLDate
            }
        }
    }
});

var textType = new GraphQLObjectType({
    name: 'texts',
    fields: function (){
        return {
            id: {
                type: GraphQLInt
            },
            textName: {
                type: GraphQLString
            },
            color: {
                type: GraphQLString
            },
            fontSize: {
                type: GraphQLInt
            },
            top: {
                type: GraphQLInt
            },
            right: {
                type: GraphQLInt
            }
        }
    }
});

var imgType = new GraphQLObjectType({
    name: 'img',
    fields: function (){
        return {
            id: {
                type: GraphQLInt
            },
            imgURL: {
                type: GraphQLString
            },
            height: {
                type: GraphQLInt
            },
            width: {
                type: GraphQLInt
            },
            top: {
                type: GraphQLInt
            },
            right: {
                type: GraphQLInt
            }
        }
    }
});

var textTypeInput = new GraphQLInputObjectType({
    name: 'textsInput',
    fields: function (){
        return {
            id: {
                type: GraphQLInt
            },
            textName: {
                type: GraphQLString
            },
            color: {
                type: GraphQLString
            },
            fontSize: {
                type: GraphQLInt
            },
            top: {
                type: GraphQLInt
            },
            right: {
                type: GraphQLInt
            }
        }
    }
});

var imgTypeInput = new GraphQLInputObjectType({
    name: 'imgInput',
    fields: function (){
        return {
            id: {
                type: GraphQLInt
            },
            imgURL: {
                type: GraphQLString
            },
            height: {
                type: GraphQLInt
            },
            width: {
                type: GraphQLInt
            },
            top: {
                type: GraphQLInt
            },
            right: {
                type: GraphQLInt
            }
        }
    }
});


var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {
            logos: {
                type: new GraphQLList(logoType),
                resolve: function () {
                    const logos = LogoModel.find().exec()
                    if (!logos) {
                        throw new Error('Error')
                    }
                    return logos
                }
            },
            logo: {
                type: logoType,
                args: {
                    id: {
                        name: '_id',
                        type: GraphQLString
                    }
                },
                resolve: function (root, params) {
                    const logoDetails = LogoModel.findById(params.id).exec()
                    if (!logoDetails) {
                        throw new Error('Error')
                    }
                    return logoDetails
                }
            }
        }
    }
});

var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
        return {
            addLogo: {
                type: logoType,
                args: {
                    textList: {
                        type: new GraphQLNonNull(GraphQLList(textTypeInput))
                    },
                    text: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    color: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    imgList: {
                        type: new GraphQLNonNull(GraphQLList(imgTypeInput))
                    },
                    backgroundColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    fontSize: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    height : {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    width : {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    borderColor : {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderRadius : {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    borderWidth : {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    padding : {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    margin : {
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve: function (root, params) {
                    const logoModel = new LogoModel(params);
                    const newLogo = logoModel.save();
                    if (!newLogo) {
                        throw new Error('Error');
                    }
                    return newLogo
                }
            },
            updateLogo: {
                type: logoType,
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    textList: {
                        type: new GraphQLNonNull(GraphQLList(textTypeInput))
                    },
                    text: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    color: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    imgList: {
                        type: new GraphQLNonNull(GraphQLList(imgTypeInput))
                    },
                    backgroundColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    fontSize: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    height : {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    width : {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    borderColor : {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderRadius : {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    borderWidth : {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    padding : {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    margin : {
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve(root, params) {
                    return LogoModel.findByIdAndUpdate(params.id, { textList: params.textList, text: params.text, color: params.color, imgList: params.imgList, backgroundColor: params.backgroundColor, fontSize: params.fontSize, height: params.height, width: params.width, borderColor: params.borderColor, borderRadius: params.borderRadius, borderWidth: params.borderWidth, padding: params.padding, margin: params.margin, lastUpdate: new Date() }, function (err) {
                        if (err) return next(err);
                    });
                }
            },
            removeLogo: {
                type: logoType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root, params) {
                    const remLogo = LogoModel.findByIdAndRemove(params.id).exec();
                    if (!remLogo) {
                        throw new Error('Error')
                    }
                    return remLogo;
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });