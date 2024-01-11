import React from 'react';

interface IProps {
  fontSans?: string;
}

export function CssBaseLine({ fontSans }: IProps) {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `${
          !fontSans
            ? "@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;500;700&display=swap');\n\n"
            : ''
        }:root {\n --font-sans: ${fontSans || 'Manrope'}\n}`,
      }}
    />
  );
}
