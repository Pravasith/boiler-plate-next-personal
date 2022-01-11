import Head from "next/head";
import { META_CONSTANTS } from "../lib/constants";

const Meta = () => (
    <Head>
        <title>{META_CONSTANTS.title}</title>

        <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
        />

        <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
        />

        <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
        />

        <link rel="manifest" href="/favicon/site.webmanifest" />

        <link
            rel="mask-icon"
            href="/favicon/safari-pinned-tab.svg"
            color="#000000"
        />

        <link rel="shortcut icon" href="/favicon/favicon.ico" />

        <meta name="msapplication-TileColor" content="#000000" />

        <meta
            name="msapplication-config"
            content="/favicon/browserconfig.xml"
        />

        <meta name="theme-color" content="#000" />

        <meta name="description" content={`.`} />
        <meta property="og:image" content={META_CONSTANTS.previewImage} />

        <meta
            name="twitter:card"
            content={META_CONSTANTS.description}
            key="twcard"
        />

        <meta
            name="twitter:title"
            content={META_CONSTANTS.title}
            key="twtitle"
        />

        <meta
            name="twitter:description"
            content={META_CONSTANTS.description}
            key="twdesc"
        />

        <meta name="twitter:creator" content="@Pravasith" key="twcreator" />

        <meta
            name="twitter:image"
            content={META_CONSTANTS.previewImage}
            key="twimg"
        />

        {/* Open Graph */}
        <meta
            property="og:url"
            content={META_CONSTANTS.currentURL}
            key="ogurl"
        />

        <meta
            property="og:image"
            content={META_CONSTANTS.previewImage}
            key="ogimage"
        />

        <meta
            property="og:site_name"
            content={META_CONSTANTS.name}
            key="ogsitename"
        />

        <meta property="og:title" content={META_CONSTANTS.name} key="ogtitle" />

        <meta
            property="og:description"
            content={META_CONSTANTS.description}
            key="ogdesc"
        />
    </Head>
);

export default Meta;