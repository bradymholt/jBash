#!/usr/bin/env node
// jsbash
_p=process,args=_p.argv.slice(2),cd=_p.chdir,exit=_p.exit,env=_p.env,echo=console.log,_e="utf-8",_fs=require("fs"),readFile=((e,i=_e)=>_fs.readFileSync(e,{encoding:i})),writeFile=((e,i,r=_e)=>{_fs.writeFileSync(e,i,{encoding:r})}),$$=((e,i)=>(r=require("child_process").execSync(e,{stdio:i?"inherit":"pipe"}),r?r.toString().replace(/\n$/,""):null)),$=(e=>$(e,!0));

