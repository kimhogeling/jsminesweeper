# jsminesweeper

no server needed, just open the html file in the browser

## es2015

the js code is written in es2015. to transpile it to es5 js use babel. first install babel and the es2015 preset
```
npm install
```

and then build either with `npm`

```bash
npm run build
```

or directly with `babel`

```bash
babel src --no-comments --minified -o lib/game.js
```

when using `babel`, simply add the `-w` argument to watch for changes
```bash
babel src --no-comments --minified -w -o lib/game.js
```
