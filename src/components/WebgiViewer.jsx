import React, { useRef, useState, useCallback, forwardRef, useImperativeHandle, useEffect } from "react";
import {
    ViewerApp,
    AssetManagerPlugin,
    AssetExporterPlugin,
    GBufferPlugin,
    ProgressivePlugin,
    TonemapPlugin,
    SSRPlugin,
    SSAOPlugin,
    BloomPlugin,
    GammaCorrectionPlugin,
    addBasePlugins,
    CanvasSnipperPlugin,
    TweakpaneUiPlugin,
    mobileAndTabletCheck,
    AssetManagerBasicPopupPlugin,
} from "webgi"



import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)
function WebgiViewer() {
    const canvaRef = useRef(null);

    const setupViewer = useCallback(async () => {


        // Initialize the viewer
        const viewer = new ViewerApp({
            canvas: canvaRef.current,
        })


        const manager = await viewer.addPlugin(AssetManagerPlugin)

        const camera = viewer.scene.activeCamera;
        const position = camera.position;
        const target = camera.target;

        // Add plugins individually.
        await viewer.addPlugin(GBufferPlugin)
        await viewer.addPlugin(new ProgressivePlugin(32))
        await viewer.addPlugin(new TonemapPlugin(true))
        await viewer.addPlugin(GammaCorrectionPlugin)
        await viewer.addPlugin(SSRPlugin)
        await viewer.addPlugin(SSAOPlugin)
        await viewer.addPlugin(BloomPlugin)


        // or use this to add all main ones at once.
        //await addBasePlugins(viewer) // check the source: https://codepen.io/repalash/pen/JjLxGmy for the list of plugins added.


        // Add more plugins not available in base, like CanvasSnipperPlugin which has helpers to download an image of the canvas.
        //await viewer.addPlugin(CanvasSnipperPlugin)
        viewer.renderer.refreshPipeline()

        // Import and add a GLB file.
        await manager.addFromPath("scene-black.glb")
        viewer.getPlugin(TonemapPlugin).config.clipBackground = true;
        // Load an environment map if not set in the glb file
        // await viewer.setEnvironmentMap("./assets/environment.hdr");

        viewer.scene.activeCamera.setCameraOptions({ controlsEnabled: false });
        window.scrollTo(0, 0);


        let needUpdate = true;
        viewer.addEventListener("preFrame", () => {
            if (needUpdate) {
                camera.positionTargetUpdated(true);
                needUpdate = false;
            }
        })

    }, []);

    useEffect(() => {
        setupViewer();
    }, []);
    return (
        <div id="webgi-canvas-container">
            <canvas ref={canvaRef} id="webgi-canvas" />
        </div>
    );
}

export default WebgiViewer;