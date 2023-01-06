#!/usr/bin/env -S npx nodejsscript
/* jshint esversion: 11,-W097, -W040, module: true, node: true, expr: true, undef: true *//* global echo, $, pipe, s, fetch, cyclicLoop */
import { join } from 'node:path';
const path= join.bind(null, $[0], "..");
const pathDist= path.bind(null, "..", "lib");
const pkg= s.cat(path("..", "package.json")).xargs(JSON.parse);

const keyword_export= "_public";
const target= pathDist("cjs.js");
echo("Building", { target }, "...");
const cjm_content= s.cat(pathDist("esm.js"))
	.sed("export const ", keyword_export+".")
	.sed(/export( async)?( function) ([^\(]*)/, keyword_export+".$3= $3;\n$1$2 $3")
	.split("\n").join("\n\t").trim();
s.echo(`(function(module_name, factory){ /* jshint browser: true, node: true *//* global define:false */
	'use strict';
	if (typeof define === 'function' && define.amd) {
		define([], function(){
			return factory();
		});
	} else if (typeof exports !== 'undefined') {
		module.exports = factory();
	} else {
		window[module_name]= factory();
	}
})("${pkg.name}", function factory(){
	'use strict';
	const ${keyword_export}= {};
	${cjm_content}
	return Object.freeze(${keyword_export});
});`)
	.to(target);
$.exit(0);
