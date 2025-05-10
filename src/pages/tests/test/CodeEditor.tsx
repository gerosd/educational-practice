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
                    quickSuggestions: true,
                    suggestOnTriggerCharacters: true,
                    acceptSuggestionOnEnter: "on",
                    tabSize: 2,
                    insertSpaces: true,
                    wordWrap: 'on',
                    folding: true,
                    foldingStrategy: 'indentation',
                    showFoldingControls: 'always',
                    matchBrackets: 'always'
                }}
                beforeMount={(monaco) => {
                    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
                        target: monaco.languages.typescript.ScriptTarget.ESNext,
                        allowNonTsExtensions: true,
                        moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
                        module: monaco.languages.typescript.ModuleKind.ESNext,
                        noEmit: true,
                        esModuleInterop: true,
                        jsx: monaco.languages.typescript.JsxEmit.React,
                        reactNamespace: 'React',
                        allowJs: true,
                        typeRoots: ['node_modules/@types']
                    });
                }}
            />
        </div>
    );
};

export default CodeEditor;