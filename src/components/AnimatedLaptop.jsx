import React, { useState, useEffect } from 'react';

const AnimatedLaptop = () => {
    const [visibleLines, setVisibleLines] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    
    const codeLines = [
        "import React from 'react';",
        "function App() {",
        "  const [movies, setMovies] = useState([]);",
        "  useEffect(() => {",
        "    fetchMovies();",
        "  }, []);",
        "",
        "  return (",
        "    <div className=\"movie-finder\">",
        "      <h1>Movie Finder</h1>",
        "      <SearchBar onSearch={handleSearch} />",
        "      <MovieList movies={movies} />",
        "    </div>",
        "  );",
        "}",
        "export default App;"
    ];

    // Handle typing animation
    useEffect(() => {
        if (visibleLines < codeLines.length) {
            const timer = setTimeout(() => {
                setVisibleLines(prev => prev + 1);
            }, 150);
            return () => clearTimeout(timer);
        }
    }, [visibleLines, codeLines.length]);

    // Reset and restart typing animation
    useEffect(() => {
        const interval = setInterval(() => {
            setVisibleLines(0);
        }, (codeLines.length * 150) + 3000);
        return () => clearInterval(interval);
    }, [codeLines.length]);

    // Handle entry animation
    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="relative w-full h-full flex items-center justify-center bg-[#050014] p-8 overflow-hidden">
            {/* Background gradient */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/10 to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-blue-900/20 to-transparent rounded-full blur-3xl"></div>
            
            {/* Laptop Component */}
            <div className={`transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} relative w-full max-w-md mx-auto`}>
                {/* Laptop shadow */}
                <div className="absolute -bottom-8 left-0 right-0 h-32 blur-xl z-0">
                    <div className="w-full h-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full transform skew-y-6 opacity-60 animate-shadow-pulse"></div>
                </div>
                
                {/* Laptop with rotation effect */}
                <div className="relative transform rotate-6 hover:rotate-0 transition-transform duration-500">
                    {/* Laptop Body */}
                    <div className="bg-gray-800 rounded-lg p-2 pb-10 relative z-10 shadow-2xl shadow-blue-500/2">
                        {/* Screen */}
                        <div className="bg-gray-900 rounded overflow-hidden aspect-video relative
                            after:absolute after:inset-0 after:border after:border-blue-500/10 after:pointer-events-none
                            before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-500/5 before:via-transparent before:to-purple-500/5">
                            
                            {/* Code Editor Interface */}
                            <div className="absolute inset-0 bg-gray-950 p-3">
                                <div className="flex gap-2 mb-3">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <div className="font-mono text-xs overflow-hidden h-full">
                                    {codeLines.slice(0, visibleLines).map((line, i) => (
                                        <div key={i} className="mb-1">
                                            <span className="text-gray-500 mr-3">{i + 1}</span>
                                            {line.includes('import') && (
                                                <>
                                                    <span className="text-cyan-400">{line.split(' ')[0]}</span>
                                                    <span className="text-blue-400">{' ' + line.split(' ')[1]}</span>
                                                    <span className="text-white">{' ' + line.split(' ').slice(2).join(' ')}</span>
                                                </>
                                            )}

                                            {line.includes('function') && (
                                                <>
                                                    <span className="text-purple-400">function </span>
                                                    <span className="text-yellow-300">App</span>
                                                    <span className="text-white">() { }</span>
                                                </>
                                            )}

                                            {line.includes('const') && (
                                                <>
                                                    <span className="text-purple-400">const </span>
                                                    <span className="text-blue-300">[movies, setMovies]</span>
                                                    <span className="text-white"> = </span>
                                                    <span className="text-yellow-300">useState</span>
                                                    <span className="text-white">([]);</span>
                                                </>
                                            )}

                                            {line.includes('useEffect') && !line.includes('}, [])') && (
                                                <>
                                                    <span className="text-purple-400">useEffect</span>
                                                    <span className="text-white">() {'{'}</span>
                                                </>
                                            )}

                                            {line.includes('fetchMovies') && (
                                                <>
                                                    <span className="text-white ml-4">fetchMovies();</span>
                                                </>
                                            )}

                                            {line.includes('}, [])') && (
                                                <>
                                                    <span className="text-white">{'}, [])'}</span>
                                                </>
                                            )}

                                            {line.includes('return') && (
                                                <>
                                                    <span className="text-purple-400 ml-2">return </span>
                                                    <span className="text-white">{'('}</span>
                                                </>
                                            )}

                                            {line.includes('<div className=') && (
                                                <>
                                                    <span className="text-white ml-4">&lt;</span>
                                                    <span className="text-pink-400">div </span>
                                                    <span className="text-purple-400">className</span>
                                                    <span className="text-white">=</span>
                                                    <span className="text-green-300">"movie-finder"</span>
                                                    <span className="text-white">&gt;</span>
                                                </>
                                            )}

                                            {line.includes('<h1>') && (
                                                <>
                                                    <span className="text-white ml-6">&lt;</span>
                                                    <span className="text-pink-400">h1</span>
                                                    <span className="text-white">&gt;</span>
                                                    <span className="text-white">Movie Finder</span>
                                                    <span className="text-white">&lt;/</span>
                                                    <span className="text-pink-400">h1</span>
                                                    <span className="text-white">&gt;</span>
                                                </>
                                            )}

                                            {line.includes('<SearchBar') && (
                                                <>
                                                    <span className="text-white ml-6">&lt;</span>
                                                    <span className="text-pink-400">SearchBar </span>
                                                    <span className="text-purple-400">onSearch</span>
                                                    <span className="text-white">=</span>
                                                    <span className="text-yellow-300">{'{'}</span><span className="text-white">handleSearch</span><span className="text-yellow-300">{'}'}</span>
                                                    <span className="text-white"> /&gt;</span>
                                                </>
                                            )}

                                            {line.includes('<MovieList') && (
                                                <>
                                                    <span className="text-white ml-6">&lt;</span>
                                                    <span className="text-pink-400">MovieList </span>
                                                    <span className="text-purple-400">movies</span>
                                                    <span className="text-white">=</span>
                                                    <span className="text-yellow-300">{'{'}</span><span className="text-white">movies</span><span className="text-yellow-300">{'}'}</span>
                                                    <span className="text-white"> /&gt;</span>
                                                </>
                                            )}

                                            {line.includes('</div>') && (
                                                <>
                                                    <span className="text-white ml-4">&lt;/</span>
                                                    <span className="text-pink-400">div</span>
                                                    <span className="text-white">&gt;</span>
                                                </>
                                            )}

                                            {line.includes('  );') && (
                                                <>
                                                    <span className="text-white ml-2">{');'}</span>
                                                </>
                                            )}

                                            {line === '}' && (
                                                <>
                                                    <span className="text-white">{'}'}</span>
                                                </>
                                            )}

                                            {line.includes('export default') && (
                                                <>
                                                    <span className="text-purple-400">export default </span>
                                                    <span className="text-yellow-300">App</span>
                                                    <span className="text-white">;</span>
                                                </>
                                            )}

                                            {line === '' && (
                                                <span>&nbsp;</span>
                                            )}
                                        </div>
                                    ))}
                                    <div className="inline-block h-4 w-2 bg-white opacity-75 animate-pulse"></div>
                                </div>
                            </div>
                        </div>

                        {/* Laptop Bottom Edge */}
                        <div className="bg-gradient-to-b from-gray-700 to-gray-800 h-3 rounded-b-lg mx-auto w-4/5 relative z-0 
                            shadow-[0_15px_35px_rgba(59,130,246,0.3)]">
                            <div className="absolute inset-x-0 bottom-full h-px bg-gray-600/50"></div>
                        </div>
                    </div>
                </div>
                
                {/* Code particles floating around */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {Array.from({ length: 15 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute text-xs opacity-20 font-mono"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                transform: 'rotate(15deg)',
                                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                                color: ['#38bdf8', '#818cf8', '#c084fc', '#fb7185', '#34d399'][i % 5]
                            }}
                        >
                            {['<>', '/>', '{}', '()', '[]', '&&', '||', '=>', '++', '==='][i % 10]}
                        </div>
                    ))}
                </div>
            </div>
            
            {/* CSS animations */}
            <style jsx>{`
                @keyframes float {
                    0% { transform: translate(0, 0) rotate(0deg); }
                    25% { transform: translate(10px, 10px) rotate(5deg); }
                    50% { transform: translate(15px, 5px) rotate(15deg); }
                    75% { transform: translate(5px, 15px) rotate(5deg); }
                    100% { transform: translate(0, 0) rotate(0deg); }
                }
                @keyframes shadow-pulse {
                    0% { opacity: 0.6; transform: scale(1) skew-y-6; }
                    50% { opacity: 0.3; transform: scale(1.05) skew-y-6; }
                    100% { opacity: 0.6; transform: scale(1) skew-y-6; }
                }
            `}</style>
        </div>
    );
};

export default AnimatedLaptop;