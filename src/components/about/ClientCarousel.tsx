

const clientLogos = [
    { name: "Pato Bragado", file: " Pato Bragado - Pr.png" },
    { name: "Câmara Municipal de Boa Esperança do Iguaçu", file: "Câmara Municipal de Boa Esperança do Iguaçu - PR.png" },
    { name: "Câmara Municipal de Céu Azul", file: "Câmara Municipal de Céu Azul - PR.png" },
    { name: "Câmara Municipal de Terra Boa", file: "Câmara Municipal de Terra Boa - PR.png" },
    { name: "Câmara Municipal de Terra Roxa", file: "Câmara Municipal de Terra Roxa - PR.png" },
    { name: "IPM Sistemas", file: "IPM Sistemas.svg" },
    { name: "Maripa", file: "Maripa - PR.png" },
    { name: "Nova Santa Rosa", file: "Nova Santa Rosa - PR.png" },
    { name: "Prefeitura Municipal de Marechal Cândido Rondon", file: "Prefeitura Municipal de Marechal Cândido Rondon - PR.png" },
    { name: "Terra Rocha", file: "Terra Rocha - PR.png" },
    { name: "Terra boa", file: "Terra boa - Pr.png" },
    { name: "Tumapansi", file: "Tumapansi - Pr.png" },
    { name: "Assis Chateaubriand", file: "brasao_assischateaubriand.png" }
];

const ClientCarousel = () => {
    return (
        <section className="py-20 bg-slate-50 overflow-hidden">
            <div className="container mx-auto px-4 text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Municípios e Parceiros Atendidos</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">
                    Instituições que confiam em nosso conhecimento técnico para impulsionar a eficiência e transparência na gestão pública.
                </p>
            </div>

            {/* Slider container with infinite scroll animation */}
            <div className="relative w-full flex overflow-x-hidden group">
                <div className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused] py-4">
                    {/* First set of logos */}
                    {clientLogos.map((client, idx) => (
                        <div key={`logo-1-${idx}`} className="flex-none mx-8 w-40 h-40 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center p-6 transform transition-transform hover:scale-105 hover:shadow-md">
                            <img
                                src={`/assets/logos/clients/${client.file}`}
                                alt={`Logo ${client.name}`}
                                className="max-w-full max-h-full object-contain mix-blend-multiply drop-shadow-sm filter grayscale hover:grayscale-0 transition-all duration-300"
                            />
                        </div>
                    ))}
                    {/* Duplicate set for seamless continuous scroll */}
                    {clientLogos.map((client, idx) => (
                        <div key={`logo-2-${idx}`} className="flex-none mx-8 w-40 h-40 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center p-6 transform transition-transform hover:scale-105 hover:shadow-md">
                            <img
                                src={`/assets/logos/clients/${client.file}`}
                                alt={`Logo ${client.name}`}
                                className="max-w-full max-h-full object-contain mix-blend-multiply drop-shadow-sm filter grayscale hover:grayscale-0 transition-all duration-300"
                            />
                        </div>
                    ))}
                </div>
            </div>
            {/* Added custom CSS for marquee directly as tailwind arbitrary values could be complex for this */}
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 40s linear infinite;
                    width: max-content;
                }
            `}</style>
        </section>
    );
};

export default ClientCarousel;
