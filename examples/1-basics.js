import { topic, subscribe, publish, unsubscribe } from '../lib/esm.js';
const log= (...before)=> (...after)=> console.log(...before, ...after);

/** @type {fpubsubTopic<1|2>} */
const simple_topic= topic();
log("Simple topic: `{}`:")(simple_topic);
subscribe(simple_topic, log("Function listener:"));
subscribe(simple_topic, { handleEvent: log("Object listener:") });

subscribe(simple_topic, log("Function listener (once):"), { once: true });

const fNever1= log("Function listener (never):");
subscribe(simple_topic, fNever1);
unsubscribe(simple_topic, fNever1);
const fNever2= log("Function listener (never):");
subscribe(simple_topic, fNever2, { once: true });
unsubscribe(simple_topic, fNever2);

publish(simple_topic, 1);
publish(simple_topic, 2);
