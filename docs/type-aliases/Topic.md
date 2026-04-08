[**fpubsub v1.0.0**](../README.md)

***

[fpubsub](../README.md) / Topic

# Type Alias: Topic\<DATA, DATA_IN\>

> **Topic**\<`DATA`, `DATA_IN`\> = `object` & [`TopicOptions`](TopicOptions.md)\<`DATA`, `DATA_IN`\>

Defined in: [lib/esm.d.ts:22](https://github.com/jaandrle/fpubsub/blob/7fdf753887d41de71c804e07e7a0f4624c769733/lib/esm.d.ts#L22)

Topic **reference** to be used in subscribe/publish/… functions.
For using in JSDoc, you can use global type fpubsubTopic.

## Type Declaration

### origin

> **origin**: `any`

Topic origin

#### Default

```ts
null
```

### is\_live

> **is\_live**: `boolean`

Typically helpful in case of `once` topics.

## Type Parameters

### DATA

`DATA` *extends* `any`

### DATA_IN

`DATA_IN` *extends* `any` = `undefined`
