import fs from 'fs';
import { build } from 'esbuild';
import { glob } from 'glob';

let tsFiles = await glob(
  'src/**/*.ts',
  {
    ignore: 'src/shared/**/*'
  });

if (!fs.existsSync('dist/')) {
  fs.mkdirSync('dist/');
}

let manifest = [];

tsFiles.forEach(tsFile => {
  let manifestFile = tsFile.replace(/\\/g, '/').replace(/^src(?=[\/\\])/, '').replace(/.ts$/, '.js');
  manifest.push(manifestFile);
  let jsFile = 'dist' + manifestFile;
  const sharedConfig = {
    entryPoints: [tsFile],
    bundle: true,
    minify: false,
  };

  build({
    ...sharedConfig,
    platform: 'browser',
    format: 'esm',
    outfile: jsFile,
  });  
});

fs.writeFileSync('dist/manifest.txt', manifest.join('\n'));
