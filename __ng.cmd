@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"   --max-old-space-size=10240   "%~dp0\..\@angular\cli\bin\ng" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  --max-old-space-size=10240 "%~dp0\..\@angular\cli\bin\ng" %*
)