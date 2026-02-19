import React from 'react';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    backgroundImage?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    subtitle,
    backgroundImage = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1920'
}) => {
    return (
        <div className="relative bg-slate-900 text-white py-24 sm:py-32 overflow-hidden">
            <div className="absolute inset-0">
                <img
                    src={backgroundImage}
                    alt="Background"
                    className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
            </div>
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
                    {title}
                </h1>
                {subtitle && (
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300">
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    );
};

export default PageHeader;
