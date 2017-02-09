const chai = require('chai');
const chaiHttp = require('chai-http');
const connection = require('../lib/connection');
const app = require('../lib/app');
const assert = chai.assert;
chai.use(chaiHttp);

describe('shoes REST HTTP API', () => {
    
    const DB_URI = 'mongodb://localhost:27017/shoes-test';
    const request = chai.request(app);

    before(() => connection.connect(DB_URI));
    before(() => connection.db.dropDatabase());
    after(() => connection.closeCurrentDb());

    it('GET returns an empty array of shoes', () => {
        return request.get('/shoes')
        .then(req => req.body)
        .then(shoes => assert.deepEqual(shoes, []));
    });

    // test shoes
    let ajXI = {
        name: 'AJXI',
        brand: 'Jordan'
    };

    let pennyII = {
        name: 'PennyII',
        brand: 'Nike'
    };

    let pureBoost = {
        name: 'PureBoost',
        brand: 'Adidas'
    };

    function postShoe(shoe) {
        return request.post('/shoes')
            .send(shoe)
            .then(res => {
                console.log('rezbody..', res.body)
                res.body});
    }

    it('POSTs a shoe with an id', () => {
        /* this is the refactored version with postShoe()*/
        // return postShoe(ajXI)
        //     .then(savedShoe => {
        //         assert.isOk(savedShoe._id);
        //         ajXI._id = savedShoe._id;
        //         assert.deepEqual(savedShoe, ajXI);
        //     })

        /* this is postShoe() */
        return request.post('/shoes')
            .send(ajXI)
            .then(res => res.body)
        /* this is postShoe() ^^ */

            .then(saved => {
                assert.isOk(saved._id);
                ajXI._id = saved._id;
                assert.deepEqual(ajXI._id, saved._id)
            }) 
    });

    it('GETs a POSTed pet by its id', () => {
        return request.get(`/shoes/${ajXI._id}`)
            .then(res => {
                console.log('rezbody', res);
                assert.deepEqual(res.body, ajXI);
            });
    });
});