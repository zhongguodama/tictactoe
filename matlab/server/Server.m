classdef Server < WebSocketServer
    %ECHOSERVER Summary of this class goes here
    %   Detailed explanation goes here
    
    methods (Static)
        
        function [gridStatus, row, col] = decode(message)
            gridStatus = ([message(1:3);message(4:6);message(7:9)]);
            row = str2double(message(10))+1;
            col = str2double(message(11))+1;
        end
        
        function result = checkWin(gridStatus, row, col)
            result = 'false';
            if gridStatus(row,1) == gridStatus(row,2) && gridStatus(row,2) == gridStatus(row,3)
                result = 'true';
            end
            
            if gridStatus(1,col) == gridStatus(2,col) && gridStatus(2,col) == gridStatus(3,col)
                result = 'true';
            end
            
            if row == col && gridStatus(1,1) == gridStatus(2,2) && gridStatus(2,2) == gridStatus(3,3)
                result = 'true';
            end
            
            if row + col == 4 && gridStatus(1,3) == gridStatus(2,2) && gridStatus(2,2) == gridStatus(3,1)
                result = 'true';
            end
        end
    end
    
    methods
        function obj = Server(varargin)
            %Constructor
            obj@WebSocketServer(varargin{:});
        end
    end
    
    methods (Access = protected)
        function onOpen(obj,conn,message)
            fprintf('%s\n',message)
        end
        
        function onTextMessage(obj,conn,message)
            [gridStatus, row, col] = Server.decode(message);
            isPlayerWin = Server.checkWin(gridStatus, row, col);
            conn.send(isPlayerWin);
        end
        
        function onBinaryMessage(obj,conn,bytearray)
            % This function sends an echo back to the client
            conn.send(bytearray); % Echo
        end
        
        function onError(obj,conn,message)
            fprintf('%s\n',message)
        end
        
        function onClose(obj,conn,message)
            fprintf('%s\n',message)
        end
    end
    
    
end   
