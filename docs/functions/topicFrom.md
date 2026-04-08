[**fpubsub v1.0.0**](../README.md)

***

[fpubsub](../README.md) / topicFrom

# Function: topicFrom()

## Call Signature

> **topicFrom**\<`DATA`, `DATA_IN`\>(`candidate`): [`Topic`](../type-aliases/Topic.md)\<`DATA`, `DATA_IN`\>

Defined in: [lib/esm.d.ts:74](https://github.com/jaandrle/fpubsub/blob/7fdf753887d41de71c804e07e7a0f4624c769733/lib/esm.d.ts#L74)

Creates topic from [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) and maps abort signal as publish and publish as abort signal.
Sets topic origin to the `AbortController` instance.
```js
const onabort= topicFrom(AbortController);
subscribe(onabort, console.log);
fetch("www.example.test", { signal: onabort.origin.signal });
publish(onabort);
```

FYI: [Fetch: Abort](https://javascript.info/fetch-abort)

### Type Parameters

#### DATA

`DATA` *extends* `unknown`

#### DATA_IN

`DATA_IN` *extends* `unknown` = `undefined`

### Parameters

#### candidate

`AbortController` \| (\{(): `AbortController`; `prototype`: `AbortController`; \})

### Returns

[`Topic`](../type-aliases/Topic.md)\<`DATA`, `DATA_IN`\>

## Call Signature

> **topicFrom**\<`DATA`, `DATA_IN`\>(`candidate`): [`Topic`](../type-aliases/Topic.md)\<`DATA`, `DATA_IN`\>

Defined in: [lib/esm.d.ts:85](https://github.com/jaandrle/fpubsub/blob/7fdf753887d41de71c804e07e7a0f4624c769733/lib/esm.d.ts#L85)

Creates dependent topic to given topic. All listeners will be called when the original topic is published.
```js
const ontopic= topic();
const onsubtopic= topicFrom(ontopic);
subscribe(onsubtopic, console.log);
publish(ontopic, "For all `ontopic` and `onsubtopic` listeners");
publish(onsubtopic, "For only `onsubtopic` listeners");
```

### Type Parameters

#### DATA

`DATA` *extends* `unknown`

#### DATA_IN

`DATA_IN` *extends* `unknown` = `undefined`

### Parameters

#### candidate

[`Topic`](../type-aliases/Topic.md)\<`any`\>

### Returns

[`Topic`](../type-aliases/Topic.md)\<`DATA`, `DATA_IN`\>
