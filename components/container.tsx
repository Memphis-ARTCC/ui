
type ContainerProps = {
    children: React.ReactNode;
    className?: string;
};

export const Container = ({ children, className }: ContainerProps) => {
    return (
        <div className={`mx-[15%] ${className ?? ""}`}>
            {children}
        </div>
    );
};