[**fpubsub v1.0.0**](../README.md)

***

[fpubsub](../README.md) / topic

# Function: topic()

> **topic**\<`DATA`, `DATA_IN`\>(`options?`): [`Topic`](../type-aliases/Topic.md)\<`DATA`, `DATA_IN`\>

Defined in: [lib/esm.d.ts:61](https://github.com/jaandrle/fpubsub/blob/7fdf753887d41de71c804e07e7a0f4624c769733/lib/esm.d.ts#L61)

Creates topic to be used in subscribe/publish/… functions.
You can use another topis as argument for creating new topic with similar options (for dependent topic use [topicFrom](topicFrom.md)).

Use types `topi<DATA, DATA_IN>`:
- `DATA`: to add types for (publishign)/subscribing values
- `DATA_IN`: to describe publishign values if differs to `DATA` (see [TopicOptions.mapper](../type-aliases/TopicOptions.md#mapper))

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

## Type Parameters

### DATA

`DATA` *extends* `unknown`

### DATA_IN

`DATA_IN` *extends* `unknown` = `undefined`

## Parameters

### options?

[`TopicOptions`](../type-aliases/TopicOptions.md)\<`DATA`, `DATA_IN`\>

See [TopicOptions](../type-aliases/TopicOptions.md)

## Returns

[`Topic`](../type-aliases/Topic.md)\<`DATA`, `DATA_IN`\>
