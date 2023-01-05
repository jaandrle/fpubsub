fpubsub

# fpubsub

## Table of contents

### Functions

- [topic](README.md#topic)
- [topicFrom](README.md#topicfrom)
- [isTopic](README.md#istopic)
- [valueOf](README.md#valueof)
- [erase](README.md#erase)
- [publish](README.md#publish)
- [subscribe](README.md#subscribe)
- [has](README.md#has)
- [unsubscribe](README.md#unsubscribe)
- [unsubscribeAll](README.md#unsubscribeall)

### Type Aliases

- [TopicOptions](README.md#topicoptions)
- [Topic](README.md#topic-1)
- [ReturnStatus](README.md#returnstatus)
- [Listener](README.md#listener)
- [SubscribeOptions](README.md#subscribeoptions)

### References

- [pub](README.md#pub)
- [sub](README.md#sub)
- [unsub](README.md#unsub)

## Functions

### topic

▸ **topic**<`DATA`, `DATA_IN`\>(`options?`): [`Topic`](README.md#topic-1)<`DATA`, `DATA_IN`\>

Creates topic to be used in subscribe/publish/… functions.
You can use another topis as argument for creating new topic with similar options (for dependent topic use [topicFrom](README.md#topicfrom)).

Use types `topi<DATA, DATA_IN>`:
- `DATA`: to add types for (publishign)/subscribing values
- `DATA_IN`: to describe publishign values if differs to `DATA` (see TopicOptions.mapper)

In JavaScript:
```js
/** @type {fpubsubTopic<string>} */
const onexample= topic({ cached: true });
//…
publish(onexample, "Test");
```
In TypeScript:
```ts
const onexample= topic<string>({ cached: true });
//…
publish(onexample, "Test");
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `DATA` | extends `unknown` |
| `DATA_IN` | extends `unknown` = `undefined` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`TopicOptions`](README.md#topicoptions)<`DATA`, `DATA_IN`\> | See [TopicOptions](README.md#topicoptions) |

#### Returns

[`Topic`](README.md#topic-1)<`DATA`, `DATA_IN`\>

___

### topicFrom

▸ **topicFrom**<`DATA`, `DATA_IN`\>(`candidate`): [`Topic`](README.md#topic-1)<`DATA`, `DATA_IN`\>

Creates topic from [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) and maps abort signal as publish and publish as abort signal.
Sets topic origin to the `AbortController` instance.
```js
const onabort= topicFrom(AbortController);
subscribe(onabort, console.log);
fetch("www.example.test", { signal: onabort.origin.signal });
publish(onabort);
```

FYI: [Fetch: Abort](https://javascript.info/fetch-abort)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `DATA` | extends `unknown` |
| `DATA_IN` | extends `unknown` = `undefined` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `candidate` | `AbortController` \| () => `AbortController` |

#### Returns

[`Topic`](README.md#topic-1)<`DATA`, `DATA_IN`\>

▸ **topicFrom**<`DATA`, `DATA_IN`\>(`candidate`): [`Topic`](README.md#topic-1)<`DATA`, `DATA_IN`\>

Creates dependent topic to given topic. All listeners will be called when the original topic is published.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `DATA` | extends `unknown` |
| `DATA_IN` | extends `unknown` = `undefined` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `candidate` | [`Topic`](README.md#topic-1)<`any`, `undefined`\> |

#### Returns

[`Topic`](README.md#topic-1)<`DATA`, `DATA_IN`\>

___

### isTopic

▸ **isTopic**<`T`\>(`candidate`): `T` extends [`Topic`](README.md#topic-1)<`any`, `any`\> ? ``true`` : ``false``

```js
const is_topic= topic();
const not_topic= {};
console.log(
	isTopic(is_topic)===true,
	isTopic(not_topic)===false
);
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `candidate` | `T` |

#### Returns

`T` extends [`Topic`](README.md#topic-1)<`any`, `any`\> ? ``true`` : ``false``

___

### valueOf

▸ **valueOf**<`T`\>(`topic`): `TopicOut`<`T`\> \| `undefined`

Returns value of given topic. Primarly make sence in case of `cached` topics, elsewhere always returns `undefined`.
```js
/** @type {fpubsubTopic<string>} */
const ontest= topic({ cache: true });
publish(topic, "value");
console.log(valueOf(topic)==="value");
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Topic`](README.md#topic-1)<`any`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `topic` | `T` |

#### Returns

`TopicOut`<`T`\> \| `undefined`

___

### erase

▸ **erase**(`topic`): `undefined`

This function can be use to erase given `topic` explicitly.
```js
const ontest= topic();
subscribe(ontest, console.log);
erase(ontest);
publish(ontest);// throws error ⇐ no topic
```
…but it is not neccesary:
```js
let ontest= topic();
subscribe(ontest, console.log);
ontest= null;// JS auto remove unneeded info
publish(ontest);// throws error ⇐ no topic
```
…but keep in mind the `topic`s are objects (e.g. https://stackoverflow.com/a/6326813)

#### Parameters

| Name | Type |
| :------ | :------ |
| `topic` | [`Topic`](README.md#topic-1)<`any`, `any`\> |

#### Returns

`undefined`

___

### publish

▸ **publish**<`T`\>(`topic`, `value?`): `Promise`<[`ReturnStatus`](README.md#returnstatus)\>

Publishes `value` for given `topic`. Process all synchronous listeners synchronously, so if there is no async listener there is no need to await to `publish`.

```js
/** @type {fpubsubTopic<string>} */
const onexample= topic({ cached: true });
publish(onexample, "Test");
publish(onexample, "Test").then(console.log).catch(console.error);

const publishExample= publish.bind(null, onexample);
publishExample("Test 2");

const publishText= publish("Test 3");
publishText(onexample);
```

**`Throws`**

Given `topic` is not [Topic](README.md#topic-1)!

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Topic`](README.md#topic-1)<`any`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `topic` | `T` |
| `value?` | `TopicIn`<`T`\> |

#### Returns

`Promise`<[`ReturnStatus`](README.md#returnstatus)\>

0= done, else see [ReturnStatus](README.md#returnstatus)

▸ **publish**<`T`\>(`value?`): (`topic`: `T`) => `Promise`<[`ReturnStatus`](README.md#returnstatus)\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Topic`](README.md#topic-1)<`any`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | `TopicIn`<`T`\> |

#### Returns

`fn`

▸ (`topic`): `Promise`<[`ReturnStatus`](README.md#returnstatus)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `topic` | `T` |

##### Returns

`Promise`<[`ReturnStatus`](README.md#returnstatus)\>

___

### subscribe

▸ **subscribe**<`T`\>(`topic`, `listener`, `options?`): [`ReturnStatus`](README.md#returnstatus)

Register `listener` function (subscriber) to be called when `topic` will be emitted.

```js
/** @type {fpubsubTopic<string>} */
const onexample= topic({ cached: true });
subscribe(onexample, console.log);

const options= {};
const subscribeExample= subscribe(onexample, options);
subscribeExample(console.error);

const subscribeInfo= subscribe(console.info, options);
subscribeInfo(onexample);
```

**`Throws`**

Given `topic` is not [Topic](README.md#topic-1)!

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Topic`](README.md#topic-1)<`any`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `topic` | `T` |
| `listener` | [`Listener`](README.md#listener)<`T`\> |
| `options?` | [`SubscribeOptions`](README.md#subscribeoptions) |

#### Returns

[`ReturnStatus`](README.md#returnstatus)

0= done, else see [ReturnStatus](README.md#returnstatus)

▸ **subscribe**<`T`\>(`topic`, `options?`): (`listener`: [`Listener`](README.md#listener)<`T`\>) => [`ReturnStatus`](README.md#returnstatus)

Curried version of `subscribe`.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Topic`](README.md#topic-1)<`any`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `topic` | `T` |
| `options?` | [`SubscribeOptions`](README.md#subscribeoptions) |

#### Returns

`fn`

▸ (`listener`): [`ReturnStatus`](README.md#returnstatus)

##### Parameters

| Name | Type |
| :------ | :------ |
| `listener` | [`Listener`](README.md#listener)<`T`\> |

##### Returns

[`ReturnStatus`](README.md#returnstatus)

▸ **subscribe**<`T`\>(`listener`, `options?`): (`topic`: `T`) => [`ReturnStatus`](README.md#returnstatus)

Curried version of `subscribe`.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Topic`](README.md#topic-1)<`any`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `listener` | [`Listener`](README.md#listener)<`T`\> |
| `options?` | [`SubscribeOptions`](README.md#subscribeoptions) |

#### Returns

`fn`

▸ (`topic`): [`ReturnStatus`](README.md#returnstatus)

##### Parameters

| Name | Type |
| :------ | :------ |
| `topic` | `T` |

##### Returns

[`ReturnStatus`](README.md#returnstatus)

___

### has

▸ **has**<`T`\>(`topic`, `listener`): `boolean`

Is `listener` listening to the given `topic`?

**`Throws`**

Given `topic` is not [Topic](README.md#topic-1)!

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Topic`](README.md#topic-1)<`any`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `topic` | `T` |
| `listener` | [`Listener`](README.md#listener)<`T`\> |

#### Returns

`boolean`

___

### unsubscribe

▸ **unsubscribe**<`T`\>(`topic`, `listener`): [`ReturnStatus`](README.md#returnstatus)

Unregister `listener` function (subscriber) to be called when `topic` will be emitted.
```js
const onexample= topic();
subscribe(onexample, console.log);
unsubscribe(onexample, console.log);
```

**`Throws`**

Given `topic` is not [Topic](README.md#topic-1)!

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Topic`](README.md#topic-1)<`any`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `topic` | `T` |
| `listener` | (`value`: `TopicOut`<`T`\>, `topic`: `T`) => `void` \| `Promise`<`void`\> |

#### Returns

[`ReturnStatus`](README.md#returnstatus)

0= done, else see [ReturnStatus](README.md#returnstatus)

___

### unsubscribeAll

▸ **unsubscribeAll**(`topic`): [`ReturnStatus`](README.md#returnstatus)

Unregister all listeners for given `topic`.
```js
const onexample= topic();
subscribe(onexample, console.log);
unsubscribeAll(onexample);
```

**`Throws`**

Given `topic` is not [Topic](README.md#topic-1)!

#### Parameters

| Name | Type |
| :------ | :------ |
| `topic` | [`Topic`](README.md#topic-1)<`any`, `any`\> |

#### Returns

[`ReturnStatus`](README.md#returnstatus)

0= done, else see [ReturnStatus](README.md#returnstatus)

## Type Aliases

### TopicOptions

Ƭ **TopicOptions**<`DATA`, `DATA_IN`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `DATA` | extends `any` |
| `DATA_IN` | extends `any` = `undefined` |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `cache?` | `boolean` | Keep last published value and when new listener is registered call this function with kept value. **`Default`** false |
| `initial?` | `any` | This force `cache= true` and sets initial value. |
| `mapper?` | (`value`: `DATA_IN`) => `DATA` | Converts topic `value` from `publish` function to what listeners are expecting. |
| `once?` | `boolean` | Topic can be published only one time. **`Default`** false |
| `origin?` | `any` | Topic origin **`Default`** null |

___

### Topic

Ƭ **Topic**<`DATA`, `DATA_IN`\>: [`TopicOptions`](README.md#topicoptions)<`DATA`, `DATA_IN`\> & { `origin`: `any` ; `is_live`: `boolean`  }

Topic **reference** to be used in subscribe/publish/… functions.
For using in JSDoc, you can use global type fpubsubTopic.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `DATA` | extends `any` |
| `DATA_IN` | extends `any` = `undefined` |

___

### ReturnStatus

Ƭ **ReturnStatus**: ``0`` \| ``1`` \| ``2``

Return type of functions:
- `0`: operation successfully processed
- `1`: given topic is not “live” (`once` event already published) → nothing to do
- `2`, …: another non-error issue → nothing to do

…functions typically throws Error if given topic is not [Topic](README.md#topic-1).

___

### Listener

Ƭ **Listener**<`T`\>: (`value`: `TopicOut`<`T`\>, `topic`: `T`) => `void` \| `Promise`<`void`\> \| { `handleEvent`: (`value`: `TopicOut`<`T`\>, `topic`: `T`) => `void` \| `Promise`<`void`\>  }

Follows [EventTarget.addEventListener() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Topic`](README.md#topic-1)<`any`, `any`\> |

___

### SubscribeOptions

Ƭ **SubscribeOptions**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `once?` | `boolean` | Call only once |
| `signal?` | `AbortSignal` | An AbortSignal. The listener will be removed when the given AbortSignal object's abort() method is called. If not specified, no AbortSignal is associated with the listener. |

## References

### pub

Renames and re-exports [publish](README.md#publish)

___

### sub

Renames and re-exports [subscribe](README.md#subscribe)

___

### unsub

Renames and re-exports [unsubscribe](README.md#unsubscribe)
