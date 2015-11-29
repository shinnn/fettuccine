'use strict';

const http = require('http');

const fettuccine = require('.');
const {Fettuccine} = fettuccine;
const {test} = require('tape');

const server = http.createServer(function(req, response) {
  if (req.method === 'POST') {
    req.once('data', data => {
      response.writeHead(200, {'Content-Type': 'application/json'});
      response.end(`{"data": ${data.toString()}}`);
    });
  } else {
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end('Body');
  }

  if (++this.responded === 2) {
    this.close();
  }
}).listen(8124);

server.responded = 0;

test('fettuccine()', t => {
  t.plan(4);

  t.equal(fettuccine.name, 'fettuccine', 'should have a function name.');

  fettuccine('http://localhost:8124').then(response => {
    t.strictEqual(response.body, 'Body', 'should send a request to the server.');
  }).catch(t.fail);

  fettuccine.post('http://localhost:8124', {
    body: [1, 2, 3],
    json: true
  }).then(response => {
    t.deepEqual(response.body, {data: [1, 2, 3]}, 'should accept options as its second aegument.');
  }).catch(t.fail);

  new Fettuccine().get('http://localhost:8124').then(response => {
    t.strictEqual(
      response.body,
      'Body',
      'should expose its own class `Fettuccine` as a property.'
    );
  }).catch(t.fail);
});
