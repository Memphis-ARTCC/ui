
type ContainerProps = {
    children: React.ReactNode;
    className?: string;
};

export const Container = ({ children, className }: ContainerProps) => {
    return (
        <div className={`mx-[18%] ${className ?? ""}`}>
            {children}
        </div>
    );
};