<img src="https://cloud.githubusercontent.com/assets/478864/22186847/68223ce6-e0b1-11e6-8a62-0e3edc96725e.png" width=30> Express Single Resource
===

## Description

For this assignment, use express and mongodb to write a single resource HTTP REST API:
* `GET /resources` list ([]) of all the resources
* `GET /resources/:id` return single resource object with that id (or 404 if doesn't exist)
* `POST /resources` add a new resource and return new entity from db with _id
* `DELETE /resource/:id` Delete the resource with that id. Return `{ count: <count> }` where count
is number of deleted records (should be 1 or 0)
* `PUT /resource/:id` The resources is updated or created with the supplied id.

## Testing

* Write E2E API tests.

## Bonus

Create static html/css/js files that allow you to exercise your API

#### Rubric:

* Correctly working CRUD API: 3pts
* Code Quality: 2pts
* Express Implementation: 3pts
* Project Organization and Testing: 2pts
