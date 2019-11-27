
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('articles', function() {
  it('should list ALL aritcles on /articles GET',function(done){
    chai.request(app)
    .get('/api/v1/articles')
    .end(function(err,res){
      res.should.have.status(200);
      done();
    });
  });
  it('should list a SINGLE article on /articles/<id> GET');
  it('should add a SINGLE article on /articles POST');
  it('should update a SINGLE article on /articles/<id> PUT');
  it('should delete a SINGLE article on /articles/<id> DELETE');
});