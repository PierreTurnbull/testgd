// import { EventBus } from "../../utils/eventBus/eventBus";

// type TTestEvents = [
// 	{
// 		key:     "payload",
// 		payload: number
// 	},
// 	{
// 		key:      "callback",
// 		callback: (test: number) => void
// 	},
// 	{
// 		key:      "payload+callback",
// 		payload:  number
// 		callback: (test: number) => void
// 	},
// 	{
// 		key: "nothing",
// 	}
// ]

// const testBus = new EventBus<TTestEvents>();

// testBus.emit("unknown");

// testBus.emit("payload");
// testBus.emit("payload", {});
// testBus.emit("payload", { payload: 1 });
// testBus.emit("payload", { payload: "1" });
// testBus.emit("payload", { callback: (test: number) => {console.log(test);} });
// testBus.emit("payload", { callback: (test: string) => {console.log(test);} });
// testBus.emit("payload", { callback: () => {console.log();} });
// testBus.emit("payload", { payload: 1, callback: (test: number) => {console.log(test);} });
// testBus.emit("payload", { payload: 1, callback: (test: string) => {console.log(test);} });
// testBus.emit("payload", { payload: 1, callback: () => {console.log();} });

// testBus.emit("callback");
// testBus.emit("callback", {});
// testBus.emit("callback", { payload: 1 });
// testBus.emit("callback", { payload: "1" });
// testBus.emit("callback", { callback: (test: number) => {console.log(test);} });
// testBus.emit("callback", { callback: (test: string) => {console.log(test);} });
// testBus.emit("callback", { callback: () => {console.log();} });
// testBus.emit("callback", { payload: 1, callback: (test: number) => {console.log(test);} });
// testBus.emit("callback", { payload: 1, callback: (test: string) => {console.log(test);} });
// testBus.emit("callback", { payload: 1, callback: () => {console.log();} });

// testBus.emit("payload+callback");
// testBus.emit("payload+callback", {});
// testBus.emit("payload+callback", { payload: 1 });
// testBus.emit("payload+callback", { payload: "1" });
// testBus.emit("payload+callback", { callback: (test: number) => {console.log(test);} });
// testBus.emit("payload+callback", { callback: (test: string) => {console.log(test);} });
// testBus.emit("payload+callback", { callback: () => {console.log();} });
// testBus.emit("payload+callback", { payload: 1, callback: (test: number) => {console.log(test);} });
// testBus.emit("payload+callback", { payload: 1, callback: (test: string) => {console.log(test);} });
// testBus.emit("payload+callback", { payload: 1, callback: () => {console.log();} });

// testBus.emit("nothing");
// testBus.emit("nothing", {});
// testBus.emit("nothing", { payload: 1 });
// testBus.emit("nothing", { payload: "1" });
// testBus.emit("nothing", { callback: (test: number) => {console.log(test);} });
// testBus.emit("nothing", { callback: (test: string) => {console.log(test);} });
// testBus.emit("nothing", { callback: () => {console.log();} });
// testBus.emit("nothing", { payload: 1, callback: (test: number) => {console.log(test);} });
// testBus.emit("nothing", { payload: 1, callback: (test: string) => {console.log(test);} });
// testBus.emit("nothing", { payload: 1, callback: () => {console.log();} });