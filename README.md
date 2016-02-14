# jsminesweeper

no server needed, just open the html file in the browser

## es2015

I created this project to practice a bit modern javascript. To transpile it to es5 js use babel. First install babel and the es2015 preset:
```
npm install
```

and then build into `/lib` either with `npm`:

```bash
npm run build
```

or directly with `babel`:

```bash
babel src --no-comments --minified -o lib/game.js
```

when using `babel`, simply add the `-w` argument to watch for changes during editing the src files:
```bash
babel src --no-comments --minified -w -o lib/game.js
```
