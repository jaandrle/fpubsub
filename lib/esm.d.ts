export type TopicOptions<DATA extends any, DATA_IN extends any= undefined>= {
	/** Keep last published value and when new listener is registered call this function with kept value.
	 * @default false
	 * */
	cache?: boolean;
	/** This force `cache= true` and sets initial value. */
	initial?: any;
	/** Converts topic `value` from `publish` function to what listeners are expecting. */
	mapper?: (value: DATA_IN)=> DATA;
	/** Topic can be published only one time.
	 * @default false
	 * */
	once?: boolean;
	/** Topic origin
	 * @default null
	 * */
	origin?: any;
};
/**
* Topic **reference** to be used in subscribe/publish/… functions.
* For using in JSDoc, you can use global type {@link fpubsubTopic}.
*/
export type Topic<DATA extends any, DATA_IN extends any= undefined>= TopicOptions<DATA, DATA_IN> & {
	/** Topic origin */
	origin: any;
	/** Typically helpful in case of `once` topics. */
	is_live: boolean;
};
declare global{
	/** Alias for {@link Topic} for using in JSDoc */
	export type fpubsubTopic<DATA extends any, DATA_IN extends any= undefined>= Topic<DATA, DATA_IN>;
}
type TopicOut<T>= T extends Topic<infer X> ? X : never
type TopicIn<T>= T extends Topic<infer Y , infer X> ? ( X extends undefined ? Y : X ) : never

/**
 * Creates topic to be used in subscribe/publish/… functions.
 * You can use another topis as argument for creating new topic with similar options (for dependent topic use {@link topicFrom}).
 *
 * Use types `topi<DATA, DATA_IN>`:
 * - `DATA`: to add types for (publishign)/subscribing values
 * - `DATA_IN`: to describe publishign values if differs to `DATA` (see {@link TopicOptions.mapper})
 *
 * In JavaScript:
 * ```js
 * /** @type {fpubsubTopic<string>} *\/
 * const onexample= topic({ cached: true });
 * //…
 * publish(onexample, "Test");
 * ```
 * In TypeScript:
 * ```ts
 * const onexample= topic<string>({ cached: true });
 * //…
 * publish(onexample, "Test");
 * ```
 * @param options See {@link TopicOptions}
 * */
export function topic<DATA extends any, DATA_IN extends any= undefined>(options?: TopicOptions<DATA, DATA_IN>): Topic<DATA, DATA_IN>;
/**
 * Creates topic from [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) and maps abort signal as publish and publish as abort signal.
 * Sets topic origin to the `AbortController` instance.
 * ```js
 * const onabort= topicFrom(AbortController);
 * subscribe(onabort, console.log);
 * fetch("www.example.test", { signal: onabort.origin.signal });
 * publish(onabort);
 * ```
 *
 * FYI: [Fetch: Abort](https://javascript.info/fetch-abort)
 * */
export function topicFrom<DATA extends any, DATA_IN extends any= undefined>(candidate: AbortController | typeof AbortController): Topic<DATA, DATA_IN>;
/**
 * Creates dependent topic to given topic. All listeners will be called when the original topic is published.
 * ```js
 * const ontopic= topic();
 * const onsubtopic= topicFrom(ontopic);
 * subscribe(onsubtopic, console.log);
 * publish(ontopic, "For all `ontopic` and `onsubtopic` listeners");
 * publish(onsubtopic, "For only `onsubtopic` listeners");
 * ```
 * */
export function topicFrom<DATA extends any, DATA_IN extends any= undefined>(candidate: Topic<any>): Topic<DATA, DATA_IN>;
/**
 * ```js
 * const is_topic= topic();
 * const not_topic= {};
 * console.log(
 *	isTopic(is_topic)===true,
 *	isTopic(not_topic)===false
 * );
 * ```
 * */
export function isTopic<T>(candidate: T): T extends Topic<any, any> ? true : false;
/**
 * Returns value of given topic. Primarly make sence in case of `cached` topics, elsewhere always returns `undefined`.
 * ```js
 * /** @type {fpubsubTopic<string>} *\/
 * const ontest= topic({ cache: true });
 * publish(topic, "value");
 * console.log(valueOf(topic)==="value");
 * ```
 * */
export function valueOf<T extends Topic<any, any>>(topic: T): TopicOut<T> | undefined;
/**
 * This function can be use to erase given `topic` explicitly.
 * ```js
 * const ontest= topic();
 * subscribe(ontest, console.log);
 * erase(ontest);
 * publish(ontest);// ignored ⇐ no active topic
 * ```
 * …but it is not neccesary:
 * ```js
 * let ontest= topic();
 * subscribe(ontest, console.log);
 * ontest= null;// JS auto remove unneeded info
 * publish(ontest);// throws error ⇐ no topic
 * ```
 * …but keep in mind the `topic`s are objects (e.g. https://stackoverflow.com/a/6326813)
 * */
export function erase(topic: Topic<any, any>): undefined;

/**
 * Return type of functions:
 * - `0`: operation successfully processed
 * - `1`: given topic is not “live” (`once` event already published) → nothing to do
 * - `2`, …: another non-error issue → nothing to do
 *
 * …functions typically throws Error if given topic is not {@link Topic}.
 * */
export type ReturnStatus= 0 | 1 | 2;

/**
 * Publishes `value` for given `topic`. Process all synchronous listeners synchronously, so if there is no async listener there is no need to await to `publish`.
 * 
 * ```js
 * /** @type {fpubsubTopic<string>} *\/
 * const onexample= topic({ cached: true });
 * publish(onexample, "Test");
 * publish(onexample, "Test").then(console.log).catch(console.error);
 *
 * const publishExample= publish.bind(null, onexample);
 * publishExample("Test 2");
 *
 * const publishText= publish("Test 3");
 * publishText(onexample);
 * ```
 * @throws {TypeError} Given `topic` is not {@link Topic}!
 * @returns 0= done, else see {@link ReturnStatus}
 * */
export function publish<T extends Topic<any, any>>(topic: T, value?: TopicIn<T>): Promise<ReturnStatus>
/**
 * Curried version of `publish`.
 * ```js
 * publish("value")(onexample);
 * publish()(onexample);
 * ```
 * */
export function publish<T extends Topic<any, any>>(value?: TopicIn<T>): (topic: T)=> Promise<ReturnStatus>
export { publish as pub };

/** Follows [EventTarget.addEventListener() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener). */
export type Listener<T extends Topic<any, any>>=
	( (value: TopicOut<T>, topic: T)=> void | Promise<void> )
	| { handleEvent(value: TopicOut<T>, topic: T): void | Promise<void> }
;
export type SubscribeOptions= {
	/** Call only once */
	once?: boolean;
	/** An AbortSignal. The listener will be removed when the given AbortSignal object's abort() method is called. If not specified, no AbortSignal is associated with the listener. */
	signal?: AbortSignal;
};
/**
 * Register `listener` function (subscriber) to be called when `topic` will be emitted.
 * 
 * ```js
 * /** @type {fpubsubTopic<string>} *\/
 * const onexample= topic({ cached: true });
 * subscribe(onexample, console.log);
 *
 * const options= {};
 * const subscribeExample= subscribe(onexample, options);
 * subscribeExample(console.error);
 *
 * const subscribeInfo= subscribe(console.info, options);
 * subscribeInfo(onexample);
 * ```
 * @throws {TypeError} Given `topic` is not {@link Topic}!
 * @returns 0= done, else see {@link ReturnStatus}
 * */
export function subscribe<T extends Topic<any, any>>(topic: T, listener: Listener<T>, options?: SubscribeOptions): ReturnStatus
/**
 * Curried version of `subscribe`.
 * ```js
 * subscribe(onexample)(console.log);
 * subscribe(onexample, { once: true })(console.log);
 * ```
 * */
export function subscribe<T extends Topic<any, any>>(topic: T, options?: SubscribeOptions): (listener: Listener<T>)=> ReturnStatus
/**
 * Curried version of `subscribe`.
 * ```js
 * subscribe(console.log)(onexample);
 * subscribe(console.log, { once: true })(onexample);
 * ```
 * */
export function subscribe<T extends Topic<any, any>>(listener: Listener<T>, options?: SubscribeOptions): (topic: T)=> ReturnStatus
export { subscribe as sub };

/**
 * Is `listener` listening to the given `topic`?
 * ```js
 * const onexample= topic();
 * subscribe(onexample, console.log);
 * console.log(
 *	has(onexample, console.log)===true,
 *	has(onexample, console.error)===false,
 * );
 * ```
 * @throws {TypeError} Given `topic` is not {@link Topic}!
 * */
export function has<T extends Topic<any, any>>(topic: T, listener: Listener<T>): boolean;

/**
 * Unregister `listener` function (subscriber) to be called when `topic` will be emitted.
 * ```js
 * const onexample= topic();
 * subscribe(onexample, console.log);
 * unsubscribe(onexample, console.log);
 * ```
 * @throws {TypeError} Given `topic` is not {@link Topic}!
 * @returns 0= done, else see {@link ReturnStatus}
 * */
export function unsubscribe<T extends Topic<any, any>>(topic: T, listener: (value: TopicOut<T>, topic: T)=> void | Promise<void>): ReturnStatus
export { unsubscribe as unsub };
/**
 * Unregister all listeners for given `topic`.
 * ```js
 * const onexample= topic();
 * subscribe(onexample, console.log);
 * unsubscribeAll(onexample);
 * ```
 * @throws {TypeError} Given `topic` is not {@link Topic}!
 * @returns 0= done, else see {@link ReturnStatus}
 * */
export function unsubscribeAll(topic: Topic<any, any>): ReturnStatus
