// standard
const fs = require('fs');
// esbuild
const {build} = require('esbuild');
// CSS
const postCssPlugin = require("./plugins/postcss3.js");
const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");
const tailwindcss = require("tailwindcss");
const atImport = require("postcss-import");
// html
const finalDir = './static/';

if (!fs.existsSync(finalDir)){
  fs.mkdirSync(finalDir);
}

const cssPlugins = [atImport, tailwindcss, autoprefixer, cssnano];
//const cssFile = fs.readFileSync("./src/tailwind.css", "utf8");
/*Copy pre-built files
*/
const options = {
  entryPoints: ['./templates/index.js'],
  minify: process.env.NODE_ENV === 'production',
  sourcemap: true,
  bundle: true,
  watch: {
    onRebuild: function(error, result) {
      if (error){
        console.error('watch build failed:', error);
      } else {
        console.log('watch build succeeded:', result);
        // externalBuilds();
      }
    },
  },
  // outdir: 'dist',
  outfile: './static/bundle.js',
  plugins: [
    // sassPlugin(),'
    postCssPlugin({ plugins: cssPlugins}),
  ],
};

// externalBuilds();

build(options).catch(err => {
  process.stderr.write(err.stderr);
  process.exit(1);
});
