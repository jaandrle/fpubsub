**WIP + TBD – Wait to version 1.0.0!**

# fpubsub – PubSub implementation
This is the JavaScript implementation of the **PubSub** pattern in *JavaScript* for beeing used in functional programming approach.

## Quick links
- [Examples](#examples)
- [Documentation](#documentation), [Documentation (generated from TypeScript)](./docs/README.md)

## Examples
```js
/** @type {fpubsubTopic<string>} */
const topic_test= topic();
subscribe(topic_test, console.log);
publish(topic_test, "Publish info to `topic_test`.");

const publishTest= publish.bind(null, topic_test);
publishTest("Publish info to `topic_test` again.");
```
…for more examples see folder [./examples](./examples).

## Documentation
See [Publish–subscribe pattern - Wikipedia](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) to more information about PubSub pattern.

You can use library as regular npm package.
```bash
npm install fpubsub --save
```
```js
import { topic, subscribe, publish } from "fpubsub";
/** @type {fpubsubTopic<string>} */
const topic$= topic();
subscribe(topic$, console.log);
publish(topic$, "Publish");
```

Library exports:
- functions:
	- `topic`, `topicFrom`: to generate event/topic
	- `subscribe` (alias: `sub`): to subscribe topics
	- `publish` (alias: `pub`): to publish messages to the given topic
	- another helpers: `unsubscribe`, `has`, `clear`, `isTopic`
- types:
	- `Topic`: to anote you TypeScript topic
	- or `fpubsubTopic`: as global type for anotating topics in JavaScript (JSDoc)

…see [Documentation (generated from TypeScript)](./docs/README.md)

## See also
- [yamiteru/ueve: 🔥 Hellishly fast and 🤏 tiny async/sync event emitter](https://github.com/yamiteru/ueve)
- [pubsub - npm search](https://www.npmjs.com/search?q=pubsub)
- [emit - npm search](https://www.npmjs.com/search?q=emit)
