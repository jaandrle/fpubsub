[**fpubsub v1.0.0**](../README.md)

***

[fpubsub](../README.md) / publish

# Function: publish()

## Call Signature

> **publish**\<`T`\>(`topic`, `value?`): `Promise`\<[`ReturnStatus`](../type-aliases/ReturnStatus.md)\>

Defined in: [lib/esm.d.ts:154](https://github.com/jaandrle/fpubsub/blob/7fdf753887d41de71c804e07e7a0f4624c769733/lib/esm.d.ts#L154)

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

### Type Parameters

#### T

`T` *extends* [`Topic`](../type-aliases/Topic.md)\<`any`, `any`\>

### Parameters

#### topic

`T`

#### value?

`TopicIn`\<`T`\>

### Returns

`Promise`\<[`ReturnStatus`](../type-aliases/ReturnStatus.md)\>

0= done, else see [ReturnStatus](../type-aliases/ReturnStatus.md)

### Throws

Given `topic` is not [Topic](../type-aliases/Topic.md)!

## Call Signature

> **publish**\<`T`\>(`value?`): (`topic`) => `Promise`\<[`ReturnStatus`](../type-aliases/ReturnStatus.md)\>

Defined in: [lib/esm.d.ts:162](https://github.com/jaandrle/fpubsub/blob/7fdf753887d41de71c804e07e7a0f4624c769733/lib/esm.d.ts#L162)

Curried version of `publish`.
```js
publish("value")(onexample);
publish()(onexample);
```

### Type Parameters

#### T

`T` *extends* [`Topic`](../type-aliases/Topic.md)\<`any`, `any`\>

### Parameters

#### value?

`TopicIn`\<`T`\>

### Returns

(`topic`) => `Promise`\<[`ReturnStatus`](../type-aliases/ReturnStatus.md)\>
