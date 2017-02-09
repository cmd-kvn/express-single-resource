const express = require('express');
const ObjectId = require('mongodb').ObjectID;
const connection = require('./connection');
const app = express();
const RESOURCE = 'shoes';

// `GET /resources` list ([]) of all the resources
app.get('/' + RESOURCE, (req, res) => {
    // .collection is a mongo call
    connection.db.collection(RESOURCE)
        .find().toArray()
        // result is shoes in test case
        .then(result => res.send(result));
});
// `GET /resources/:id` return single resource object with that id (or 404 if doesn't exist)


function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', data => body += data);
        req.on('error', err => reject(err));
        req.on('end', () => {
            const item = JSON.parse(body);
            resolve(item);
        });
    });
}

// `POST /resources` add a new resource and return new entity from db with _id
app.post('/' + RESOURCE, (req, res) => {
    parseBody(req).then(item => {
        connection.db.collection(RESOURCE)
            .insert(item)
            // the <response> is an object and .ops property is an
            // array with the item object and its properties
            .then(response => response.ops[0])
            .then(savedItem => res.send(savedItem));
    })
});
// `DELETE /resource/:id` Delete the resource with that id. Return `{ count: <count> }` where count
// is number of deleted records (should be 1 or 0)

// `PUT /resource/:id` The resources is updated or created with the supplied id.

module.exports = app;