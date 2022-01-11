import * as THREE from "three";
import { Texture } from "three";

import {
    threeJsS3Urls,
    modelLinkURLs,
    envMapURLs,
    imageLinkURLs,
} from "../lib";

export const loadModelsTexturesAndEnvMaps = (
    module: { GLTFLoader: new () => any; DRACOLoader: new () => any },
    dispatch: ({}: { type: string; percentLoaded: number }) => void
) => {
    dispatch({
        type: "ON_PROGRESS",
        percentLoaded: 0,
    });

    // MODEL LOADER
    const gltfLoader = new module.GLTFLoader();
    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    const dracoLoader = new module.DRACOLoader();
    dracoLoader.setDecoderPath(threeJsS3Urls.DRACO_DECODER_PATH);
    gltfLoader.setDRACOLoader(dracoLoader);

    // TEXTURE LOADER
    const textureLoader = new THREE.TextureLoader();

    // ENV TEXTURE LOADER
    const envTextureLoader = new THREE.CubeTextureLoader();

    const modelURLs = { ...modelLinkURLs },
        textureURLs = { ...imageLinkURLs },
        envURLs = { ...envMapURLs };

    // Compute total loading items
    const totalItemsToLoad =
        Object.keys(modelURLs).length +
        Object.keys(textureURLs).length +
        Object.keys(envURLs).length;

    let loadItemCount = 0,
        allLoadedItemsData = {
            models: {},
            textures: {},
            envTextures: {},
        };

    const dispatchLoadingData = () => {
        dispatch({
            type: "ON_PROGRESS",
            percentLoaded: (loadItemCount / totalItemsToLoad) * 100,
        });
    };

    return new Promise((resolve, reject) => {
        // Loading models
        const models: Record<string, string> = {};

        Object.keys(modelURLs).map(key => {
            gltfLoader.load(
                threeJsS3Urls.MODELS + modelURLs[key],
                (gltf: any) => {
                    models[key.split(".")[0]] = gltf;
                    loadItemCount++;
                    dispatchLoadingData();

                    allLoadedItemsData = {
                        ...allLoadedItemsData,
                        models: {
                            ...allLoadedItemsData.models,
                            ...models,
                        },
                    };

                    if (loadItemCount === totalItemsToLoad) {
                        resolve(allLoadedItemsData);
                    }
                },
                // called while loading is progressing
                // xhr => {
                //     // console.log( 'Models ' + ( xhr.loaded / xhr.total * 100 ) + '% loaded' )
                // },
                // called when loading has errors
                (error: any) => {
                    reject({
                        jist: "An error occured while loading " + key,
                        error,
                    });
                    // console.dir(error);
                    console.error("An error happened");
                }
            );
        });

        // Loading textures
        const textures: Record<string, Texture> = {};

        Object.keys(textureURLs).map(key => {
            textureLoader.load(
                threeJsS3Urls.MAPS_AND_IMAGES + textureURLs[key],
                texture => {
                    textures[key.split(".")[0]] = texture;

                    loadItemCount++;
                    dispatchLoadingData();

                    allLoadedItemsData = {
                        ...allLoadedItemsData,
                        textures: {
                            ...allLoadedItemsData.textures,
                            ...textures,
                        },
                    };

                    if (loadItemCount === totalItemsToLoad) {
                        resolve(allLoadedItemsData);
                    }
                },
                // called while loading is progressing
                // xhr => {
                //     // console.log( 'Textures ' +  ( xhr.loaded / xhr.total * 100 ) + '% loaded' )
                // },
                // called when loading has errors
                error => {
                    reject({
                        jist: "An error occured while loading " + key,
                        error,
                    });
                    console.error("An error happened");
                }
            );
        });

        // Loading env maps
        const envTextures: Record<string, Texture> = {};

        Object.keys(envURLs).map(key => {
            envTextureLoader.load(
                envURLs[key],
                envTexture => {
                    envTexture.mapping = THREE.CubeRefractionMapping;
                    envTextures[key] = envTexture;

                    loadItemCount++;
                    dispatchLoadingData();

                    allLoadedItemsData = {
                        ...allLoadedItemsData,
                        envTextures: {
                            ...allLoadedItemsData.envTextures,
                            ...envTextures,
                        },
                    };

                    if (loadItemCount === totalItemsToLoad) {
                        resolve(allLoadedItemsData);
                    }
                },
                // called while loading is progressing
                // xhr => {
                //     // console.log( 'Envs ' +  ( xhr.loaded / xhr.total * 100 ) + '% loaded' )
                // },
                // called when loading has errors
                error => {
                    reject({
                        jist: "An error occured while loading " + key,
                        error,
                    });
                    console.error("An error happened");
                }
            );
        });
    });
};
