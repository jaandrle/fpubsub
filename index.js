/** @type {WeakMap<fpubsubTopic, { listeners?: Set<function>, data?: any }>} */
const storage= new WeakMap();
export function topic(options= {}){
	const topic= Object.assign({ origin: null }, options);
	storage.set(topic, { listeners: new Set() });
	return topic;
}
const AbortController= globalThis && globalThis.AbortController ? globalThis.AbortController : class ignore{};
export function topicFrom(candidate, options){
	if(candidate === AbortController)
		candidate= new AbortController();
	if(candidate instanceof AbortController)
		return topicFromAbort(candidate);
	
	if(isTopic(candidate)){
		const t= topic(candidate);
		t.origin= candidate;
		subscribe(candidate, data=> publish(t, data));
		return t;
	}

	if("[object AsyncGeneratorFunction]"===Object.prototype.toString.call(candidate)){
		const t= topic(options);
		t.origin= candidate;
		(async ()=> {
			for await(const data of candidate())
				publish(t, data);
			erase(t);
		})();
		return t;
	}
	
	throw new Error(`The '${candidate}' cannot be converted to a \`topic\`.`);
}
export function erase(topic){ storage.delete(topic); }
function isTopic(candidate){ return storage.has(candidate); }
function isInactiveTopic(topic){
	if(isTopic(topic)){
		if(storage.get(topic).listeners) return 0;
		if(topic.once) return 1;
		//TODO: another options?
	}
	const topic_str= JSON.stringify(topic);
	throw new TypeError(`Given topic '${topic_str}' is not supported. Topic are created via 'topic' function.`);
}
export function info(topic){
	let is_topic= true, is_live= false;
	try{ is_live= isInactiveTopic(topic)===0; }
	catch(_){ is_topic= false; }
	return Object.freeze({
		is_topic, is_live,
		get data(){
			if(!is_topic || !topic.cached) return;
			return storage.get(topic).data;
		}
	});
}
function topicFromAbort(origin){
	const options= topic({ once: true, origin });
	const onabort= publish.bind(null, origin, 0);
	const onclose= ()=> (origin.signal.removeEventListener("abort", onabort), origin.abort());
	origin.signal.addEventListener("abort", onabort);
	subscribe(options, onclose);
	return options;
}

export async function publish(topic, data){
	if(isInactiveTopic(topic)) return 1;
	data= toOutData(topic, data);
	let promises= [];
	storage.get(topic).listeners.forEach(function(f){
		const p= f(data, topic);
		if(p instanceof Promise) promises.push(p);
	});
	if(promises.length) await Promise.all(promises);
	if(topic.cached) storage.get(topic).data= data;
	if(topic.once) storage.get(topic).listeners= undefined;
	return 0;
}
export const pub= publish;
function toOutData({ mapper }, data){ return mapper ? mapper(data) : data; }

export function subscribe(topic, listener, { once= false }= {}){
	if(typeof listener!=="function") return l=> subscribe(topic, l, listener);
	if(topic.cached) listener(storage.get(topic).data, topic);
	
	if(isInactiveTopic(topic)) return 1;
	if(!once){
		storage.get(topic).listeners.add(listener);
		return 0;
	}
	storage.get(topic).listeners.add(listenerOnce(listener));
	return 0;
}
export const sub= subscribe;
function listenerOnce(listener){ return function listenerOnce(data){ listener(data); unsubscribe(topic, listenerOnce); }; }
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
