
export type PageProps = {
    title?: string;
    children: React.ReactNode;
};

export const Page = ({ title, children }: PageProps) => {
    return (
        <div className="bg-gray-700 rounded-md">
            {title ? (
                <h2 className="text-center text-white py-6">{title}</h2>
            ) : <></>}
            <div className={(title ? "" : "py-10 ") + "px-4 pb-6"}>
                {children}
            </div>
        </div>
    );
};