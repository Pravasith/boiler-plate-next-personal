import { useState } from "react";

import styles from "./navbar.module.scss";
import utilStyles from "@assets/sass/utils.module.scss";
import NavbarSVGs from "@assets/images/svgs/navbarSVGs";

const { NavbarLogo } = NavbarSVGs;

import { useRouter } from "next/router";
import Link from "next/link";

import routes from "@lib/routes";

const Navbar = () => {
    const router = useRouter();

    const [showNavItems, setShowNavItems] = useState(false);

    const returnMenuItems = () => {
        return (
            <ul>
                <li>
                    <Link href="/">
                        <a
                            style={
                                router.asPath === routes.home
                                    ? { color: "#7865ce" }
                                    : {}
                            }
                        >
                            HOME
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/works">
                        <a
                            style={
                                router.asPath === routes.works
                                    ? { color: "#7865ce" }
                                    : {}
                            }
                        >
                            WORKS
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/about">
                        <a
                            style={
                                router.asPath === routes.about
                                    ? { color: "#7865ce" }
                                    : {}
                            }
                        >
                            ABOUT
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/contact">
                        <a
                            style={
                                router.asPath === routes.contact
                                    ? { color: "#7865ce" }
                                    : {}
                            }
                        >
                            CONTACT
                        </a>
                    </Link>
                </li>
            </ul>
        );
    };

    return (
        <div className={`${styles.container} ${utilStyles.posRel} z-10`}>
            <div className={`${styles.innerWrap} ${utilStyles.posAbs_NW}`}>
                <nav className={`${styles.navWrap}  ${utilStyles.flexCol_NW}`}>
                    <div
                        className={`${styles.logoContainer} ${utilStyles.posRel}`}
                    >
                        <div
                            className={`${styles.logo} ${utilStyles.posAbs_NW}`}
                        >
                            <Link href="/">
                                <a>{NavbarLogo}</a>
                            </Link>
                        </div>
                    </div>

                    <div
                        className={`${styles.hamburger} ${utilStyles.flexCol_Centre}`}
                    >
                        <div
                            className={`${
                                showNavItems ? styles.navItems : styles.hide
                            } ${utilStyles.posAbs_NW}`}
                        >
                            {returnMenuItems()}
                        </div>

                        <div
                            className={`${styles.barWrap}  ${utilStyles.posRel} `}
                            onClick={() => {
                                setShowNavItems(!showNavItems);
                            }}
                        >
                            <div
                                className={`${styles.bars} ${
                                    showNavItems ? styles.closeBarT : null
                                }`}
                            ></div>
                            <div
                                className={`${styles.bars} ${
                                    showNavItems ? styles.closeBarM : null
                                }`}
                            ></div>
                            <div
                                className={`${styles.bars} ${
                                    showNavItems ? styles.closeBarB : null
                                }`}
                            ></div>
                        </div>
                    </div>

                    <div
                        className={`${styles.menuItems} ${utilStyles.flexRow_E}`}
                    >
                        {returnMenuItems()}
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;
