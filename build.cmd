@echo off

echo.
echo ##########################################
echo ###        Install NPM Packages        ###
echo ##########################################
echo.

pushd SampleCore\app\js
call npm install
popd
if ERRORLEVEL 1 goto END

echo.
echo ##########################################
echo ###   Build ASP.NET Core Application   ###
echo ##########################################
echo.

msbuild SampleCore.sln /t:Clean;Rebuild "/p:configuration=Release;platform=Any CPU" /verbosity:minimal
