[**fpubsub v1.0.0**](../README.md)

***

[fpubsub](../README.md) / unsubscribeAll

# Function: unsubscribeAll()

> **unsubscribeAll**(`topic`): [`ReturnStatus`](../type-aliases/ReturnStatus.md)

Defined in: [lib/esm.d.ts:249](https://github.com/jaandrle/fpubsub/blob/7fdf753887d41de71c804e07e7a0f4624c769733/lib/esm.d.ts#L249)

Unregister all listeners for given `topic`.
```js
const onexample= topic();
subscribe(onexample, console.log);
unsubscribeAll(onexample);
```

## Parameters

### topic

[`Topic`](../type-aliases/Topic.md)\<`any`, `any`\>

## Returns

[`ReturnStatus`](../type-aliases/ReturnStatus.md)

0= done, else see [ReturnStatus](../type-aliases/ReturnStatus.md)

## Throws

Given `topic` is not [Topic](../type-aliases/Topic.md)!
