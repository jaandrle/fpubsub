import { topic, subscribe, publish } from '../dist/esm.js';
const log= (...before)=> (...after)=> console.log(...before, ...after);

/** @type {fpubsubTopic<1|2>} */
const simple_topic= topic();
log("Simple topic: `{}`:")(simple_topic);
subscribe(simple_topic, log("Simple topic:"));
subscribe(simple_topic, { handleEvent: log("Object listener:") });
publish(simple_topic, 1);
publish(simple_topic, 2);
