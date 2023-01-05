/** @type {WeakMap<fpubsubTopic, { listeners?: Set<function>, value?: any }>} */
const storage= new WeakMap();
const Topic= {
	origin: null,
	get is_live(){
		if(!storage.has(this)) return false;
		return storage.get(this).listeners ? true : false;
	}
};
export function topic(options){
	options= Object.assign({}, options);
	const topic= Object.assign(Object.create(Topic), options);
	const storage_data= { listeners: new Set() };
	storage.set(topic, storage_data);
	if(Reflect.has(topic, "initial")){
		storage_data.value= topic.initial;
		Reflect.deleteProperty(topic, "initial");
	}
	return Object.freeze(topic);
}
const AbortController= globalThis && globalThis.AbortController ? globalThis.AbortController : class ignore{};
export function topicFrom(candidate, options){
	if(candidate === AbortController)
		candidate= new AbortController();
	if(candidate instanceof AbortController)
		return topicFromAbort(candidate);
	
	if(isTopic(candidate)){
		const t= topic(Object.assign({}, options, { origin: candidate }));
		subscribe(candidate, value=> publishA(t, value));
		return t;
	}

	if("[object AsyncGeneratorFunction]"===Object.prototype.toString.call(candidate)){
		const t= topic(Object.assign({}, options, { origin: candidate }));
		(async ()=> {
			for await(const value of candidate())
				publishA(t, value);
			erase(t);
		})();
		return t;
	}
	
	throw new Error(`The '${candidate}' cannot be converted to a \`topic\`.`);
}
export function erase(topic){ storage.delete(topic); }
export function isTopic(candidate){ return Object.getPrototypeOf(candidate) === Topic; }
function notTopic(topic){
	const topic_str= JSON.stringify(topic);
	throw new TypeError(`Given topic '${topic_str}' is not supported. Topic are created via 'topic' function.`);
}
function isInactiveTopic(topic){
	if(!isTopic(topic)) return notTopic(topic);
	
	if(storage.get(topic).listeners) return 0;
	if(topic.once) return 1;
	return 2;
}
export function valueOf(topic){
	if(!isTopic(topic)) return notTopic(topic);
	return storage.get(topic).value;
}
function topicFromAbort(origin){
	const options= topic({ once: true, origin });
	const onabort= publishA.bind(null, origin, 0);
	const onclose= ()=> (origin.signal.removeEventListener("abort", onabort), origin.abort());
	origin.signal.addEventListener("abort", onabort);
	subscribe(options, onclose);
	return options;
}

export function publish(topic, value){
	if(!isTopic(topic) && value===undefined) return t=> publishA(t, topic);
	return publishA(topic, value);
}
async function publishA(topic, value){
	if(isInactiveTopic(topic)) return 1;
	value= toOutData(topic, value);
	let promises= [];
	storage.get(topic).listeners.forEach(function(f){
		const p= typeof f === "function" ? f(value, topic) : f.handleEvent(value, topic);
		if(p instanceof Promise) promises.push(p);
	});
	if(promises.length) await Promise.all(promises);
	if(topic.cache) storage.get(topic).value= value;
	if(topic.once) storage.get(topic).listeners= undefined;
	return 0;
}
export const pub= publishA;
function toOutData({ mapper }, value){ return mapper ? mapper(value) : value; }

export function subscribe(topic, listener, { once= false, signal }= {}){
	if(isListener(topic)) return t=> subscribe(t, topic, listener);
	if(!isListener(listener)) return l=> subscribe(topic, l, listener);
	if(signal instanceof AbortSignal){
		if(signal.aborted) return 2;
		signal.addEventListener("abort", unsubscribe.bind(null, topic, listener));
	}
	if(topic.cache) listener(storage.get(topic).value, topic);
	
	if(isInactiveTopic(topic)) return 1;
	if(!once){
		storage.get(topic).listeners.add(listener);
		return 0;
	}
	storage.get(topic).listeners.add(listenerOnce(listener));
	return 0;
}
export const sub= subscribe;
function listenerOnce(listener){ return function listenerOnce(value){ listener(value); unsubscribe(topic, listenerOnce); }; }
function isListener(listener){
	const type= typeof listener;
	if(type==="function") return true;
	if(type!=="object") return false;
	if(!Reflect.has(listener, "handleEvent")) return false;
	return typeof listener.handleEvent === "function";
}
export function unsubscribe(topic, listener){
	if(isInactiveTopic(topic)) return 1;
	return storage.get(topic).listeners.delete(listener) ? 0 : 2;
}
export const unsub= unsubscribe;
export function unsubscribeAll(topic){
	if(isInactiveTopic(topic)) return 1;
	storage.get(topic).listeners= new Set();
	return 0;
}

export function has(topic, listener){
	if(isInactiveTopic(topic)) return false;
	return storage.get(topic).listeners.has(listener);
}
