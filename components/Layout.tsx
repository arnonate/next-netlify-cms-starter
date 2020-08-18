import Head from "next/head";
import Header from "@components/Header";

type LayoutProps = {
  children: React.ReactNode;
  pageTitle: string;
};

const Layout = ({
  children,
  pageTitle = "Page Title",
}: Readonly<LayoutProps>) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{pageTitle}</title>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>

      <section className="layout">
        <Header />
        <div className="content">{children}</div>
      </section>

      <footer>&copy; {new Date().getFullYear()} Champions of Commerce</footer>
    </>
  );
};

export default Layout;
