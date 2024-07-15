import {VoidReactMouseToAnchorEventHandler} from "./userTypes.ts";

export default function ConversationHistory(
    {questions, onLoadRecentConversation}: {questions: string, onLoadRecentConversation: VoidReactMouseToAnchorEventHandler}) {
    const historicalQuestions = JSON.parse(questions)
        .map((q:string)=>
            <li className="py-1 truncate">
                <a href="#"
                   className="inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300 ease-in-out"
                   onClick={onLoadRecentConversation}>
                    {q}
                </a>
            </li>
        );
    return (
        <div className="w-1/5 border border-gray-300 p-1">
            <ul className="hover:text-blue-700 transition duration-300">
                {historicalQuestions}
            </ul>
        </div>
    );
}