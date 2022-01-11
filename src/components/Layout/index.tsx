import React, {
    useEffect,
    useRef,
    useContext,
    useState,
    ReactElement,
    JSXElementConstructor,
} from "react";

import styles from "./layout.module.scss";
import utilStyles from "@assets/sass/utils.module.scss";

import Meta from "./meta";
import { useRouter } from "next/router";

import routes from "@lib/routes";

import Transition from "@components/Transitions";
import { LoadingContext } from "@utils/contexts/loadingContexts";

import Navbar from "@components/Navbar";

import { loadModelsTexturesAndEnvMaps } from "@components/threeJSComponents/factories/loadStuff";

import s3Urls from "@assets/images/s3Urls";

const Layout: React.FC = props => {
    const { children } = props;

    const pinkBall = useRef<HTMLDivElement>(null);
    const blueBall = useRef<HTMLDivElement>(null);

    const { dispatch } = useContext(LoadingContext);

    const [hideLoader, setHideLoader] = useState<boolean>(false);
    const [models, setModels] = useState<any>({});
    const [textures, setTextures] = useState<any>({});

    const [blueBallClass, setBlueBallClass] = useState(styles.blueBall);
    const [pinkBallClass, setPinkBallClass] = useState(styles.pinkBall);

    const router = useRouter();

    // COMPONENT DID UPDATE
    useEffect(() => {
        let w =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;

        let h =
            window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight;

        setBlueBallClass(returnBallClass("Blue"));
        setPinkBallClass(returnBallClass("Pink"));
    });

    // COMPONENT DID MOUNT
    useEffect(() => {
        getLoadedModels();
    }, []);

    const getLoadedModels = () => {
        let models: any, textures: any;

        // Dynamic module importer
        dynamicallyImportPackage()
            .then(async module => {
                // Load models like terrain, character, yada yada
                await loadModelsTexturesAndEnvMaps(
                    module as any,
                    dispatch as any
                )
                    .then((loadedData: any) => {
                        models = loadedData.models;
                        textures = loadedData.textures;
                    })
                    .catch((e: any) => console.error(e));

                setModels({ ...models });
                setTextures({ ...textures });

                setHideLoader(true);
            })
            .catch(e => console.error(e));
    };

    const dynamicallyImportPackage = async () => {
        let allMods = {};

        await Promise.all([
            import("three/examples/jsm/loaders/GLTFLoader.js"),
            import("three/examples/jsm/loaders/DRACOLoader.js"),
        ])
            .then(modules => {
                modules.map(item => {
                    allMods = {
                        ...allMods,
                        ...item,
                    };
                });
            })
            .catch(e => console.log(e));

        return allMods;
    };

    const returnLoader = () => {
        return (
            <div className={`${styles.loadingContainer}`}>
                <div
                    className={`${styles.apiCall} ${utilStyles.flexRow_Centre}`}
                >
                    <div
                        className={`${styles.loadingDot} ${styles.blueX}`}
                    ></div>
                    <div
                        className={`${styles.loadingDot} ${styles.pinkX}`}
                    ></div>
                    <div
                        className={`${styles.loadingDot} ${styles.yellowX}`}
                    ></div>
                </div>
            </div>
        );
    };

    const returnBallClass = (color: string) => {
        switch (router.asPath) {
            case routes.home:
                return styles[`home${color}Ball`];

            case routes.works:
                return styles[`works${color}Ball`];

            case routes.about:
                return styles[`about${color}Ball`];

            case routes.contact:
                return styles[`contact${color}Ball`];

            default:
                return styles[`clear${color}Ball`];
        }
    };

    const returnPageContent = () => {
        // Passing extra props to children because we
        // need our models to go through as props to
        // child pages, ex. home, about ..etc
        const childrenWithExtraProps = React.Children.map(children, child => {
            return React.cloneElement(
                child as ReactElement<any, string | JSXElementConstructor<any>>,
                {
                    // Pass any props you like here
                    models,
                    textures,
                    // setBallClass : ballClassForWorksPage,
                    // setAboutBallClass : ballClassForAboutPage,
                    blueBall,
                    pinkBall,
                }
            );
        });

        return (
            <>
                <div className={styles.container}>
                    <Transition location={router.pathname}>
                        <div className={styles.mainContainer}>
                            <Navbar />
                            <main className="main">
                                {models.length !== 0 && textures.length !== 0
                                    ? childrenWithExtraProps
                                    : null}
                            </main>
                        </div>
                    </Transition>

                    <div
                        className={`${styles.blueBall} ${blueBallClass}`}
                        ref={blueBall}
                    >
                        <img src={s3Urls.BLUE_BALL} alt="blue ball" />
                    </div>

                    <div
                        className={`${styles.pinkBall} ${pinkBallClass}`}
                        ref={pinkBall}
                    >
                        <img src={s3Urls.PINK_BALL} alt="pink ball" />
                    </div>
                </div>
            </>
        );
    };

    return (
        <>
            <Meta />

            {hideLoader === true && models.length !== 0 && textures.length !== 0
                ? returnPageContent()
                : returnLoader()}
        </>
    );
};

export default Layout;
