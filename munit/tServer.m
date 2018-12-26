classdef tServer < matlab.unittest.TestCase
    % To run this test:
    %     runtests tServer
    methods(Test)
        function testCheckWin(testCase)
            gridStatus = [1,1,1;0,0,0;2,2,0];
            row = 1;
            col = 1;
            expected = 'true';
            actual = Server.checkWin(gridStatus, row, col);
            testCase.verifyEqual(actual, expected, ...
                'checkWinner did not return expected result.');
        end
    end
end