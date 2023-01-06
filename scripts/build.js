#!/usr/bin/env -S npx nodejsscript
/* jshint esversion: 11,-W097, -W040, module: true, node: true, expr: true, undef: true *//* global echo, $, pipe, s, fetch, cyclicLoop */
import { join } from 'node:path';
const path= join.bind(null, $[0], "..");
const pathDist= path.bind(null, "..", "lib");
const pkg= s.cat(path("..", "package.json")).xargs(JSON.parse);

const target_cjs= pathDist("cjs.cjs");
echo("Building", { target_cjs }, "...");
const content= bundle(pathDist("esm.js"), pkg);
content.to(target_cjs);

const target_bundle= pathDist(pkg.name+".js");
echo("Building", { target_bundle }, "...");
content.to(target_bundle);
$.exit(0);

function bundle(path_source, pkg){
	const keyword_export= "_public";
	const cjm_content= s.cat(path_source)
		.sed("export const ", keyword_export+".")
		.sed(/export( async)?( function) ([^\(]*)/, keyword_export+".$3= $3;\n$1$2 $3")
		.split("\n").join("\n\t").trim();
	return s.echo(`(function(module_name, factory){ /* jshint browser: true, node: true *//* global define:false */
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
});`);
}
