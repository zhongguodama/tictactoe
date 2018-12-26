function tictactoe()
% Create a tictactoe server and listen to port number 10001
Server(10001);
port = connector.securePort;
url = sprintf('https://localhost:%d/toolbox/matlab/appdesigner/web/qian_matlab/tictactoe.html', port);
ww = matlab.internal.webwindow(url);
ww.show()
end