import { CommonProps } from '@shtcut-ui/react';
import { SideLink } from '@shtcut/_shared/data/side-links';

interface NavProps extends CommonProps, React.HtmlHTMLAttributes<HTMLDivElement> {
    isCollapsed: boolean;
    links: SideLink[];
    closeNav: () => void;
}

interface NavLinkProps extends SideLink {
    subLink?: boolean;
    closeNav: () => void;
}


export const Nav = ({ links, isCollapsed, className, closeNav, ...props }: NavProps) => {
    
    const renderLink = ({sub, ...rest}: SideLink) => {
        const key = `${rest.title}-${rest.href}`;
        if (isCollapsed && sub) {
            return (
                <>
                </>
            )
        }
    }
};


const NavLinkIconDropDown = ({}: NavLinkProps) => {
       
}