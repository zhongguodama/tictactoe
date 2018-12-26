classdef tDecodePerformance < matlab.perftest.TestCase
    % To run this test:
    %     res = runperf('tDecodePerformance.m')
    methods(Test)
        function testDecode(testCase)
            testCase.startMeasuring();
            for ii = 1:10000
                Server.decode('10101010101');
            end
            testCase.stopMeasuring();
        end
    end
end