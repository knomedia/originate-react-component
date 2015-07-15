# originate-react-component

[loom][1] origin for creating distributable react components. Sets up a distributable (npm, bower) react component, with tests and examples.

## Usage

```sh
$ npm install -g loom
# now the originate program is available
$ originate react-component my-component

$ cd my-component
$ npm install

#run local specs
$ npm test

$ npm start
#visit localhost:8080
```

## Local Developement

```sh
$ git clone git@github.com:knomedia/originate-react-component.git
$ cd originate-react-component
$ npm install
$ npm link

$ cd ..
$ npm link originate-react-component

# now you can use the local repo version with:
$ originate react-component my-component
```

## Licences and Copyright

MIT Style licence
(c) 2014 Jason Madsen

[1]:https://github.com/rpflorence/loom
