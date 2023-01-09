fpubsub - v0.9.6

# fpubsub - v0.9.6

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
const onexample= topic({ cache: true });
//…
publish(onexample, "Test");
```
In TypeScript:
```ts
const onexample= topic<string>({ cache: true });
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

#### Defined in

[lib/esm.d.ts:61](https://github.com/jaandrle/fpubsub/blob/ece2c3f/lib/esm.d.ts#L61)

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

#### Defined in

[lib/esm.d.ts:74](https://github.com/jaandrle/fpubsub/blob/ece2c3f/lib/esm.d.ts#L74)

▸ **topicFrom**<`DATA`, `DATA_IN`\>(`candidate`): [`Topic`](README.md#topic-1)<`DATA`, `DATA_IN`\>

Creates dependent topic to given topic. All listeners will be called when the original topic is published.
```js
const ontopic= topic();
const onsubtopic= topicFrom(ontopic);
subscribe(onsubtopic, console.log);
publish(ontopic, "For all `ontopic` and `onsubtopic` listeners");
publish(onsubtopic, "For only `onsubtopic` listeners");
```

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

#### Defined in

[lib/esm.d.ts:85](https://github.com/jaandrle/fpubsub/blob/ece2c3f/lib/esm.d.ts#L85)

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

#### Defined in

[lib/esm.d.ts:96](https://github.com/jaandrle/fpubsub/blob/ece2c3f/lib/esm.d.ts#L96)

___

### valueOf

▸ **valueOf**<`T`\>(`topic`): `TopicOut`<`T`\> \| `undefined`

Returns value of given topic. Primarly make sence in case of `cache`d topics, elsewhere always returns `undefined`.
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

#### Defined in

[lib/esm.d.ts:106](https://github.com/jaandrle/fpubsub/blob/ece2c3f/lib/esm.d.ts#L106)

___

### erase

▸ **erase**(`topic`): `undefined`

This function can be use to erase given `topic` explicitly.
```js
const ontest= topic();
subscribe(ontest, console.log);
erase(ontest);
publish(ontest);// ignored ⇐ no active topic
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

#### Defined in

[lib/esm.d.ts:124](https://github.com/jaandrle/fpubsub/blob/ece2c3f/lib/esm.d.ts#L124)

___

### publish

▸ **publish**<`T`\>(`topic`, `value?`): `Promise`<[`ReturnStatus`](README.md#returnstatus)\>

Publishes `value` for given `topic`. Process all synchronous listeners synchronously, so if there is no async listener there is no need to await to `publish`.

```js
/** @type {fpubsubTopic<string>} */
const onexample= topic({ cache: true });
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

#### Defined in

[lib/esm.d.ts:154](https://github.com/jaandrle/fpubsub/blob/ece2c3f/lib/esm.d.ts#L154)

▸ **publish**<`T`\>(`value?`): (`topic`: `T`) => `Promise`<[`ReturnStatus`](README.md#returnstatus)\>

Curried version of `publish`.
```js
publish("value")(onexample);
publish()(onexample);
```

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

#### Defined in

[lib/esm.d.ts:162](https://github.com/jaandrle/fpubsub/blob/ece2c3f/lib/esm.d.ts#L162)

___

### subscribe

▸ **subscribe**<`T`\>(`topic`, `listener`, `options?`): [`ReturnStatus`](README.md#returnstatus)

Register `listener` function (subscriber) to be called when `topic` will be emitted.

```js
/** @type {fpubsubTopic<string>} */
const onexample= topic({ cache: true });
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

#### Defined in

[lib/esm.d.ts:194](https://github.com/jaandrle/fpubsub/blob/ece2c3f/lib/esm.d.ts#L194)

▸ **subscribe**<`T`\>(`topic`, `options?`): (`listener`: [`Listener`](README.md#listener)<`T`\>) => [`ReturnStatus`](README.md#returnstatus)

Curried version of `subscribe`.
```js
subscribe(onexample)(console.log);
subscribe(onexample, { once: true })(console.log);
```

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

#### Defined in

[lib/esm.d.ts:202](https://github.com/jaandrle/fpubsub/blob/ece2c3f/lib/esm.d.ts#L202)

▸ **subscribe**<`T`\>(`listener`, `options?`): (`topic`: `T`) => [`ReturnStatus`](README.md#returnstatus)

Curried version of `subscribe`.
```js
subscribe(console.log)(onexample);
subscribe(console.log, { once: true })(onexample);
```

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

#### Defined in

[lib/esm.d.ts:210](https://github.com/jaandrle/fpubsub/blob/ece2c3f/lib/esm.d.ts#L210)

___

### has

▸ **has**<`T`\>(`topic`, `listener`): `boolean`

Is `listener` listening to the given `topic`?
```js
const onexample= topic();
subscribe(onexample, console.log);
console.log(
	has(onexample, console.log)===true,
	has(onexample, console.error)===false,
);
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

#### Returns

`boolean`

#### Defined in

[lib/esm.d.ts:225](https://github.com/jaandrle/fpubsub/blob/ece2c3f/lib/esm.d.ts#L225)

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

#### Defined in

[lib/esm.d.ts:237](https://github.com/jaandrle/fpubsub/blob/ece2c3f/lib/esm.d.ts#L237)

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

#### Defined in

[lib/esm.d.ts:249](https://github.com/jaandrle/fpubsub/blob/ece2c3f/lib/esm.d.ts#L249)

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
| `origin?` | `any` | Topic origin |

#### Defined in

[lib/esm.d.ts:1](https://github.com/jaandrle/fpubsub/blob/ece2c3f/lib/esm.d.ts#L1)

___

### Topic

Ƭ **Topic**<`DATA`, `DATA_IN`\>: { `origin`: `any` ; `is_live`: `boolean`  } & [`TopicOptions`](README.md#topicoptions)<`DATA`, `DATA_IN`\>

Topic **reference** to be used in subscribe/publish/… functions.
For using in JSDoc, you can use global type fpubsubTopic.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `DATA` | extends `any` |
| `DATA_IN` | extends `any` = `undefined` |

#### Defined in

[lib/esm.d.ts:22](https://github.com/jaandrle/fpubsub/blob/ece2c3f/lib/esm.d.ts#L22)

___

### ReturnStatus

Ƭ **ReturnStatus**: ``0`` \| ``1`` \| ``2``

Return type of functions:
- `0`: operation successfully processed
- `1`: given topic is not “live” (`once` event already published) → nothing to do
- `2`, …: another non-error issue → nothing to do

…functions typically throws Error if given topic is not [Topic](README.md#topic-1).

#### Defined in

[lib/esm.d.ts:134](https://github.com/jaandrle/fpubsub/blob/ece2c3f/lib/esm.d.ts#L134)

___

### Listener

Ƭ **Listener**<`T`\>: (`value`: `TopicOut`<`T`\>, `topic`: `T`) => `void` \| `Promise`<`void`\> \| { `handleEvent`: (`value`: `TopicOut`<`T`\>, `topic`: `T`) => `void` \| `Promise`<`void`\>  }

Follows [EventTarget.addEventListener() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Topic`](README.md#topic-1)<`any`, `any`\> |

#### Defined in

[lib/esm.d.ts:166](https://github.com/jaandrle/fpubsub/blob/ece2c3f/lib/esm.d.ts#L166)

___

### SubscribeOptions

Ƭ **SubscribeOptions**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `once?` | `boolean` | Call only once |
| `signal?` | `AbortSignal` | An AbortSignal. The listener will be removed when the given AbortSignal object's abort() method is called. If not specified, no AbortSignal is associated with the listener. |

#### Defined in

[lib/esm.d.ts:170](https://github.com/jaandrle/fpubsub/blob/ece2c3f/lib/esm.d.ts#L170)

## References

### pub

Renames and re-exports [publish](README.md#publish)

___

### sub

Renames and re-exports [subscribe](README.md#subscribe)

___

### unsub

Renames and re-exports [unsubscribe](README.md#unsubscribe)
