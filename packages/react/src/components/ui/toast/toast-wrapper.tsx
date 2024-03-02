'use client';

import * as React from 'react';

type NodeProps = React.DetailedReactHTMLElement<any, HTMLDivElement>;

type Message = {
  key: string;
  visible: boolean;
  node: NodeProps;
};

const useMessages = (msgKey: string) => {
  const [messages, setMessages] = React.useState<Message[]>([]);

  const getKey = React.useCallback(
    (key: string) => {
      if (typeof key === 'undefined' && messages.length) {
        key = messages[messages.length - 1].key;
      }
      return key;
    },
    [messages],
  );

  const push = React.useCallback(
    (message: NodeProps) => {
      const key = msgKey || '_' + Math.random().toString(36).substr(2, 12);
      setMessages([...messages, { key, visible: true, node: message }]);
      return key;
    },
    [messages, msgKey],
  );

  const removeAll = React.useCallback(() => {
    setMessages(messages.map((msg) => ({ ...msg, visible: false})));
    setTimeout(() => {
        setMessages([]);
    }, 50)
  }, [messages]);

  const remove = React.useCallback(() => {

  }, [messages, getKey]);
};
