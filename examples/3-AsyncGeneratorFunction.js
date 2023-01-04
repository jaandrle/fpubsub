import { topicFrom, subscribe } from '../index.js';

const onloop= topicFrom(async function*(){
	const sleep= ()=> new Promise(r=> setTimeout(r, 150));
	let i= 0;
	while(i<5){
		await sleep();
		yield;
		i+= 1;
	}
});
subscribe(onloop, console.log);
