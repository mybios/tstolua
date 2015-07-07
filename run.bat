@echo off
cd F:\circlechat\typescriptForLua\TypeScript-lua
node "F:\circlechat\typescriptForLua\TypeScript-lua\built\local\tsc.js" --module commonjs --sourceMap %1.ts

E:\MyWork\TqGame\trunk\tools\wscite\luajit.exe %1.lua
