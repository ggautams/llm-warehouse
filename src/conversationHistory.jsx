export default function ConversationHistory({questions, onLoadRecentConversation}) {
    const historicalQuestions = JSON.parse(questions).map(q=><li className="py-1 truncate"><a href="#" className="text-blue-500 hover:text-blue-700 transition duration-300">{q}</a></li>);
    return (
        <div className="w-1/5 border border-gray-300 p-1">
            <ul className="hover:text-blue-700 transition duration-300" onClick={onLoadRecentConversation}>
                {historicalQuestions}
            </ul>
        </div>
    );
}