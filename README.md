# :bowtie: algorinfo blog

Blog made with [zola](https://www.getzola.org/)

## :hammer: Build

```
zola build
env NODE_ENV=production yarn watch
```

## Debug tailwind render

```
./node_modules/.bin/postcss custom/tailwind.css -o static/bundle.css
```
