[**fpubsub v1.0.0**](../README.md)

***

[fpubsub](../README.md) / TopicOptions

# Type Alias: TopicOptions\<DATA, DATA_IN\>

> **TopicOptions**\<`DATA`, `DATA_IN`\> = `object`

Defined in: [lib/esm.d.ts:1](https://github.com/jaandrle/fpubsub/blob/7fdf753887d41de71c804e07e7a0f4624c769733/lib/esm.d.ts#L1)

## Type Parameters

### DATA

`DATA` *extends* `any`

### DATA_IN

`DATA_IN` *extends* `any` = `undefined`

## Properties

### cache?

> `optional` **cache?**: `boolean`

Defined in: [lib/esm.d.ts:5](https://github.com/jaandrle/fpubsub/blob/7fdf753887d41de71c804e07e7a0f4624c769733/lib/esm.d.ts#L5)

Keep last published value and when new listener is registered call this function with kept value.

#### Default

```ts
false
```

***

### initial?

> `optional` **initial?**: `any`

Defined in: [lib/esm.d.ts:7](https://github.com/jaandrle/fpubsub/blob/7fdf753887d41de71c804e07e7a0f4624c769733/lib/esm.d.ts#L7)

This force `cache= true` and sets initial value.

***

### mapper?

> `optional` **mapper?**: (`value`) => `DATA`

Defined in: [lib/esm.d.ts:9](https://github.com/jaandrle/fpubsub/blob/7fdf753887d41de71c804e07e7a0f4624c769733/lib/esm.d.ts#L9)

Converts topic `value` from `publish` function to what listeners are expecting.

#### Parameters

##### value

`DATA_IN`

#### Returns

`DATA`

***

### once?

> `optional` **once?**: `boolean`

Defined in: [lib/esm.d.ts:13](https://github.com/jaandrle/fpubsub/blob/7fdf753887d41de71c804e07e7a0f4624c769733/lib/esm.d.ts#L13)

Topic can be published only one time.

#### Default

```ts
false
```

***

### origin?

> `optional` **origin?**: `any`

Defined in: [lib/esm.d.ts:16](https://github.com/jaandrle/fpubsub/blob/7fdf753887d41de71c804e07e7a0f4624c769733/lib/esm.d.ts#L16)

Topic origin
