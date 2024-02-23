import { Button, Card, Dict, Input } from '@shtcut-ui/react';
import { Logo, NavLink } from '@shtcut/components';

type UpdatePasswordFormProps = {
    updatePasswordResponse?: Dict;
    handleUpdatePasswordSubmit?: (payload: Dict) => void;
};

export const UpdatePasswordForm = (props: UpdatePasswordFormProps) => {
    const { updatePasswordResponse, handleUpdatePasswordSubmit } = props;
    return (
        <Card className=" block w-full bg-white border-b border-gray-200 p-4 py-6 sm:p-6 sm:rounded-lg text-gray-600 space-y-8">
            <div className="text-center">
                <NavLink href="/">
                    <Logo width={150} className="mx-auto" />
                </NavLink>
                <div className="mt-5 space-y-2 w-full mx-auto md:w-1/2">
                    <h3 className="text-gray-800 text-2xl font-poppins font-bold sm:text-3xl">Forgot Password</h3>
                    <p className="font-poppins font-thin items-center">
                        Set the new password for your account so you can login and access all features.
                    </p>
                </div>
            </div>
            <form className="space-y-5 w-[96] mx-auto md:w-2/3 items-center">
                <div>
                    <label className="font-normal">Enter new password</label>
                    <Input
                        type="password"
                        placeholder="Your new password"
                        required
                        className="w-full mt-2 h-12 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-blue-600 shadow-sm rounded-lg"
                    />
                </div>
                <div>
                    <label className="font-normal">Confirm password</label>
                    <Input
                        type="password"
                        placeholder="Confirm new password"
                        required
                        className="w-full mt-2 h-12 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-blue-600 shadow-sm rounded-lg"
                    />
                </div>
                <Button className="w-full h-12 px-4 py-2 text-white font-medium bg-blue-600 hover:bg-blue-500 active:bg-blue-600 rounded-lg duration-150">
                    Update Password
                </Button>
            </form>
            <div className="relative w-3/5 mx-auto" />
            <div className="grid grid-cols-4 w-full sm:w-64 mx-auto gap-x-4" />
        </Card>
    );
};
