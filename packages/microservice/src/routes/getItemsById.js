'use strict';
const _ = require('lodash');
const mockDBCalls = require('../database/index.js');

const getItemsByIdHandler = async (request, response) => {
    const stringOfItemIds =  request.query.ids || '';

    const listOfItemIds = stringOfItemIds !== '' ? stringOfItemIds.split(',') : [];
    if(listOfItemIds.includes('$')){
        console.log('includes');
        return response.status(406).send('Please provide valid ID without special character.');
    }else{
        const data = await mockDBCalls.getItemsById(listOfItemIds);

    // returned data is always stringified for this endpoint
    return response.status(200).send(JSON.stringify(data));
    }
    
};

module.exports = (app) => {
    app.get('/items', getItemsByIdHandler);
};
