/* jshint esversion: 11 */
import { topic, subscribe, publish } from '../dist/esm.js';

/** @type {fpubsubTopic<number>} */
const topic_double_sync= topic({ mapper: v=> v*2 });
subscribe(topic_double_sync, console.log);
for(let i = 0; i < 5; ++i)
	publish(topic_double_sync, i);
console.log("Publish call ends");


const sleep= ()=> new Promise(r=> setTimeout(r, Math.random() * 100));
const asyncListener= async function(data, topic){ await sleep(); console.log(data, topic); };

/** @type {fpubsubTopic<number>} */
const topic_double_async_wait= topic({ mapper: v=> v*2 });
subscribe(topic_double_async_wait, asyncListener);
(async ()=> {
	for(let i = 0; i < 5; ++i)
		await publish(topic_double_async_wait, i);
	console.log("Publish call ends");
})().then(()=> {

/** @type {fpubsubTopic<number>} */
const topic_double_async= topic({ mapper: v=> v*2 });
subscribe(topic_double_async, asyncListener);
for(let i = 0; i < 5; ++i)
	publish(topic_double_async, i);
console.log("Publish call ends");

});
