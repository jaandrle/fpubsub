[**fpubsub v1.0.0**](../README.md)

***

[fpubsub](../README.md) / ReturnStatus

# Type Alias: ReturnStatus

> **ReturnStatus** = `0` \| `1` \| `2`

Defined in: [lib/esm.d.ts:134](https://github.com/jaandrle/fpubsub/blob/7fdf753887d41de71c804e07e7a0f4624c769733/lib/esm.d.ts#L134)

Return type of functions:
- `0`: operation successfully processed
- `1`: given topic is not “live” (`once` event already published) → nothing to do
- `2`, …: another non-error issue → nothing to do

…functions typically throws Error if given topic is not [Topic](Topic.md).
