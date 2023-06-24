import React, { createContext, useEffect, useRef, useState } from "react";

export const WebsocketContext = createContext(false, null, () => {});

export const WebsocketProvider = ({ children }) => {
    const [isReady, setIsReady] = useState(false);
    const [val, setVal] = useState(null);
  
    const ws = useRef(null);
  
    useEffect(() => {

      const IP = "___";

      const socket = new WebSocket("ws://" + IP + ":8080");
  
      socket.onopen = () => setIsReady(true);
      socket.onclose = () => setIsReady(false);
      socket.onmessage = (event) => setVal(event.data);
  
      ws.current = socket;
  
      return () => {
        socket.close();
      };
    }, []);

    function clearVal(){
      setVal(null);
    }
  
    const ret = [isReady, val, ws.current?.send.bind(ws.current), clearVal];
  
    return (
      <WebsocketContext.Provider value={ret}>
        {children}
      </WebsocketContext.Provider>
    );
  };