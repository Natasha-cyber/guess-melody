import { RefObject, useEffect } from 'react';

export const useElementListener = (
    element: RefObject<HTMLElement>,
    eventName: string,
    listener: (evt: Event) => void
) => {
    useEffect(() => {
        const domElement = element.current;

        if (!domElement) {
            return;
        }

        domElement.addEventListener(eventName, listener)

        return () => {
            domElement.removeEventListener(eventName, listener)
        }
    }, [element, eventName, listener])
}