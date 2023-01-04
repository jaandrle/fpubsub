export type TopicOptions<DATA extends any, DATA_IN extends any= undefined>= {
	/** Keep last published data and when new listener is registered call this function with kept data.
	 * @default false
	 * */
	cache?: boolean;
	/** Converts topic `data` from `publish` function to what listeners are expecting. */
	mapper?: (data: DATA_IN)=> DATA;
	/**
	 * Topic can be published only one time.
	 * @default false
	 * */
	once?: boolean;
	/** Topic origin (`null` by default) */
	origin?: any;
};
/**
* Topic **reference** to be used in subscribe/publish/… functions.
* For using in JSDoc, you can use global type {@link fpubsubTopic}.
*/
export type Topic<DATA extends any, DATA_IN extends any= undefined>= TopicOptions<DATA, DATA_IN> & {
	/** Topic origin */
	origin: any;
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
 * Use:
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
/** Creates dependent topic to given topic. All listeners will be called when the original topic is published. */
export function topicFrom<DATA extends any, DATA_IN extends any= undefined>(candidate: Topic<any>): Topic<DATA, DATA_IN>;
export type TopicInfo<T>= {
	is_topic: true
	/** This can be helpful for `once` topics. */
	is_live: boolean
	/** This can be helpful for `cached` topics. */
	data: T
};
/** Helper to determine if `topic` is {@link Topic} and eventually another info. */
export function info<T>(topic: T): T extends Topic<any, any> ? TopicInfo<TopicOut<T>> : { is_topic: false };
/**
 * This function can be use to erase given `topic` explicitly.
 * ```js
 * const ontest= topic();
 * subscribe(ontest, console.log);
 * erase(ontest);
 * publish(ontest);// throws error ⇐ no topic
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
 * Publishes `data` for given `topic`. Process all synchronous listeners synchronously, so if there is no async listener there is no need to await to `publish`.
 * 
 * ```js
 * /** @type {fpubsubTopic<string>} *\/
 * const onexample= topic({ cached: true });
 * publish(onexample, "Test");
 * publish(onexample, "Test").then(console.log).catch(console.error);
 * ```
 * @throws {TypeError} Given `topic` is not {@link Topic}!
 * @returns 0= done, else see {@link ReturnStatus}
 * */
export function publish<T extends Topic<any, any>>(topic: T, data?: TopicIn<T>): Promise<ReturnStatus>
export { publish as pub };

export type Listener<T extends Topic<any, any>>= (data: TopicOut<T>, topic: T)=> void | Promise<void>;
/**
 * Register `listener` function (subscriber) to be called when `topic` will be emitted.
 * 
 * ```js
 * /** @type {fpubsubTopic<string>} *\/
 * const onexample= topic({ cached: true });
 * subscribe(onexample, console.log);
 * ```
 * @throws {TypeError} Given `topic` is not {@link Topic}!
 * @returns 0= done, else see {@link ReturnStatus}
 * */
export function subscribe<T extends Topic<any, any>>(topic: T, listener: Listener<T>, options?: { once?: boolean }): ReturnStatus
/** Curried version of `subscribe`. */
export function subscribe<T extends Topic<any, any>>(topic: T, options?: { once?: boolean }): (listener: Listener<T>)=> ReturnStatus
export { subscribe as sub };

/**
 * Is `listener` listening to the given `topic`?
 * @throws {TypeError} Given `topic` is not {@link Topic}!
 * */
export function has<T extends Topic<any, any>>(topic: T, listener: Listener<T>): boolean;

/**
 * Unregister `listener` function (subscriber) to be called when `topic` will be emitted.
 * @throws {TypeError} Given `topic` is not {@link Topic}!
 * @returns 0= done, else see {@link ReturnStatus}
 * */
export function unsubscribe<T extends Topic<any, any>>(topic: T, listener: (data: TopicOut<T>, topic: T)=> void | Promise<void>): ReturnStatus
export { unsubscribe as unsub };
/**
 * Unregister all listeners for given `topic`.
 * @throws {TypeError} Given `topic` is not {@link Topic}!
 * @returns 0= done, else see {@link ReturnStatus}
 * */
export function unsubscribeAll(topic: Topic<any, any>): ReturnStatus
