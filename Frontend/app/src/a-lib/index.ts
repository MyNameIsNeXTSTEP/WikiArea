import { useEffect } from "react";

export const debounce = (fn: Function, delay: number) => {
    let timeout: NodeJS.Timeout;
    return function () {
        const fnCall = () => fn.apply(this, arguments);
        clearTimeout(timeout);
        timeout = setTimeout(fnCall, delay)
    }
};

type Props = {
  [key in keyof WindowEventMap]?: EventListenerOrEventListenerObject;
};

export default function useGlobalDOMEvents(props: Props) {
  useEffect(() => {
    for (let [key, func] of Object.entries(props)) {
      window.addEventListener(key, func, false);
    }
    return () => {
      for (let [key, func] of Object.entries(props)) {
        window.removeEventListener(key, func, false);
      }
    };
  }, []);
}