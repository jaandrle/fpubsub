import { topicFrom, subscribe, publish } from '../dist/esm.js';
const log= (...before)=> (...after)=> console.log(...before, ...after);

/* global AbortController */
/** @type {fpubsubTopic<undefined>} */
const onabort= topicFrom(AbortController);
log("Abort topic (`{ once: true }` forced):")(onabort);
subscribe(onabort, log("Abort subscribe:"));
onabort.origin.signal.addEventListener("abort", log("Abort from AbortController:"));
publish(onabort).then(log("One time (abort) event:"));
publish(onabort).then(log("One time (abort) event:"));

/** @type {fpubsubTopic<number>} */
const onloop= topicFrom(async function*(){
	const sleep= ()=> new Promise(r=> setTimeout(r, 150));
	let i= 0;
	while(i<5){
		await sleep();
		yield i;
		i+= 1;
	}
});
log("AsyncGeneratorFunction topic:")(onloop);
subscribe(onloop, log("AsyncGeneratorFunction subscribe:"));


/** @type {fpubsubTopic<number>} */
const onloop_sub= topicFrom(onloop);
log("Sub topic of `onloop`")(onloop_sub);
subscribe(onloop, log("Sub topic subscribe:"));
