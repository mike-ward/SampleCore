@echo off

echo.
echo ##########################################
echo ###      Restore Nuget Packages        ###
echo ##########################################
echo.

nuget restore SampleCore.sln
if ERRORLEVEL 1 goto END

echo.
echo ##########################################
echo ###        Install NPM Packages        ###
echo ##########################################
echo.

pushd SampleCore\src\js
call npm install
popd
if ERRORLEVEL 1 goto END

echo.
echo ##########################################
echo ###      Build JavaScript Assets       ###
echo ##########################################
echo.

pushd SampleCore\src\js
call npm run build
popd
if ERRORLEVEL 1 goto END

echo.
echo ##########################################
echo ###   Build ASP.NET Core Application   ###
echo ##########################################
echo.

msbuild SampleCore.sln /t:Clean;Rebuild "/p:configuration=Release;platform=Any CPU" /verbosity:minimal
