import React, {FC} from 'react';
import Editor from '@monaco-editor/react';
import {createHighlighter} from "shiki";
import {shikiToMonaco} from "@shikijs/monaco";

interface CodeEditorProps {
    value: string;
    onChange: (value: string) => void;
    language?: string;
}

const highlighter = await createHighlighter({
    themes: [
        'vitesse-dark',
    ],
    langs: [
        'jsx'
    ],
});

const CodeEditor: FC<CodeEditorProps> = ({
    value,
    onChange,
    language = 'typescript'
}) => {

    return (
        <div className="monaco-editor" style={{height: '100%', width: "100%"}}>
            <Editor
                height="100%"
                width="100%"
                language={language}
                theme="vitesse-dark"
                value={value}
                onChange={newValue => onChange(newValue || '')}
                options={{
                    automaticLayout: true,
                    fontSize: 14,
                    lineHeight: 18,
                    fontFamily: 'Consolas, monospace',
                    fontLigatures: true,
                    quickSuggestions: false,
                    suggestOnTriggerCharacters: false,
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
                    acceptSuggestionOnEnter: "off",
                    tabSize: 2,
                    insertSpaces: true,
                    wordWrap: 'on',
                    folding: true,
                    foldingStrategy: 'indentation',
                    showFoldingControls: 'always',
                    matchBrackets: 'always',
                }}
                beforeMount={(monaco) => {
                    shikiToMonaco(highlighter, monaco)

                    monaco.languages.register({ id: 'jsx' })

                    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
                        target: monaco.languages.typescript.ScriptTarget.Latest,
                        allowNonTsExtensions: true,
                        moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
                        module: monaco.languages.typescript.ModuleKind.CommonJS,
                        noEmit: true,
                        esModuleInterop: true,
                        jsx: monaco.languages.typescript.JsxEmit.React,
                        reactNamespace: "React",
                        allowJs: true,
                        typeRoots: ["node_modules/@types"],
                    });

                    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
                        noSemanticValidation: false,
                        noSyntaxValidation: false,
                    });

                    monaco.languages.typescript.typescriptDefaults.addExtraLib(
                        'https://cdn.jsdelivr.net/npm/@types/react@16.9.41/index.d.ts.',
                        `file:///node_modules/@react/types/index.d.ts`
                    );
                }}
            />
        </div>
    );
};

export default CodeEditor;