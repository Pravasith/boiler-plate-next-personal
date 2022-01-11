import {
    TransitionGroup,
    Transition as ReactTransition,
} from "react-transition-group";

import gsap from "gsap";
import React from "react";

const TIMEOUT = 850, // milli - sex
    gsapDuration = 0.85; // sex

// const TIMEOUT = 7850, // milli - sex
// gsapDuration = 7.85 // sex

interface TransitionProps {
    location: string;
}

const Transition: React.FC<TransitionProps> = props => {
    const { children } = props;

    const scale = 0.8;
    // const skewDeg = 0;
    const ease = "power(2).in";

    const exiting = (node: gsap.TweenTarget) => {
        const tl = gsap.timeline();

        tl.set(node, {
            // y : "0vh",
            // height : "100vh",
            // transformOrigin : "50% 0%",
            // overflowY : "hidden",

            x: "0%",
            width: "100%",
            // y : "0vh",
            height: "100vh",
            transformOrigin: "0% 50vh",
            // overflowY : "hidden",
        })
            .to(node, {
                // duration : gsapDuration / 2, // in seconds
                // // y : "0vh",
                // // y : scale * 100 + "vh",
                // scale : scale,
                // transformOrigin : "50% 0%",
                // ease

                duration: gsapDuration / 2, // in seconds
                x: "0%",
                // y : scale * 100 + "vh",
                scale: scale,
                // skewX : `${skewDeg}deg`,
                transformOrigin: "0% 50vh",
                ease,
            })
            .to(node, {
                // duration : gsapDuration / 2, // in seconds
                // y : "-100vh",
                // scale : 1,
                // transformOrigin : "50% 0%",
                // ease

                duration: gsapDuration / 2, // in seconds
                x: "-100vw",
                scale: 1,
                // skewX : `${skewDeg}deg`,
                transformOrigin: "0% 50vh",
                ease,
            });
    };

    // const exited = (node) => {
    // 	gsap.to(
    // 		node,
    // 		{
    // 			duration : TIMEOUT / 1000, // in seconds
    // 			y : "-100vh"
    // 		}
    // 	)
    // }

    const entering = (node: gsap.TweenTarget) => {
        const tl = gsap.timeline();

        gsap.set(".transGrp", {
            overflow: `hidden`,
        });

        tl.set(node, {
            // y : scale * 100 + "vh",
            // y : "100vh",
            // transformOrigin : "50% 0%"

            // x : scale * 100 + "vw",
            scale: 1,
            x: "100vw",
            transformOrigin: "0% 50vh",
        })
            .to(node, {
                // duration : gsapDuration / 2, // in seconds
                // // y : "0vh",
                // y : scale * 100 + "vh",
                // scale : scale,
                // transformOrigin : "50% 0%",
                // ease

                duration: gsapDuration / 2, // in seconds
                // y : "0vh",
                x: scale * 100 + "vw",
                scale: scale,
                // skewX : `${skewDeg}deg`,
                transformOrigin: "0% 50vh",
                ease,
            })
            .to(node, {
                // duration : gsapDuration / 2, // in seconds
                // y : "0vh",
                // scale : 1,
                // transformOrigin : "50% 00%",
                // ease

                duration: gsapDuration / 2, // in seconds
                x: "0vw",
                scale: 1,
                // skewX : `${skewDeg}deg`,
                transformOrigin: "0% 50vh",
                onComplete: () => {
                    (
                        node as { style: { transform: string } }
                    ).style.transform = `none`;
                    gsap.set(".transGrp", {
                        overflow: `visible`,
                    });
                },
                ease,
            });
    };

    // const entered = (node) => {
    // 	gsap.to(
    // 		node,
    // 		{
    // 			duration : TIMEOUT / 1000, // in seconds
    // 			// duration : 0.3,
    // 			// y : "0vh",
    // 			scaleX : 1,
    // 			transformOrigin : "50% 50%"
    // 		}
    // 	)
    // }

    // const setTransformToNone = node => {
    //     gsap.to(node, {
    //         duration: TIMEOUT / 1000, // in seconds
    //         // duration : 0.3,
    //         // y : "0vh",
    //         // scaleX : 1,
    //         // transformOrigin : "50% 50%",
    //         transform: `none`,
    //     });
    // };

    return (
        <TransitionGroup
            className="transGrp"
            style={{
                position: "relative",
                // zIndex : 1
                // position: "absolute",
                width: "100%",
                height: "100vh",
                // overflow : "hidden",
            }}
        >
            <ReactTransition
                key={props.location}
                // appear = {true}

                // enter= {true}
                // exit= {true}

                // unmountOnExit = {false}
                // mountOnEnter = {true}

                onEntering={entering}
                // onEntered = {entered}

                onExiting={exiting}
                // onExited = {exited}

                timeout={{
                    // enter: TIMEOUT,
                    exit: TIMEOUT,
                }}
            >
                {status => (
                    // {children}
                    <div
                        style={
                            {
                                // ...getTransitionStyles[status],
                                // zIndex : 1
                            }
                        }
                    >
                        {children}
                    </div>
                )}
            </ReactTransition>
        </TransitionGroup>
    );
};

export default Transition;
