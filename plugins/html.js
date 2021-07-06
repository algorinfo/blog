const path = require("path");

/*const readFile = util.promisify(fs.readFile);
const copyFile = util.promisify(fs.copyFile);
const writeFile = util.promisify(fs.writeFile);
const ensureDir = util.promisify(fs.ensureDir);*/

module.exports = (options = { plugins: [] }) => ({
  name: "postcss",
  setup: function (build) {
    //const { rootDir = options.rootDir || process.cwd() } = options;
    //const tmpDirPath = tmp.dirSync().name;
    build.onResolve(
      { filter: /.\.(html)$/, namespace: "file" },
      async (args) => {
        const sourceFullPath = path.resolve(args.resolveDir, args.path);
        console.log("SourceFullpath: ", sourceFullPath);
        /*const sourceExt = path.extname(sourceFullPath);
        const sourceBaseName = path.basename(sourceFullPath, sourceExt);
        const sourceDir = path.dirname(sourceFullPath);
        const sourceRelDir = path.relative(path.dirname(rootDir), sourceDir);

        const tmpDir = path.resolve(tmpDirPath, sourceRelDir);
        const tmpFilePath = path.resolve(tmpDir, `${sourceBaseName}.html`);
        await ensureDir(tmpDir);

        // Write result file
        // await writeFile(tmpFilePath, result.css);*/

        return {
          path: sourceFullPath,
          watchFiles: [sourceFullPath],
        };
      }
    );
  },
});
