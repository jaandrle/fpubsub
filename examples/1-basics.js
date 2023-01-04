import { topic, subscribe, publish } from '../index.js';
const log= (...before)=> (...after)=> console.log(...before, ...after);

console.log(Object.prototype.toString.call(async function* test(){
  yield await Promise.resolve('a');
  yield await Promise.resolve('b');
  yield await Promise.resolve('c');
}));

/** @type {fpubsubTopic<1|2>} */
const simple_topic= topic();
log("Simple topic: `{}`:")(simple_topic);
subscribe(simple_topic, log("Simple topic:"));
publish(simple_topic, 1);
publish(simple_topic, 2);

/* global AbortController */
import { topicFrom } from '../index.js';
/** @type {fpubsubTopic<1|2>} */
const abort_topic= topicFrom(AbortController);
log("Abort topic: `{ once: true }`:")(abort_topic);
subscribe(abort_topic, log("Abort from tpubsub:"));
abort_topic.origin.signal.addEventListener("abort", log("Abort from AbortController:"));
publish(abort_topic, 1).then(log("One time (abort) event:"));
publish(abort_topic, 2).then(log("One time (abort) event:"));
