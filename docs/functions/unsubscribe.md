[**fpubsub v1.0.0**](../README.md)

***

[fpubsub](../README.md) / unsubscribe

# Function: unsubscribe()

> **unsubscribe**\<`T`\>(`topic`, `listener`): [`ReturnStatus`](../type-aliases/ReturnStatus.md)

Defined in: [lib/esm.d.ts:237](https://github.com/jaandrle/fpubsub/blob/7fdf753887d41de71c804e07e7a0f4624c769733/lib/esm.d.ts#L237)

Unregister `listener` function (subscriber) to be called when `topic` will be emitted.
```js
const onexample= topic();
subscribe(onexample, console.log);
unsubscribe(onexample, console.log);
```

## Type Parameters

### T

`T` *extends* [`Topic`](../type-aliases/Topic.md)\<`any`, `any`\>

## Parameters

### topic

`T`

### listener

(`value`, `topic`) => `void` \| `Promise`\<`void`\>

## Returns

[`ReturnStatus`](../type-aliases/ReturnStatus.md)

0= done, else see [ReturnStatus](../type-aliases/ReturnStatus.md)

## Throws

Given `topic` is not [Topic](../type-aliases/Topic.md)!
