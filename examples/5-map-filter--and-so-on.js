import { topic, publish, subscribe } from '../lib/esm.js';

(function specialTopic(){
	const { publishExample, subscribeExample }= onexample();
	subscribeExample(console.log);
	publishExample("test 1");
	publishExample("skip");

	function onexample(options){
		/** @type {fpubsubTopic<string>} */
		const onexample= topic(options);
		return {
			publishExample(value){
				if(value==="skip") return 3;
				publish(onexample, "Map: "+value);
			},
			subscribeExample: subscribe(onexample)
		};
	}
})();
(function specialPublish(){
	const onexample= topic();
	subscribe(onexample, console.log);
	publishNonSkip(onexample, "skip");
	publishNonSkip(onexample, "test 2");

	function publishNonSkip(topic, value, options){
		if(value==="skip") return 3;
		return publish(topic, "Map: "+value, options);
	}
})();
