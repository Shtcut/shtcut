import * as React from 'react';
import Image from 'next/image';
import { IconAlertCircle } from '@tabler/icons-react';
import { Input, Label } from '@shtcut-ui/react';
import { AppButton } from '@shtcut/components';

export default function ComingSoon() {
  return (
    <>
      <section className="w-screen h-dvh grid bg-gray-100 grids-cols-1 md:grid-cols-2 gap-6">
        <div className="md:h-full h-80 bg-white relative overflow-hidden">
          <Image
            src="/analytics-2.png"
            alt="Analytics Image"
            fill
            className="object-contain mt-8 md:mt-10 px-10"
          />
        </div>
        <main className="flex flex-col gap-8 mt-8 justify-center px-6 pb-10">
          <h1 className="font-semibold tracking-tight text-zinc-900 text-3xl leading-tight md:text-4xl max-w-lg">
            Join Shtcut - Secure your spot on our marketing tool!
          </h1>
          <p className="text-gray-500">Join the wait list to be notified when our app is available!</p>
          <form className="mt-2 max-w-sm">
            <div className="flex flex-col gap-2 lg:flex-row">
              <Label className="sr-only" htmlFor="email-address">
                Email address
              </Label>
              <Input
                autoComplete="email"
                className="bg-chalk text-accent-500 block h-10 w-full appearance-none rounded-lg border border-zinc-300 px-4 py-2 placeholder-zinc-400 duration-200 focus:border-zinc-300 focus:outline-none focus:ring-zinc-300 sm:text-sm"
                id="email-address"
                name="email"
                placeholder="johndoe@exemple.com"
                required
                type="email"
              />
              <AppButton
                className="flex h-10 shrink-0 items-center justify-center gap-1 rounded-lg bg-[#000F2D] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-zinc-700"
                type="submit"
              >
                <span>Join the waitlist</span>
              </AppButton>
            </div>
          </form>

          <div className="flex items-start gap-2 text-gray-500">
            <IconAlertCircle />
            <p className="text-xs -mt-[0.5] max-w-sm">
              No worries! your data is completely safe and will only be utilized to provide you with
              updates about our product.
            </p>
          </div>
        </main>
      </section>
    </>
  );
}