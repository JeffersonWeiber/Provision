import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50 text-center">
                    <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
                        <h1 className="text-2xl font-bold text-slate-900 mb-4">Ops! Algo deu errado.</h1>
                        <p className="text-slate-600 mb-6">
                            Ocorreu um erro inesperado na aplicação. Por favor, tente recarregar a página.
                        </p>
                        <div className="bg-red-50 p-4 rounded-lg mb-6 text-left overflow-auto max-h-40">
                            <p className="text-xs font-mono text-red-700">
                                {this.state.error?.toString()}
                            </p>
                        </div>
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full bg-brand-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-brand-700 transition-colors"
                        >
                            Recarregar Página
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
