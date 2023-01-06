import { topic, subscribe, publish } from '../lib/esm.js';
const arr= length=> Array.from({ length });
/** @type {fpubsubTopic<string>[]} */
const topics= arr(3).map(()=> topic());
console.log("Batch listener registration to multiple topics:");
topics
.forEach(subscribe(console.log.bind(null, "Listener 1:")));

console.log("Batch listeners registration to `topics[0]`:");
arr(2).map((_, i)=> console.log.bind(console, `Listener ${i+2}: `))
.forEach(subscribe(topics[0]));

console.log("Batch topics publication:");
topics
.forEach(publish("test"));

console.log("Reverse curried version using `*.bind` in `publish`:");
const publishLastTopic= publish.bind(null, topics[topics.length - 1]);
publishLastTopic("last topic");
