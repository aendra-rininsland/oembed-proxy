/**
 * oEmbed Proxy
 *
 * All this does is search the requested resource for oEmbed rel="alternate"
 * tags and then return the relevant resources.
 */

'use strict';

let app = require('express')();
let oembed = require('oembed');

if (process.env['EMBEDLY_KEY']) {
  oembed.EMBEDLY_KEY = process.env['EMBEDLY_KEY'];
}

app.get('/:url(*)', (req, res) => {
  oembed.fetch(req.params.url, {}, (err, result) => {
    res.send(result);
  });
});

let server = app.listen(process.env.PORT || 3030, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log(`oEmbed Proxy started listening at ${host} on ${port}`);
});
