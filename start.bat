@echo off
mode con cols=0 lines=0
start \il2\il2server.exe
ping 8.8.8.8 -n 20 > .temp
.\bin\node.exe il2cp.js start