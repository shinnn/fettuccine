'use strict';

const {createServer} = require('http');

const fettuccine = require('.');
const {Fettuccine} = fettuccine;
const test = require('tape');

let responded = 0;

createServer(function(req, response) {
	if (req.method === 'POST') {
		req.once('data', data => {
			response.writeHead(200, {'Content-Type': 'application/json'});
			response.end(`{"data": ${data.toString()}}`);
		});
	} else {
		response.writeHead(200, {'Content-Type': 'plain/text'});
		response.end('Body');
	}

	if (++responded === 2) {
		this.close();
	}
}).listen(8124);

test('fettuccine()', t => {
	t.plan(3);

	(async () => {
		t.equal(
			(await fettuccine('http://localhost:8124')).body,
			'Body',
			'should send a request to the server.'
		);
	})();

	(async () => {
		t.deepEqual(
			(await fettuccine.post('http://localhost:8124', {
				body: [1, 2, 3],
				json: true
			})).body,
			{data: [1, 2, 3]},
			'should accept options as its second aegument.'
		);
	})();

	(async () => {
		t.deepEqual(
			(await new Fettuccine().get('http://localhost:8124')).body,
			'Body',
			'should expose its own class `Fettuccine` as a property.'
		);
	})();
});
