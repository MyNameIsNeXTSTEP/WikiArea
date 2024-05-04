import { useEffect } from "react";

export type TFormRequest = Record<string, any>

export const scrollTo = (hash: string) => {
  location.hash = "#" + hash;
} 

export const useFormSubmitHandler = () => (e: React.FormEvent<HTMLFormElement>): TFormRequest => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    let collectedFormFields = {} as TFormRequest;
    formData.forEach((value, property: string) => {
        collectedFormFields[property] = value;
    });
    return collectedFormFields;
}; 

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

// @refactor
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
    created_at: string,
};

export type imageForFormReq = {
  imgBuffToSave: string | ArrayBuffer,
  imgName: string,
  type: string,
};

export type IProjectModule = {
  projectId: number,
  text: string,
};

export interface IModule {
    id?: number,
    title?: string,
    exercise?: string,
    project_id?: number,
    material_id?: number,
    test_id?: number,
}

export type TFileForReq = {
    buffToSave: string | ArrayBuffer | null,
    name: string,
    type: string,
};

export type TMenuButton = {
    id: number,
    onClick?: () => void,
    src?: string,
    props?: Record<string, string | number | boolean>,
    label?: string,
};