[**fpubsub v1.0.0**](../README.md)

***

[fpubsub](../README.md) / has

# Function: has()

> **has**\<`T`\>(`topic`, `listener`): `boolean`

Defined in: [lib/esm.d.ts:225](https://github.com/jaandrle/fpubsub/blob/7fdf753887d41de71c804e07e7a0f4624c769733/lib/esm.d.ts#L225)

Is `listener` listening to the given `topic`?
```js
const onexample= topic();
subscribe(onexample, console.log);
console.log(
	has(onexample, console.log)===true,
	has(onexample, console.error)===false,
);
```

## Type Parameters

### T

`T` *extends* [`Topic`](../type-aliases/Topic.md)\<`any`, `any`\>

## Parameters

### topic

`T`

### listener

[`Listener`](../type-aliases/Listener.md)\<`T`\>

## Returns

`boolean`

## Throws

Given `topic` is not [Topic](../type-aliases/Topic.md)!
