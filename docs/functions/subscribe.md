[**fpubsub v1.0.0**](../README.md)

***

[fpubsub](../README.md) / subscribe

# Function: subscribe()

## Call Signature

> **subscribe**\<`T`\>(`topic`, `listener`, `options?`): [`ReturnStatus`](../type-aliases/ReturnStatus.md)

Defined in: [lib/esm.d.ts:194](https://github.com/jaandrle/fpubsub/blob/7fdf753887d41de71c804e07e7a0f4624c769733/lib/esm.d.ts#L194)

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

### Type Parameters

#### T

`T` *extends* [`Topic`](../type-aliases/Topic.md)\<`any`, `any`\>

### Parameters

#### topic

`T`

#### listener

[`Listener`](../type-aliases/Listener.md)\<`T`\>

#### options?

[`SubscribeOptions`](../type-aliases/SubscribeOptions.md)

### Returns

[`ReturnStatus`](../type-aliases/ReturnStatus.md)

0= done, else see [ReturnStatus](../type-aliases/ReturnStatus.md)

### Throws

Given `topic` is not [Topic](../type-aliases/Topic.md)!

## Call Signature

> **subscribe**\<`T`\>(`topic`, `options?`): (`listener`) => [`ReturnStatus`](../type-aliases/ReturnStatus.md)

Defined in: [lib/esm.d.ts:202](https://github.com/jaandrle/fpubsub/blob/7fdf753887d41de71c804e07e7a0f4624c769733/lib/esm.d.ts#L202)

Curried version of `subscribe`.
```js
subscribe(onexample)(console.log);
subscribe(onexample, { once: true })(console.log);
```

### Type Parameters

#### T

`T` *extends* [`Topic`](../type-aliases/Topic.md)\<`any`, `any`\>

### Parameters

#### topic

`T`

#### options?

[`SubscribeOptions`](../type-aliases/SubscribeOptions.md)

### Returns

(`listener`) => [`ReturnStatus`](../type-aliases/ReturnStatus.md)

## Call Signature

> **subscribe**\<`T`\>(`listener`, `options?`): (`topic`) => [`ReturnStatus`](../type-aliases/ReturnStatus.md)

Defined in: [lib/esm.d.ts:210](https://github.com/jaandrle/fpubsub/blob/7fdf753887d41de71c804e07e7a0f4624c769733/lib/esm.d.ts#L210)

Curried version of `subscribe`.
```js
subscribe(console.log)(onexample);
subscribe(console.log, { once: true })(onexample);
```

### Type Parameters

#### T

`T` *extends* [`Topic`](../type-aliases/Topic.md)\<`any`, `any`\>

### Parameters

#### listener

[`Listener`](../type-aliases/Listener.md)\<`T`\>

#### options?

[`SubscribeOptions`](../type-aliases/SubscribeOptions.md)

### Returns

(`topic`) => [`ReturnStatus`](../type-aliases/ReturnStatus.md)
