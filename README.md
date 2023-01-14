**WIP + TBD – Wait to version 1.0.0!**

# fpubsub – PubSub implementation
This is the JavaScript implementation of the **PubSub** pattern in *JavaScript* for beeing used in functional programming approach.

```js
/** @type {fpubsubTopic<string>} */
const onexample= topic();
subscribe(onexample, console.log);
subscribe(onexample)(console.log);
subscribe(console.log)(onexample);

publish(onexample, "Publish info to `onexample` topic.");
publish.bind(null, onexample)("Publish info to `onexample` again.");
publish("Publish info to `onexample` last time.")(onexample);
```

## Quick links
- Examples: see folder [./examples](./examples)
- [Guide](#guide)
- [Documentation](./docs/README.md) (generated from TypeScript)

## Guide
See [Publish–subscribe pattern - Wikipedia](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) to more information about PubSub pattern.

You can use library as regular npm package.
```bash
npm install fpubsub --save
```
```js
import { topic, subscribe, publish } from "fpubsub";
/** @type {fpubsubTopic<string>} */
const onexample= topic();
subscribe(onexample, console.log);
publish(onexample, "Publish info to `onexample` topic.");
```

Library exports:
- functions:
	- [`topic`](./docs/README.md#topic): to generate event/topic
		- you can also use with options `{ once, cache, initial, mapper }`, see [in docs](./docs/README.md#topicoptions)
		- `topicFrom` – see [#7](https://github.com/jaandrle/fpubsub/issues/7)
	- [`subscribe`](./docs/README.md#subscribe) (alias: `sub`): to subscribe topics
	- [`publish`](./docs/README.md#publish) (alias: `pub`): to publish messages to the given topic
	- [`unsubscribe`](./docs/README.md#unsubscribe) (alias: `unsub`): to remove topics listeners
	- another helpers: `unsubscribeAll`, `has`, `erase`, `isTopic`, `valueOf`
- types:
	- `Topic`: to anote you TypeScript topic
	- or `fpubsubTopic`: as global type for anotating topics in JavaScript (JSDoc)

…see [Documentation (generated from TypeScript)](./docs/README.md)

## See also
- [yamiteru/ueve: 🔥 Hellishly fast and 🤏 tiny async/sync event emitter](https://github.com/yamiteru/ueve)
- [pubsub - npm search](https://www.npmjs.com/search?q=pubsub)
- [emit - npm search](https://www.npmjs.com/search?q=emit)
