@echo off

echo.
echo ##########################################
echo ###          Restore Packages          ###
echo ##########################################
echo.

nuget restore SampleCore.sln
if ERRORLEVEL 1 goto END

echo.
echo ##########################################
echo ###        Install NPM Packages        ###
echo ##########################################
echo.

pushd SampleCore\wwwroot\js
call npm install
popd
if ERRORLEVEL 1 goto END

echo.
echo ##########################################
echo ###   Build ASP.NET Core Application   ###
echo ##########################################
echo.

msbuild SampleCore.sln /t:Clean;Rebuild "/p:configuration=Release;platform=Any CPU" /verbosity:minimal
