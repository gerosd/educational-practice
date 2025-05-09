import React, {FC} from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
    value: string;
    onChange: (value: string) => void;
    language?: string;
}

const CodeEditor: FC<CodeEditorProps> = ({
    value,
    onChange,
    language = 'javascript'
}) => {
    return (
        <div className="monaco-editor" style={{height: '100%', width: "100%"}}>
            <Editor
                height="100%"
                width="100%"
                language={language}
                theme="vs-dark"
                value={value}
                onChange={newValue => onChange(newValue || '')}
                options={{
                    automaticLayout: true,
                    fontSize: 14,
                    lineHeight: 18,
                    fontFamily: 'Consolas, monospace',
                    fontLigatures: true,
                    bracketPairColorization: {
                        enabled: true,
                        independentColorPoolPerBracketType: true
                    },
                    guides: {
                        indentation: true,
                        highlightActiveIndentation: true
                    },
                    autoClosingBrackets: 'always',
                    autoClosingQuotes: 'always',
                    autoIndent: 'full',
                    formatOnPaste: true,
                    formatOnType: true,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    renderWhitespace: 'selection',
                    renderLineHighlight: 'all',
                    roundedSelection: false,
                    cursorStyle: 'line-thin',
                    cursorBlinking: 'phase',
                    quickSuggestions: false,
                    suggestOnTriggerCharacters: false,
                    acceptSuggestionOnEnter: "off",
                }}
            />
        </div>
    )
}

export default CodeEditor;