fpubsub

# fpubsub

## Table of contents

### Functions

- [topic](README.md#topic)
- [isTopic](README.md#istopic)
- [topicFrom](README.md#topicfrom)
- [publish](README.md#publish)
- [subscribe](README.md#subscribe)
- [unsubscribe](README.md#unsubscribe)

### Type Aliases

- [TopicOptions](README.md#topicoptions)
- [Topic](README.md#topic-1)

### References

- [pub](README.md#pub)
- [sub](README.md#sub)

## Functions

### topic

▸ **topic**<`DATA`, `DATA_IN`\>(`options?`): [`Topic`](README.md#topic-1)<`DATA`, `DATA_IN`\>

Creates topic to be used in subscribe/publish/… functions.
You can use another topis as argument for creating new topic with similar options (for dependent topic use [topicFrom](README.md#topicfrom)).

In JavaScript:
```js
/**
 * Test
 * \@type {fpubsubTopic<string>}
 */
const onexample= topic({ cached: true });
//…
publish(onexample, "Test");
```
In TypeScript:
```ts
/** Test */
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

### isTopic

▸ **isTopic**<`T`\>(`candidate`): `T` extends [`Topic`](README.md#topic-1)<`any`, `any`\> ? ``true`` : ``false``

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

### topicFrom

▸ **topicFrom**<`DATA`, `DATA_IN`\>(`candidate`): [`Topic`](README.md#topic-1)<`DATA`, `DATA_IN`\>

Creates topic from [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) and maps abort signal as publish and publish as abort signal.

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

### publish

▸ **publish**<`T`\>(`topic`, `data`): `Promise`<``0`` \| ``1``\>

Publishes `data` for given `topic`. Process all synchronous listeners synchronously, so if there is no async listener there is no need to await to `publish`.

```js
/** \@type {fpubsubTopic<string>} */
const onexample= topic({ cached: true });
publish(onexample, "Test");
publish(onexample, "Test").then(console.log).catch(console.error);
```

**`Throws`**

Unregistered `topic`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Topic`](README.md#topic-1)<`any`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `topic` | `T` |
| `data` | `TopicIn`<`T`\> |

#### Returns

`Promise`<``0`` \| ``1``\>

`0`= success / `1`= ‘once’ topic already published / error elsewhere.

___

### subscribe

▸ **subscribe**<`T`\>(`topic`, `listener`, `options?`): () => `ReturnType`<typeof [`unsubscribe`](README.md#unsubscribe)\>

Register `listener` function (subscriber) to be called when `topic` will be emitted.

```js
/** \@type {fpubsubTopic<string>} */
const onexample= topic({ cached: true });
subscribe(onexample, console.log);
```

**`Throws`**

Unregistered `topic`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Topic`](README.md#topic-1)<`any`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `topic` | `T` |
| `listener` | (`data`: `TopicOut`<`T`\>, `topic`: `T`) => `void` \| `Promise`<`void`\> |
| `options?` | `Object` |
| `options.once?` | `boolean` |

#### Returns

`fn`

Function to unsubscribe given topic+listener

▸ (): `ReturnType`<typeof [`unsubscribe`](README.md#unsubscribe)\>

##### Returns

`ReturnType`<typeof [`unsubscribe`](README.md#unsubscribe)\>

▸ **subscribe**<`T`\>(`topic`, `options?`): (`listener`: (`data`: `TopicOut`<`T`\>, `topic`: `T`) => `void` \| `Promise`<`void`\>) => () => `ReturnType`<typeof [`unsubscribe`](README.md#unsubscribe)\>

Curried version of `subscribe`.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Topic`](README.md#topic-1)<`any`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `topic` | `T` |
| `options?` | `Object` |
| `options.once?` | `boolean` |

#### Returns

`fn`

▸ (`listener`): () => `ReturnType`<typeof [`unsubscribe`](README.md#unsubscribe)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `listener` | (`data`: `TopicOut`<`T`\>, `topic`: `T`) => `void` \| `Promise`<`void`\> |

##### Returns

`fn`

▸ (): `ReturnType`<typeof [`unsubscribe`](README.md#unsubscribe)\>

##### Returns

`ReturnType`<typeof [`unsubscribe`](README.md#unsubscribe)\>

___

### unsubscribe

▸ **unsubscribe**<`T`\>(`topic`, `listener`): `boolean` \| `undefined`

Unregister `listener` function (subscriber) to be called when `topic` will be emitted.

**`Throws`**

Unregistered `topic`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Topic`](README.md#topic-1)<`any`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `topic` | `T` |
| `listener` | (`data`: `TopicOut`<`T`\>, `topic`: `T`) => `void` \| `Promise`<`void`\> |

#### Returns

`boolean` \| `undefined`

The listener was successfully removed, or undefined when tops has no listeners (e.g. one–time topic)

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
| `cache?` | `boolean` | Keep last published data and when new listener is registered call this function with kept data. **`Default`** false |
| `mapper?` | (`data`: `DATA_IN`) => `DATA` | Converts topic `data` from `publish` function to what listeners are expecting. |
| `once?` | `boolean` | Topic can be published only one time. **`Default`** false |
| `origin?` | `any` | Topic origin |

___

### Topic

Ƭ **Topic**<`DATA`, `DATA_IN`\>: [`TopicOptions`](README.md#topicoptions)<`DATA`, `DATA_IN`\> & { `meta`: { `listeners?`: `WeakSet`<`Listener`<`DATA`\>\> ; `listeners_exit?`: `WeakSet`<(`data`: `any`) => `void` \| `Promise`<`void`\>\> ; `data?`: `DATA`  } ; `origin`: `any`  }

Topic **reference** to be used in subscribe/publish/… functions.
For using in JSDoc, you can use global type fpubsubTopic.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `DATA` | extends `any` |
| `DATA_IN` | extends `any` = `undefined` |

## References

### pub

Renames and re-exports [publish](README.md#publish)

___

### sub

Renames and re-exports [subscribe](README.md#subscribe)
