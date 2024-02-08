import {convertToHTML} from "./service";
import {formatTextToHtml} from "./shared";

export default function Answer({content}) {
    const parseContent = JSON.parse(content);
    const formattedContent = parseContent.map(item => {
        return (
            <div>
                <div className="border border-gray-30 rounded-xl p-3 bg-gray-200 font-mono"
                     dangerouslySetInnerHTML={{__html: convertToHTML(item[0])}}/>
                <br/>
                <div className="p-2 m-2 font-serif break-words">{formatTextToHtml(item[1])}</div>
            </div>
        );
    });
    return (
        <div className="w-3/5 h-4/5 border border-gray-300 p-4 rounded-2xl overflow-y-auto bg-gray-50">
            {formattedContent}
        </div>
    );
}
