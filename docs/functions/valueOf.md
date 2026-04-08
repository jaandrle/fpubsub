[**fpubsub v1.0.0**](../README.md)

***

[fpubsub](../README.md) / valueOf

# Function: valueOf()

> **valueOf**\<`T`\>(`topic`): `TopicOut`\<`T`\> \| `undefined`

Defined in: [lib/esm.d.ts:106](https://github.com/jaandrle/fpubsub/blob/7fdf753887d41de71c804e07e7a0f4624c769733/lib/esm.d.ts#L106)

Returns value of given topic. Primarly make sence in case of `cache`d topics, elsewhere always returns `undefined`.
```js
/** @type {fpubsubTopic<string>} */
const ontest= topic({ cache: true });
publish(topic, "value");
console.log(valueOf(topic)==="value");
```

## Type Parameters

### T

`T` *extends* [`Topic`](../type-aliases/Topic.md)\<`any`, `any`\>

## Parameters

### topic

`T`

## Returns

`TopicOut`\<`T`\> \| `undefined`
