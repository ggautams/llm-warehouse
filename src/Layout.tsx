import SimpleNavigation from "./SimpleNavigation";
import QuestionBox from "./Question";
import Answer from "./Answer";
import ConversationHistory from "./ConversationHistory";
import React, {useEffect, useState} from "react";
import {ConversationStoreType, ConversationType} from "./userTypes.ts";

export default function Layout() {
    const [currentModel, setCurrentModel] = useState("Not selected at the moment!");
    const [conversation, setConversation] = useState<ConversationType>([]);
    const [question, setQuestion] = useState<string>("");
    const [repository, setRepository] = useState<ConversationStoreType>({}) // todo: should be fetched from the API
    useEffect(() => {
        if (conversation.length > 0) {
            const updatedConversation = {[conversation[0][0]]: conversation};
            setRepository(prevState => ({...prevState, ...updatedConversation}))
        }
    }, [conversation]);
    const onQuestionChange = (q:string) => {
        setQuestion(q);
    }
    const onStartNewConversation = () => {
        setConversation([]);
        setQuestion("");
    }
    const onLoadRecentConversation = (evt: React.MouseEvent<HTMLAnchorElement>) => {
        const eventTarget = evt.target as HTMLAnchorElement;
        console.log(eventTarget);
        setConversation(repository[eventTarget.innerHTML]);
    }
    const onQuestionClick = () => {
        let context = null;
        if (conversation.length > 0) {
            context = conversation[conversation.length-1][2]
        }
        setQuestion("");
        if (question.replace(/^\s+|\s+$/gm, '') !== '') {
            if (currentModel) {
                const body = {model: currentModel, prompt: question, stream: false, context:context};
                fetch(`${import.meta.env.VITE_REACT_APP_OLLAMA_HOST}/api/generate`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                })
                    .then(response => response.json())
                    .then((response) => setConversation(prev => [...prev, [question, response.response, response.context]]))
                    .catch((error) => console.error('Error:', error));
            }
        }
    }
    const onModelSelection = (modelName:string) => {
        setCurrentModel(modelName);
        const body = {model: modelName, prompt: ""};
        fetch(`${import.meta.env.VITE_REACT_APP_OLLAMA_HOST}/api/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .catch((error) => console.error('Error:', error));
    };
    return (
        <div className="flex h-screen flex-col">
            <SimpleNavigation currentModel={currentModel} onModelSelection={onModelSelection} onStartNewConversation={onStartNewConversation}/>
            <div className="flex h-screen flex-row">
                <ConversationHistory questions={JSON.stringify(Object.keys(repository))} onLoadRecentConversation={onLoadRecentConversation}/>
                <main className="flex flex-1 flex-col items-center justify-center w-4/5">
                    <Answer content={JSON.stringify(conversation)}/>
                    <QuestionBox onQuestionClick={onQuestionClick} onQuestionChange={onQuestionChange} questionContent={question}/>
                </main>
            </div>
        </div>
    )
}