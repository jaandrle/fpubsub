import { topic, subscribe, publish } from '../index.js';
const log= (...before: string[])=> (...after: any[])=> console.log(...before, ...after);

const simple_topic= topic<1|2>();
log("Simple topic: `{}`:")(simple_topic);
subscribe(simple_topic, log("Simple topic:"));
publish(simple_topic, 1);
publish(simple_topic, 2);

import { topicFrom } from '../index.js';
const abort_topic= topicFrom<1|2>(AbortController);
log("Abort topic: `{ once: true }`:")(abort_topic);
subscribe(abort_topic, log("Abort from tpubsub:"));
abort_topic.origin.signal.addEventListener("abort", log("Abort from AbortController:"));
publish(abort_topic, 1).then(log("One time (abort) event:"));
publish(abort_topic, 2).then(log("One time (abort) event:"));
