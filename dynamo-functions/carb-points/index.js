// const AWS = require('aws-sdk');
const axios = require('axios');

const REQUEST_URL = 'https://trackapi.nutritionix.com/v2'

/**
 * Demonstrates a simple HTTP endpoint using API Gateway. You have full
 * access to the request and response payload, including headers and
 * status code.
 *
 * To scan a DynamoDB table, make a GET request with the TableName as a
 * query string parameter. To put, update, or delete an item, make a POST,
 * PUT, or DELETE request respectively, passing in the payload to the
 * DynamoDB API as a JSON body.
 */
exports.handler = async (event = {}) => {
    // console.log('Received event:', JSON.stringify(event, null, 2));

    let body = '';
    let statusCode;
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Request-Method': 'GET,OPTIONS',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'content-type',
        'Allow': 'GET,OPTIONS,HEAD'
    };

    try {
        switch (event.httpMethod || 'GET') {
            case 'GET':
                const { endPoint, data } = event.queryStringParameters || {}
                const func = { searchForItems, getItemNutrition }[endPoint]
                if (!func) {
                    statusCode = '404';
                    throw new Error(`No endpoint for ${endPoint}`);
                }

                if (!data) {
                    statusCode = '401'
                    throw new Error('Cant make a request without data')
                }

                body = await func(data)
                break;
            case 'OPTIONS':
                break;
            default:
                throw new Error(`Unsupported method "${event.httpMethod}"`);
        }
    } catch (err) {
        statusCode = statusCode || '400';
        body = err.message;
    } finally {
        statusCode = '200';
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body,
        headers,
    };
};

const searchForItems = async (searchTerms) => {
    return makeApiRequest('search/instant', { query: searchTerms }).then(({ data }) => data)
}

const getItemNutrition = async (nixItemId) => {
    return makeApiRequest('search/item', { nix_item_id: nixItemId }).then(({ data }) => data)
}

const makeApiRequest = async (path, queryParams = '') => {
    const appId = process.env.APP_ID;
    const apiKey = process.env.API_KEY;
    const headers = {
        'x-app-id': appId,
        'x-app-key': apiKey
    }
    const query = new URLSearchParams();
    Object.entries(queryParams).forEach(([ key, value ]) => query.append(key, value))
    const url = `${REQUEST_URL}/${path}?${query.toString()}`
    return axios(url, { headers })
}

