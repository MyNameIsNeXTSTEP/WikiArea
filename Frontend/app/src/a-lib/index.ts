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
};

export enum EUserRoles {
  teacher = 'teachers',
  student = 'students',
  admin = 'admins'
};


export const complexityMapStrings = {
  'лёгкий': 1,
  'средний': 2,
  'сложный': 3
}

export const complexityMapNumbers = {
  'лёгкий': 1,
  'средний': 2,
  'сложный': 3
}

export interface IProjectDetails {
    isOpen: boolean,
    project?: IProject,
}

export interface IProject {
    id: number,
    author: string,
    title: string,
    topic: string,
    complexity: string,
    lifetime: string,
    description: string,
}