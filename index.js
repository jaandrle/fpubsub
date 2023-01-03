const meta= "meta";
const Topic= {};
export const isTopic= candidate=> Object.getPrototypeOf(candidate) === Topic;
export function topic(options= {}){
	if(isTopic(options)){
		options= Object.assign({}, options);
		Reflect.deleteProperty(options, meta);
	}
	const topic= Object.assign(Object.create(Topic), { origin: Topic }, options);
	topic[meta]= { listeners: new Set() };
	return topic;
}
const AbortController= globalThis && globalThis.AbortController ? globalThis.AbortController : class ignore{};
export function topicFrom(candidate){
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
	
	throw new Error(`The '${candidate}' cannot be converted to a \`topic\`.`);
}
function testTopic(topic){
	if(isTopic(topic)){
		if(topic[meta].listeners) return 0;
		if(topic.once) return 1;
	}
	const topic_str= JSON.stringify(topic);
	throw new TypeError(`Given topic '${topic_str}' is not supported. Topic are created via 'topic' function.`);
}
function topicFromAbort(origin){
	const options= topic({ once: true, origin });
	const onabort= publish.bind(null, origin, 0);
	const onclose= ()=> (origin.signal.removeEventListener("abort", onabort), origin.abort());
	origin.signal.addEventListener("abort", onabort);
	subscribe(options, onclose);
	return options;
}
// TODO?
// function topicFromInterval(interval, options= {}){
// 	const t= topic(options);
// 	const id= setInterval(publish.bind(null, t), interval);
// 	subscribeClose(t, clearInterval.bind(null, id));
// 	return t;
// }

export async function publish(topic, data){
	if(testTopic(topic)) return 1;
	data= toOutData(topic, data);
	let promises= [];
	topic[meta].listeners.forEach(function(f){
		const p= f(data, topic);
		if(p instanceof Promise) promises.push(p);
	});
	if(promises.length) await Promise.all(promises);
	if(topic.cached) topic[meta].data= data;
	if(topic.once) topic[meta].listeners= undefined;
	return 0;
}
export const pub= publish;

export function subscribe(topic, listener, { once= false }= {}){
	if(typeof listener!=="function") return l=> subscribe(topic, l, listener);
	if(topic.cached) listener(topic[meta].data, topic);
	const out= unsubscribe.bind(null, topic, listener);
	
	if(testTopic(topic)) return out;
	if(!once){
		topic[meta].listeners.add(listener);
		return out;
	}
	topic[meta].listeners.add(listenerOnce(listener));
	return out;
}
export const sub= subscribe;
export function unsubscribe(topic, listener){
	return topic[meta].listeners ? topic[meta].listeners.delete(listener) : undefined;
}
export const unsub= unsubscribe;
function listenerOnce(listener){
	return function listenerOnce(data){ listener(data); unsubscribe(topic, listenerOnce); };
}

function toOutData({ mapper }, data){
	if(mapper) data= mapper(data);
	return data;
}
