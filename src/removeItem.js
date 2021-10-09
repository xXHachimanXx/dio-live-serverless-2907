"use strict";

const AWS = require("aws-sdk")

const deleteItem = async (event) => {

    const {
        itemStatus
    } = JSON.parse(event.body);
    const {
        id
    } = event.pathParameters

    const dynamodb = new AWS.DynamoDB.DocumentClient();

    var params = {
        TableName: "ItemTable",
        Key: {
            id
        },
        ConditionExpression: "info.rating <= :val",
        ExpressionAttributeValues: {
            ':itemStatus': itemStatus
        }
    };

    await dynamodb.delete(params).promise()

    return {
        statusCode: 200,
        body: JSON.stringify({
            msg: 'Item removed'
        }),
    };
};


module.exports = {
    handler: updateItem
}