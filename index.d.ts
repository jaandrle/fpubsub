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
	/** Topic origin */
	origin?: any;
};
type Listener<DATA>= (data: DATA)=> void | Promise<void>;
/**
* Topic **reference** to be used in subscribe/publish/… functions.
* For using in JSDoc, you can use global type {@link fpubsubTopic}.
*/
export type Topic<DATA extends any, DATA_IN extends any= undefined>= TopicOptions<DATA, DATA_IN> & {
	meta: {
		listeners?: WeakSet<Listener<DATA>>;
		listeners_exit?: WeakSet<(data: any)=> void | Promise<void>>;
		data?: DATA
	}
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
 * In JavaScript:
 * ```js
 * /**
 *  * Test
 *  * \@type {fpubsubTopic<string>}
 *  *\/
 * const onexample= topic({ cached: true });
 * //…
 * publish(onexample, "Test");
 * ```
 * In TypeScript:
 * ```ts
 * /** Test *\/
 * const onexample= topic<string>({ cached: true });
 * //…
 * publish(onexample, "Test");
 * ```
 * @param options See {@link TopicOptions}
 * */
export function topic<DATA extends any, DATA_IN extends any= undefined>(options?: TopicOptions<DATA, DATA_IN>): Topic<DATA, DATA_IN>;

export function isTopic<T>(candidate: T): T extends Topic<any, any> ? true : false;

/** Creates topic from [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) and maps abort signal as publish and publish as abort signal. */
export function topicFrom<DATA extends any, DATA_IN extends any= undefined>(candidate: AbortController | typeof AbortController): Topic<DATA, DATA_IN>;
/** Creates dependent topic to given topic. All listeners will be called when the original topic is published. */
export function topicFrom<DATA extends any, DATA_IN extends any= undefined>(candidate: Topic<any>): Topic<DATA, DATA_IN>;

/**
 * Publishes `data` for given `topic`. Process all synchronous listeners synchronously, so if there is no async listener there is no need to await to `publish`.
 * 
 * ```js
 * /** \@type {fpubsubTopic<string>} *\/
 * const onexample= topic({ cached: true });
 * publish(onexample, "Test");
 * publish(onexample, "Test").then(console.log).catch(console.error);
 * ```
 * @throws {TypeError} Unregistered `topic`
 * @returns `0`= success / `1`= ‘once’ topic already published / error elsewhere.
 * */
export function publish<T extends Topic<any, any>>(topic: T, data: TopicIn<T>): Promise<0|1>
export { publish as pub };

/**
 * Register `listener` function (subscriber) to be called when `topic` will be emitted.
 * 
 * ```js
 * /** \@type {fpubsubTopic<string>} *\/
 * const onexample= topic({ cached: true });
 * subscribe(onexample, console.log);
 * ```
 * @throws {TypeError} Unregistered `topic`
 * @returns Function to unsubscribe given topic+listener
 * */
export function subscribe<T extends Topic<any, any>>(topic: T, listener: (data: TopicOut<T>, topic: T)=> void | Promise<void>, options?: { once?: boolean }): ()=> ReturnType<typeof unsubscribe>
/** Curried version of `subscribe`. */
export function subscribe<T extends Topic<any, any>>(topic: T, options?: { once?: boolean }): (listener: (data: TopicOut<T>, topic: T)=> void | Promise<void>)=> ()=> ReturnType<typeof unsubscribe>
export { subscribe as sub };

/**
 * Unregister `listener` function (subscriber) to be called when `topic` will be emitted.
 * @throws {TypeError} Unregistered `topic`
 * @returns The listener was successfully removed, or undefined when tops has no listeners (e.g. one–time topic)
 * */
export function unsubscribe<T extends Topic<any, any>>(topic: T, listener: (data: TopicOut<T>, topic: T)=> void | Promise<void>): boolean | undefined
