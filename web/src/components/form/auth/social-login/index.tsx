import { CommonProps } from "@shtcut-ui/react";
import { AppButton } from "@shtcut/components";
import { IconBrandGithub, IconBrandGmail, IconBrandTwitter, IconBrandFacebook } from "@tabler/icons-react";

interface SocialLoginProps extends CommonProps {
    isLoading: boolean;
}

export const SocialLogin = ({ isLoading, ...props}: SocialLoginProps) => {
    return (
        <div className="flex items-center gap-2">
            <AppButton variant="outline" className="w-full" type="button" loading={isLoading}>
                <IconBrandGithub className="h-4 w-4" />
            </AppButton>
            <AppButton variant="outline" className="w-full" type="button" loading={isLoading}>
                <IconBrandGmail className="h-4 w-4" />
            </AppButton>
            <AppButton variant="outline" className="w-full" type="button" loading={isLoading}>
                <IconBrandTwitter className="h-4 w-4" />
            </AppButton>
            <AppButton variant="outline" className="w-full" type="button" loading={isLoading}>
                <IconBrandFacebook className="h-4 w-4" />
            </AppButton>
        </div>
    );
};
