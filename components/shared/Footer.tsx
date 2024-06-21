import Link from "next/link";

export const Footer = () => {
    return (
        <div className="w-full h-20 bg-gray-700">
            <div className="flex items-center justify-center h-full">
                <div className="text-center text-white align-middle">
                    <span>&copy; 2024 Memphis ARTCC</span>
                    <span className="text-center mx-2">•</span>
                    <Link href="/privacy" className="text-decoration-none text-center text-white">
                        <span>Privacy Policy</span>
                    </Link>
                    <span className="text-center mx-2">•</span>
                    <span>
                        Open source on
                        <a href="https://github.com/Memphis-ARTCC" className="text-decoration-none text-white" target="_blank">
                            <span className="font-bold"> GitHub</span>
                        </a>
                    </span>
                </div>
            </div>
        </div>
    );
};