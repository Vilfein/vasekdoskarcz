export const courses = [
    {
        slug: 'csharp-zaklady',
        icon: '💠',
        title: 'C# Základy',
        description: 'Solidní základ v jazyce C# – od syntaxe po práci se soubory a výjimkami.',
        longDescription: 'Naučte se programovat v C# od úplných základů. Projdeme syntaxi jazyka, datové typy, řízení toku a základní struktury tak, aby vám dávaly smysl – s praktickými příklady od první lekce.',
        level: 'Začátečník',
        duration: '20 hodin',
        price: '2 900 Kč',
        topics: [
            'Proměnné & datové typy',
            'Podmínky & smyčky',
            'Pole & kolekce',
            'Metody & parametry',
            'Ošetření výjimek',
            'Práce se soubory'
        ],
        prerequisites: [
            'Počítač s Windows (ideálně), macOS nebo Linux',
            'Základní ovládání počítače',
            'Žádné předchozí programování není potřeba'
        ],
        curriculum: [
            {
                section: 'Prostředí & první program',
                lessons: [
                    'Instalace .NET SDK a Visual Studio / VS Code',
                    'Struktura C# projektu a konzolová aplikace',
                    'Hello, World! – jak C# přemýšlí'
                ]
            },
            {
                section: 'Základy jazyka',
                lessons: [
                    'Proměnné, konstanty, datové typy',
                    'Operátory a výrazy',
                    'Podmínky: if / else / switch',
                    'Smyčky: for, while, foreach'
                ]
            },
            {
                section: 'Kolekce & metody',
                lessons: [
                    'Pole a vícerozměrná pole',
                    'List<T>, Dictionary<K,V>',
                    'Definice a volání metod',
                    'Parametry, přetěžování, rekurze'
                ]
            },
            {
                section: 'Robustní kód',
                lessons: [
                    'Try / catch / finally',
                    'Vlastní výjimky',
                    'Čtení a zápis souborů (StreamReader/Writer)',
                    'Ladění v debuggeru'
                ]
            }
        ],
        project: {
            title: 'Závěrečný projekt: správce úkolů',
            description: 'Napíšeš konzolovou aplikaci, která umožní přidávat, označovat a mazat úkoly. Data se ukládají do souboru, takže přežijí restart programu.'
        }
    },
    {
        slug: 'csharp-oop',
        icon: '🔷',
        title: 'C# Objektově orientované programování',
        description: 'Třídy, dědičnost, rozhraní, LINQ a async/await – OOP v C# do hloubky.',
        longDescription: 'Přejdete od procedurálního stylu k objektově orientovanému myšlení. Pochopíte, proč se OOP používá, jak navrhovat čisté třídy a jak využívat moderní C# funkce jako LINQ nebo async/await.',
        level: 'Mírně pokročilý',
        duration: '18 hodin',
        price: '2 700 Kč',
        topics: [
            'Třídy & objekty',
            'Dědičnost & polymorfismus',
            'Rozhraní & abstrakce',
            'Generika',
            'LINQ',
            'Lambda & delegáty'
        ],
        prerequisites: [
            'Znalost C# na úrovni kurzu C# Základy',
            'Základní orientace v konzolových aplikacích'
        ],
        curriculum: [
            {
                section: 'Třídy & objekty',
                lessons: [
                    'Třída vs. objekt, konstruktory',
                    'Vlastnosti (properties) a metody',
                    'Přístupové modifikátory',
                    'Statické členy'
                ]
            },
            {
                section: 'Dědičnost & polymorfismus',
                lessons: [
                    'Dědičnost a klíčové slovo base',
                    'Virtual, override, sealed',
                    'Abstraktní třídy',
                    'Rozhraní (interface) a jejich implementace'
                ]
            },
            {
                section: 'Moderní C#',
                lessons: [
                    'Generické třídy a metody',
                    'LINQ – dotazování nad kolekcemi',
                    'Lambda výrazy a delegáty',
                    'Events a vlastní delegáty'
                ]
            }
        ],
        project: {
            title: 'Závěrečný projekt: knihovna knih',
            description: 'Navrhneš a implementuješ systém pro správu knihovny – třídy Kniha, Autor, Výpůjčka. Použiješ dědičnost, rozhraní a LINQ pro filtrování a řazení sbírky.'
        }
    },
    {
        slug: 'async-programovani',
        icon: '⚡',
        title: 'Vlákna, Tasky a asynchronní programování',
        description: 'Thread, Task, async/await, paralelismus a synchronizační primitiva v C#.',
        longDescription: 'Pochopíte, jak C# pracuje s vlákny a proč vznikl model async/await. Naučíte se psát responzivní a výkonné aplikace, správně rušit operace přes CancellationToken a vyhnout se klasickým pastem jako deadlock nebo race condition.',
        level: 'Pokročilý',
        duration: '16 hodin',
        price: '2 500 Kč',
        topics: [
            'Thread & ThreadPool',
            'Task & Task<T>',
            'async / await',
            'CancellationToken',
            'Parallel & PLINQ',
            'Synchronizační primitiva'
        ],
        prerequisites: [
            'Znalost C# OOP (třídy, rozhraní, generika)',
            'Orientace v lambda výrazech a delegátech'
        ],
        curriculum: [
            {
                section: 'Vlákna a ThreadPool',
                lessons: [
                    'Co je vlákno a proč na tom záleží',
                    'Třída Thread – vytvoření, spuštění, join',
                    'ThreadPool a jeho výhody',
                    'Problémy: race condition, deadlock'
                ]
            },
            {
                section: 'Task-based Asynchronous Pattern',
                lessons: [
                    'Task a Task<T> – vytvoření a spuštění',
                    'async / await – principy a pravidla',
                    'ConfigureAwait a synchronizační kontext',
                    'Zpracování výjimek v asynchronním kódu'
                ]
            },
            {
                section: 'Řízení a rušení operací',
                lessons: [
                    'CancellationToken a CancellationTokenSource',
                    'Progress<T> – hlášení průběhu',
                    'Task.WhenAll, Task.WhenAny',
                    'Timeout a kombinování tokenů'
                ]
            },
            {
                section: 'Paralelismus & synchronizace',
                lessons: [
                    'Parallel.For a Parallel.ForEach',
                    'PLINQ – paralelní LINQ dotazy',
                    'lock, Monitor, Mutex, Semaphore',
                    'Concurrent kolekce (ConcurrentQueue, ConcurrentDictionary)'
                ]
            }
        ],
        project: {
            title: 'Závěrečný projekt: paralelní stahovač souborů',
            description: 'Napíšeš aplikaci, která stahuje seznam souborů paralelně, hlásí průběh, umožňuje operaci zrušit a zobrazí souhrn výsledků. Použiješ Task, async/await, CancellationToken a Progress<T>.'
        }
    },
    {
        slug: 'aspnet-core',
        icon: '🌐',
        title: 'ASP.NET Core',
        description: 'Webové aplikace a REST API s ASP.NET Core, Entity Framework a autentizací.',
        longDescription: 'Naučte se stavět produkční webové aplikace a REST API pomocí ASP.NET Core. Od MVC architektury přes Entity Framework Core až po zabezpečení pomocí JWT a nasazení na server.',
        level: 'Pokročilý',
        duration: '24 hodin',
        price: '3 600 Kč',
        topics: [
            'MVC architektura',
            'Routing & middleware',
            'Entity Framework Core',
            'REST API & OpenAPI',
            'JWT autentizace',
            'Deployment'
        ],
        prerequisites: [
            'Plynná znalost C# (OOP, async/await)',
            'Základy SQL a relačních databází',
            'Orientace v HTTP protokolu výhodou'
        ],
        curriculum: [
            {
                section: 'Základy ASP.NET Core',
                lessons: [
                    'Architektura frameworku a request pipeline',
                    'Routing a kontrolery',
                    'Middleware a dependency injection',
                    'Konfigurace a environment'
                ]
            },
            {
                section: 'Databáze s EF Core',
                lessons: [
                    'Code-First přístup a migrace',
                    'DbContext a DbSet',
                    'Relace: 1:N, M:N',
                    'Dotazování s LINQ a lazy loading'
                ]
            },
            {
                section: 'REST API',
                lessons: [
                    'Návrh REST endpointů',
                    'DTO a AutoMapper',
                    'Validace vstupů',
                    'Dokumentace s OpenAPI / Swagger'
                ]
            },
            {
                section: 'Bezpečnost & nasazení',
                lessons: [
                    'Autentizace a autorizace s JWT',
                    'Role a policy-based access',
                    'Publikace na Linux server (nginx + systemd)',
                    'Základy CI/CD s GitHub Actions'
                ]
            }
        ],
        project: {
            title: 'Závěrečný projekt: REST API pro e-shop',
            description: 'Postavíš plnohodnotné REST API pro jednoduchý e-shop – produkty, objednávky, uživatelé s rolemi. API bude zdokumentováno přes Swagger a nasazeno na testovací server.'
        }
    },
    {
        slug: 'fullstack',
        icon: '🚀',
        title: 'Fullstack: ASP.NET Core & React',
        description: 'Kompletní fullstack aplikace – .NET backend, React frontend, Docker a CI/CD.',
        longDescription: 'Propojíte ASP.NET Core backend s moderním React frontendem do jedné produkční aplikace. Naučíte se, jak obě části komunikují přes API, jak spravovat stav na frontendu a jak celé řešení zabalit do Dockeru a automatizovat nasazení.',
        level: 'Pokročilý',
        duration: '32 hodin',
        price: '4 900 Kč',
        topics: [
            'ASP.NET Core API',
            'React & TypeScript',
            'JWT autentizace E2E',
            'EF Core & PostgreSQL',
            'Docker & docker-compose',
            'CI/CD GitHub Actions'
        ],
        prerequisites: [
            'Absolvování kurzu ASP.NET Core nebo srovnatelná praxe',
            'Základy JavaScriptu (ideálně React)',
            'Orientace v příkazové řádce'
        ],
        curriculum: [
            {
                section: 'Architektura fullstack projektu',
                lessons: [
                    'Monorepo vs. oddělené repozitáře',
                    'Komunikace frontend ↔ backend přes REST',
                    'CORS a sdílení typů (OpenAPI → TypeScript)'
                ]
            },
            {
                section: 'Backend – ASP.NET Core API',
                lessons: [
                    'Clean architecture a vrstvená struktura',
                    'EF Core s PostgreSQL',
                    'JWT autentizace a refresh tokeny',
                    'Testování API (xUnit, Testcontainers)'
                ]
            },
            {
                section: 'Frontend – React & TypeScript',
                lessons: [
                    'Projekt s Vite + TypeScript',
                    'React Query pro serverový stav',
                    'Formuláře s React Hook Form & Zod',
                    'Chráněné routy a auth kontext'
                ]
            },
            {
                section: 'DevOps & nasazení',
                lessons: [
                    'Dockerfile pro .NET a React',
                    'Docker Compose pro lokální vývoj',
                    'GitHub Actions: build, test, deploy',
                    'Nasazení na VPS (nginx reverse proxy)'
                ]
            }
        ],
        project: {
            title: 'Závěrečný projekt: fullstack task manager',
            description: 'Postavíš kompletní aplikaci pro správu projektů a úkolů – .NET API, React SPA, PostgreSQL, autentizace s JWT, zabaleno v Dockeru a automaticky nasazované přes GitHub Actions.'
        }
    }
];

export function getCourse(slug) {
    return courses.find(c => c.slug === slug) ?? null;
}
