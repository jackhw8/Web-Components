import minify from 'rollup-plugin-babel-minify';

export default {
  input: 'index.js',
  output: {
    file: 'dist/bundle.js',
    name: 'LannisterComponents',
    format: 'iife'
  }, plugins:[
    minify()
  ]
};