#!/usr/bin/env node

var argv = process.argv;
const fs = require('fs');
const moment = require('moment');
const colors = require('colors');
const path = require('path');

var createPost = (filename, author, category, outDir) => {
  var date = moment().format('YYYY-MM-DD');
  var time = moment().format('YYYY-MM-DD hh:mm:ss');
  author = author || "someone";
  category = category || 'NONE';
  var title = filename;
  outDir = outDir || process.cwd() + '/_posts';
  var filepath = path.normalize(path.join(outDir, date + '-' + filename + '.md'));
  var content = `---
layout: page
title:  "${title}"
date:  ${time}
categories: ${category}
author: ${author}
---

`;

  var file = fs.writeFile(filepath, content, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log('created: ' + filepath);
  });
};

var program = require('commander');

program
  .version('0.0.1')
  .usage('[options] <title>')
  .option('-a, --author [value]', 'set author')
  .option('-c, --category [value]', 'set category')
  .option('-o, --outdir [value]', 'set output path')
  .parse(process.argv);

if (program.args.length < 1) {
  program.outputHelp();
  process.exit(1);
}

var filename = program.args[0];
filename = filename.replace(/ /g, '-').toLowerCase();

createPost(filename, program.author, program.category, program.outdir);
