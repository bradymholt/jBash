declare const cd : typeof process.chdir;
declare const echo : typeof console.log;
declare const exit : typeof process.exit;
declare const env : typeof process.env;

declare const args : string[];
declare const $0 : string;
declare const $1 : string;
declare const $2 : string;
declare const $3 : string;
declare const $4 : string;
declare const $5 : string;
declare const $6 : string;
declare const $7 : string;
declare const $8 : string;
declare const $9 : string;
declare const $10 : string;

declare function set(opt:"+x"|"-x"|"+e"|"-e"): void;
declare function readFile(path:string, encoding?:string) : void;
declare function writeFile(path:string, contents:string, encoding?:string): void;

declare function $(cmd: string): string;
declare function exec(cmd: string): null;
declare const eval : typeof exec;