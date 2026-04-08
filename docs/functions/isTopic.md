[**fpubsub v1.0.0**](../README.md)

***

[fpubsub](../README.md) / isTopic

# Function: isTopic()

> **isTopic**\<`T`\>(`candidate`): `T` *extends* [`Topic`](../type-aliases/Topic.md)\<`any`, `any`\> ? `true` : `false`

Defined in: [lib/esm.d.ts:96](https://github.com/jaandrle/fpubsub/blob/7fdf753887d41de71c804e07e7a0f4624c769733/lib/esm.d.ts#L96)

```js
const is_topic= topic();
const not_topic= {};
console.log(
	isTopic(is_topic)===true,
	isTopic(not_topic)===false
);
```

## Type Parameters

### T

`T`

## Parameters

### candidate

`T`

## Returns

`T` *extends* [`Topic`](../type-aliases/Topic.md)\<`any`, `any`\> ? `true` : `false`
