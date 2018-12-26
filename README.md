# tictactoe
tictactoe game web app
# Run the program in MATLAB
* download repository and place /qian_matlab under matlabroot/toolbox/matlab/appdesigner/web
* in MATLAB `>>edit(fullfile(prefdir,'javaclasspath.txt'))` and add qian_matlab/java/matlab-websocket-1.4.jar to path
* add qian_matlab/matlab and its subfolders to path
* in MATLAB `>> tictactoe`
# Program structure
* Server side written in MATLAB
* Client side run in MATLAB webwindow (CEF window) and written in HTML, CSS and JS
* Server and client communicate via websocket. (MATLAB websocket from this [library](https://github.com/jebej/MatlabWebSocket))
* Example tests: QUnit, FuncUnit, MatlabUnit, Matlab Performance. Selenium test is under development
