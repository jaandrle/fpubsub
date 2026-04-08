[**fpubsub v1.0.0**](../README.md)

***

[fpubsub](../README.md) / SubscribeOptions

# Type Alias: SubscribeOptions

> **SubscribeOptions** = `object`

Defined in: [lib/esm.d.ts:170](https://github.com/jaandrle/fpubsub/blob/7fdf753887d41de71c804e07e7a0f4624c769733/lib/esm.d.ts#L170)

## Properties

### once?

> `optional` **once?**: `boolean`

Defined in: [lib/esm.d.ts:172](https://github.com/jaandrle/fpubsub/blob/7fdf753887d41de71c804e07e7a0f4624c769733/lib/esm.d.ts#L172)

Call only once

***

### signal?

> `optional` **signal?**: `AbortSignal`

Defined in: [lib/esm.d.ts:174](https://github.com/jaandrle/fpubsub/blob/7fdf753887d41de71c804e07e7a0f4624c769733/lib/esm.d.ts#L174)

An AbortSignal. The listener will be removed when the given AbortSignal object's abort() method is called. If not specified, no AbortSignal is associated with the listener.
