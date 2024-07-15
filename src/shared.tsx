const CodeFormatter = ({rawString}: {rawString: string}) => {
    return (
        <div>
            <code className="inline-block p-1 bg-gray-100 rounded-md text-gray-700 font-mono m-2">
            <pre>
                <code>
                    {rawString}
            </code>
            </pre>
            </code>
            </div>
    );
}

export function formatTextToHtml(inString: string) {
    // inString = inString.replace(/(`)([^`]+)(`)/g, (match, p1, p2, p3) => {
    //     return `${p1}<strong>${p2}</strong>${p3}`;
    // });
    const codeBlocks = inString.split("```");
    const chunked = codeBlocks.map((block, index) => {
        if (index % 2 === 1) {
            return <CodeFormatter key={index} rawString={block}></CodeFormatter>;
        } else {
            //return <p key={index}>{block}</p>;
            block = block.replace(/ /g, '&nbsp;').replace(/\n/g, '<br>');
            return <p dangerouslySetInnerHTML={{__html: block}}/>
        }
    });
    return <div>{chunked}</div>;
}