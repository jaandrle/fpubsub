[**fpubsub v1.0.0**](../README.md)

***

[fpubsub](../README.md) / Listener

# Type Alias: Listener\<T\>

> **Listener**\<`T`\> = ((`value`, `topic`) => `void` \| `Promise`\<`void`\>) \| \{ `handleEvent`: `void` \| `Promise`\<`void`\>; \}

Defined in: [lib/esm.d.ts:166](https://github.com/jaandrle/fpubsub/blob/7fdf753887d41de71c804e07e7a0f4624c769733/lib/esm.d.ts#L166)

Follows [EventTarget.addEventListener() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

## Type Parameters

### T

`T` *extends* [`Topic`](Topic.md)\<`any`, `any`\>
