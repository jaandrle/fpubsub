import { topic, subscribe, publish } from '../lib/esm.js';
const log= (...before)=> (...after)=> console.log(...before, ...after);
const arr= length=> Array.from({ length });
/** @type {fpubsubTopic<string>[]} */
const topics= arr(3).map(()=> topic());
log("Batch listener registration to multiple topics:")();
topics
.forEach(subscribe(log("Listener 1:")));

log("Batch listeners registration to `topics[0]`:")();
arr(2).map((_, i)=> log(`Listener ${i+2}: `))
.forEach(subscribe(topics[0]));

log("Batch topics publication:")();
topics
.forEach(publish("test"));

log("Reverse curried version using `*.bind` in `publish`:")();
const publishLastTopic= publish.bind(null, topics[topics.length - 1]);
publishLastTopic("last topic");
