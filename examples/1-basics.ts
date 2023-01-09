import { topic, subscribe, publish } from '../lib/esm.js';
const log= (...before: string[])=> (...after: any[])=> console.log(...before, ...after);

const simple_topic= topic<1|2>();
log("Simple topic: `{}`:")(simple_topic);
subscribe(simple_topic, log("Simple topic:"));
subscribe(simple_topic, { handleEvent: log("Object listener:") });
publish(simple_topic, 1);
publish(simple_topic, 2);
