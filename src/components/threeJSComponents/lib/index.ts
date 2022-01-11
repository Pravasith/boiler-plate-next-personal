const baseS3URL = "https://folio-pics.s3.eu-west-2.amazonaws.com/";

export const threeJsS3Urls = {
    MAPS_AND_IMAGES: baseS3URL + "textures/",
    MODELS: baseS3URL + "models/",
    DRACO_DECODER_PATH:
        "https://xi-upload.s3.amazonaws.com/app-pics/threejs/draco/",
};

export const modelLinkURLs: Record<string, string> = {
    // submarine : "theSubmarine.gltf",
    SUBMARINE: "submarineV2.gltf",
    // homeBgd : "homeGraphic.gltf",
    HOME_BACKGROUND: "subBgd.gltf",
    BOAT: "boatX.gltf",
    PAPER_FAN: "paperFanX.gltf",
};

export const imageLinkURLs: Record<string, string> = {
    // Simple image texture links
    // skyTexture: "space-background-pravasith-2U.png"
    ABOUT_PICTURE: "about-page-pravas-pic.png",
    BLUE_TEXTURE: "blueSquare.png",
    PINK_TEXTURE: "pinkSquare.png",
    YELLOW_TEXTURE: "yellowSquare.png",
};

export const envMapURLs: Record<string, string[]> = {
    // Env maps || cube maps
    sceneEnv: [
        threeJsS3Urls.MAPS_AND_IMAGES + "whitePosX.png",
        threeJsS3Urls.MAPS_AND_IMAGES + "whiteNegX.png",
        threeJsS3Urls.MAPS_AND_IMAGES + "whitePosY.png",
        threeJsS3Urls.MAPS_AND_IMAGES + "whiteNegY.png",
        threeJsS3Urls.MAPS_AND_IMAGES + "whitePosZ.png",
        threeJsS3Urls.MAPS_AND_IMAGES + "whiteNegZ.png",
    ],
    skyBoxEnv: new Array(6).fill(
        threeJsS3Urls.MAPS_AND_IMAGES + "space-background-pravasith-2U.png"
    ),
};
