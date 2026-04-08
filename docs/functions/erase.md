[**fpubsub v1.0.0**](../README.md)

***

[fpubsub](../README.md) / erase

# Function: erase()

> **erase**(`topic`): `undefined`

Defined in: [lib/esm.d.ts:124](https://github.com/jaandrle/fpubsub/blob/7fdf753887d41de71c804e07e7a0f4624c769733/lib/esm.d.ts#L124)

This function can be use to erase given `topic` explicitly.
```js
const ontest= topic();
subscribe(ontest, console.log);
erase(ontest);
publish(ontest);// ignored ⇐ no active topic
```
…but it is not neccesary:
```js
let ontest= topic();
subscribe(ontest, console.log);
ontest= null;// JS auto remove unneeded info
publish(ontest);// throws error ⇐ no topic
```
…but keep in mind the `topic`s are objects (e.g. https://stackoverflow.com/a/6326813)

## Parameters

### topic

[`Topic`](../type-aliases/Topic.md)\<`any`, `any`\>

## Returns

`undefined`
