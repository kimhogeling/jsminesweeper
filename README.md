# jsminesweeper created with es2015 code

## How to play
No server needed, just open the index.html file in the browser.

**But first build the JS file as described below!**

## Transpile es2015 to es5
I created this project to practice some es2015. To transpile it to es5 use babel. First install babel and the es2015 preset:
```
npm install
```

and then build into `/lib/` either with `npm`:

```bash
npm run build
```

or directly with `babel`:

```bash
babel src --no-comments --minified -o lib/game.js
```

when using `babel`, simply add the `-w` argument to watch for changes during editing the files in `/src/`:
```bash
babel src --no-comments --minified -w -o lib/game.js
```

See [issues](/../../issues) for todos like es2015 modules, desktop apps and phone apps.
