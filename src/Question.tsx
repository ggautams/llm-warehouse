import {SingleStrArgFunction, VoidCallbackFunction} from "./userTypes.ts";
import React from "react";

export default function QuestionBox({questionContent, onQuestionClick, onQuestionChange}:
{questionContent: string, onQuestionClick: VoidCallbackFunction, onQuestionChange: SingleStrArgFunction}) {
    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        onQuestionChange(evt.target.value);
    }

    const handleEnterButton = (evt: React.KeyboardEvent) => {
        if (evt.key === "Enter") {
            onQuestionClick();
        }
    }

    return (
        <div
            className="flex inset-y-0 h-20 items-center justify-center w-3/5 m-3 p-3 relative rounded-md border border-gray-300 bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-opacity-50">
            <input
                type="text"
                value={questionContent}
                className="block w-full pl-10 pr-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Type your Question!"
                onChange={handleChange}
                onKeyDown={handleEnterButton}
            />
            <div className="absolute bottom-4 right-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onQuestionClick}>
                    Ask!
                </button>
            </div>
        </div>
    );
}