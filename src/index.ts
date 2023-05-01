import { useEffect } from 'react';

declare global {
  interface Window {
    zE?: (...args: any[]) => void;
    zEInit?: () => void;
    zESettings?: Record<string, unknown>;
  }
}

const canUseDOM = !(typeof window === 'undefined' || !window.document || !window.document.createElement);

export const zendeskApi = (...args: any[]): void => {
  if (canUseDOM && window.zE) {
    window.zE.apply(null, args);
  } else {
    console.warn('Zendesk has not been initialized yet!');
  }
};

interface ZendeskProps {
  defer?: boolean;
  disabled?: boolean;
  initCallback?: () => void;
  zendeskKey: string;
  zendeskSettings?: Record<string, unknown>;
}

export const Zendesk = ({ defer, disabled, initCallback, zendeskKey, zendeskSettings = {} }: ZendeskProps) => {
  useEffect(() => {
    if (disabled || !zendeskKey) return;

    const onScriptLoaded = () => {
      window.zEInit?.();
    };

    const insertScript = () => {
      const script = document.createElement('script');
      if (defer) {
        script.defer = true;
      } else {
        script.async = true;
      }
      script.id = 'ze-snippet';
      script.src = `https://static.zdassets.com/ekr/snippet.js?key=${zendeskKey}`;
      script.addEventListener('load', onScriptLoaded);
      document.body.appendChild(script);
    };

    if (canUseDOM && !window.zE) {
      window.zEInit = initCallback;
      window.zESettings = zendeskSettings;
      insertScript();
    }

    return () => {
      if (!canUseDOM || !window.zE) return;
      delete window.zE;
      delete window.zEInit;
      delete window.zESettings;
    };
  }, [defer, disabled, initCallback, zendeskKey, zendeskSettings]);

  return null;
};

export default Zendesk;
