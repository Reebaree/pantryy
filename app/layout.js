export const metadata = {
  title: 'Pantry Tracker',
  description: 'Managing the pantry store',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="shortcut icon" href="https://www.svgrepo.com/show/449636/boxes.svg" type="image/x-icon" />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
