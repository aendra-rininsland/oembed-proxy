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

app.get('/:url/:format?', (req, res) => {
  switch(req.params.format) {
    case 'json':
    oembed.discover(req.params.url, (err, result) => {
      if (!result['application/json+oembed']) res.send('No JSON oEmbed tag found.');

      oembed.fetchJSON(result['application/json+oembed'], (err, result) => {
        res.send(result);
      });
    });

    break;
    case 'xml':
    oembed.discover(req.params.url, (err, result) => {
      if (!result['text/xml+oembed']) res.send('No XML oEmbed tag found.');

      oembed.fetchXML(result['text/xml+oembed'], (err, result) => {
        res.send(result);
      });
    });
    break;
    default:
    oembed.fetch(req.params.url, {}, (err, result) => {
      res.send(result);
    });
    break;
  }
});

let server = app.listen(process.env.PORT || 3030, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log(`oEmbed Proxy started listening at ${host} on ${port}`);
});
