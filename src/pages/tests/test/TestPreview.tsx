import React, {useCallback, useEffect, useRef} from 'react';

interface TestPreviewProps {
    userCode: string;
    onConsoleMessage: (message: string) => void;
    onClearConsole: () => void;
    onError: (error: string) => void;
    styles: Record<string, string>;
}

export const TestPreview = React.memo(({
    userCode,
    onConsoleMessage,
    onClearConsole,
    onError,
    styles
}: TestPreviewProps) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const getFullCode = useCallback((code: string) => {
        const hasAppComponent =
            /(function|const|class)\s+App\s*[({]/.test(code) ||
            /export\s+(default\s+)?(function|const|class)\s+App\s*[({]/.test(code);

        const defaultApp = `function App() { 
            return (
                <div style={{ padding: '20px', color: 'red' }}>
                    Компонент App не найден. Создан компонент по умолчанию.
                </div>
            ); 
        }`;

        return `
            window.React = React;
            window.ReactDOM = ReactDOM;
            
            ${!hasAppComponent ? defaultApp : ''}
            ${code}
            
            if (typeof App === 'undefined' && typeof module !== 'undefined' && module.exports) {
                window.App = module.exports;
                if (module.exports.default) {
                    window.App = module.exports.default;
                }
            }

            try {
                const root = ReactDOM.createRoot(document.getElementById('root'));
                root.render(React.createElement(App));
            } catch (error) {
                console.error(error);
            }
        `;
    }, []);

    const updateIframe = useCallback((code: string) => {
        if (!iframeRef.current) return;

        const iframe = iframeRef.current;
        const timeoutId = setTimeout(() => {
            const iframeDoc = iframe.contentDocument;
            if (!iframeDoc) return;

            iframeDoc.open();
            iframeDoc.writeln(`
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <script>
                        var process = { env: { NODE_ENV: 'development' } };
                    </script>
                    <script src='https://unpkg.com/react@18/umd/react.development.js' crossorigin></script>
                    <script src='https://unpkg.com/react-dom@18/umd/react-dom.development.js' crossorigin></script>
                    <script src='https://unpkg.com/@babel/standalone/babel.min.js'></script>
                    <style>
                        body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
                        #root { width: 100vw; height: 100vh; background: #fff; }
                    </style>
                </head>
                <body>
                    <div id="root"></div>
                    <script type="text/babel" data-type="module" data-presets="react">
                        ${getFullCode(code)}
                    </script>
                </body>
                </html>
            `);
            iframeDoc.close();
        }, 150);

        return () => clearTimeout(timeoutId);
    }, [getFullCode]);

    useEffect(() => {
        return updateIframe(userCode);
    }, [userCode, updateIframe]);

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (!event.data?.type) return;

            switch (event.data.type) {
                case 'clear':
                    onClearConsole();
                    break;
                case 'console':
                    onConsoleMessage(event.data.data);
                    break;
                case 'error':
                    onError(event.data.data);
                    break;
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [onClearConsole, onConsoleMessage, onError]);

    return (
        <iframe
            ref={iframeRef}
            title="code-preview"
            sandbox="allow-scripts allow-same-origin"
            className={`${styles.iframe}`}
        />
    );
});