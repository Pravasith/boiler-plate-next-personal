export const ScrollAnim = () => {
    const colors = {
        transparent: "#ffffff00",

        magenta: "#FF6C85",
        highlightColor: "#7865ce",
        yellow: "#FFFF00",

        white: "#ffffff",
        black: "#000000",
    };

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0"
            y="0"
            enableBackground="new 0 0 142.7 69"
            viewBox="0 0 142.7 69"
        >
            <path
                className="upDown2Quick"
                id="scrollPath"
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="3"
                d="M94.4 31.6L71.4 55.6 48.4 31.6"
            ></path>
            <path
                id="strip"
                className="upDown2Slow"
                // fill={colors[props.color]}
                fill="#f7f7f7"
                d="M9.4 8.2H133.3V18.7H9.4z"
                transform="matrix(.9976 -.06891 .06891 .9976 -.757 4.95)"
            ></path>
        </svg>
    );
};
