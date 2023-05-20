import {act} from 'react-dom/test-utils'
import {fireEvent} from "@testing-library/react";

export default async function resolveAwaitingPromises() {
    await act(async () => {
        await new Promise(process.nextTick)
    })
}

export const asyncClick = (target: HTMLElement) => act(async () => {
    fireEvent.click(target);
    await resolveAwaitingPromises()
})