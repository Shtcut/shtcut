import { CommonProps } from '@shtcut-ui/react';
import { LayoutHeader, TopNav } from '@shtcut/components';
import Sidebar from '@shtcut/components/_shared/SideBar';
import { useIsCollapsed } from '@shtcut/hooks/useCollapsed';
import { ReactNode } from 'react';

interface WorkspaceLayoutProps extends CommonProps {
    header?: ReactNode | ReactNode[];
}

const WorkspaceLayout = ({ children, header }: WorkspaceLayoutProps) => {
    const [isCollapsed, setIsCollapsed] = useIsCollapsed();
    return (
        <div className="relative h-full overflow-hidden bg-background">
            <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            <main
                id="content"
                className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${
                    isCollapsed ? 'md:ml-14' : 'md:ml-64'
                } h-full`}
            >
                {header ? (
                    header
                ) : (
                    <LayoutHeader>
                        <div className="ml-auto flex items-center space-x-4">{/* todo search */}</div>
                    </LayoutHeader>
                )}
                {children}
            </main>
        </div>
    );
};

export default WorkspaceLayout;
