## babel with react

This is a small example repo fo using several technologies together.

* React
* Webpack
* Karma/Jasmine w/PhantomJS2
* Babel

## usage

```
$ npm install
$ webpack
```

This will create a build directory where a fileserver can be pointed to serve the files.

```
$ cd build
$ python -m SimpleHTTPServer 3000
```

Then open a browser pointing to `http://localhost:3000`.
