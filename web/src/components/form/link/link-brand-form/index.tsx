import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Input,
    Label,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from '@shtcut-ui/react';
import { LayoutBody } from '@shtcut/components/_shared/Layout';

export const LinkBrandForm = () => {
    return (
        <Tabs orientation="vertical" defaultValue="overview" className="space-y-4 overflow-y-auto overflow-scroll">
            <div className="w-full overflow-x-scroll pb-2">
                <TabsList>
                    <TabsTrigger value="overview">QR Code</TabsTrigger>
                    <TabsTrigger value="utm-builder">UTM Builder</TabsTrigger>
                    <TabsTrigger value="password-protect">Password Protection</TabsTrigger>
                    <TabsTrigger value="expiration-date">Expiration Date</TabsTrigger>
                    <TabsTrigger value="ios-targeting">iOS Targeting</TabsTrigger>
                    <TabsTrigger value="android-targeting">Android Targeting</TabsTrigger>
                    <TabsTrigger value="notifications">Geo Targeting</TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="overview" className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Account</CardTitle>
                        <CardDescription>
                            Make changes to your account here. Click save when you`re done.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" defaultValue="Pedro Duarte" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" defaultValue="@peduarte" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save changes</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    );
};
