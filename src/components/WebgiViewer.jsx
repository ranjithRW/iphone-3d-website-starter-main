import React, { useRef, useState, useCallback, forwardRef, useImperativeHandle, useEffect } from "react";
import {
    ViewerApp,
    AssetManagerPlugin,
    GBufferPlugin,
    ProgressivePlugin,
    TonemapPlugin,
    SSRPlugin,
    SSAOPlugin,
    BloomPlugin,
    GammaCorrectionPlugin,
    mobileAndTabletCheck,
   
} from "webgi"

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollAnimation } from "../lib/ScrollAnimation";

gsap.registerPlugin(ScrollTrigger)
function WebgiViewer() {
    const canvaRef = useRef(null);
    const memoizedScrollAnimation = useCallback((position, target, onUpdate) => {
        if (position && target && onUpdate) {
            ScrollAnimation(position, target, onUpdate);
        }
    })

    const setupViewer = useCallback(async () => {


        // Initialize the viewer
        const viewer = new ViewerApp({
            canvas: canvaRef.current,
        })

        const manager = await viewer.addPlugin(AssetManagerPlugin)

        const camera = viewer.scene.activeCamera;
        const position = camera.position;
        const target = camera.target;

        
        await viewer.addPlugin(GBufferPlugin)
        await viewer.addPlugin(new ProgressivePlugin(32))
        await viewer.addPlugin(new TonemapPlugin(true))
        await viewer.addPlugin(GammaCorrectionPlugin)
        await viewer.addPlugin(SSRPlugin)
        await viewer.addPlugin(SSAOPlugin)
        await viewer.addPlugin(BloomPlugin)
        viewer.renderer.refreshPipeline()
        await manager.addFromPath("scene-black.glb")
        viewer.getPlugin(TonemapPlugin).config.clipBackground = true;
        viewer.scene.activeCamera.setCameraOptions({ controlsEnabled: false });
        window.scrollTo(0, 0);

        let needUpdate = true;
        const onUpdate = () => {
            needUpdate = true;
            viewer.setDirty();
        }
        viewer.addEventListener("preFrame", () => {
            if (needUpdate) {
                camera.positionTargetUpdated(true);
                needUpdate = false;
            }
        })
        memoizedScrollAnimation(position, target, onUpdate);
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