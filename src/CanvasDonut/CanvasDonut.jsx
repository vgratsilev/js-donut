import React, { useState, useEffect, useRef } from 'react';

const R1 = 1;
const R2 = 2;
const K1 = 100;
const K2 = 5;

const ASKIIDonut = () => {
    const [ toggle, setToggle ] = useState(false);

    const A = useRef(1);
    const B = useRef(1);

    const canvasRef = useRef(null)

    useEffect(() => {
        const intervalID = setInterval(doCanvasDonut, 50);
        if(!toggle) {
            clearInterval(intervalID)
        }
        return () => clearInterval(intervalID);
    }, [ toggle ])

    const doCanvasDonut = () => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.fillStyle = '#021340';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        A.current += 0.07;
        B.current += 0.03;

        // precompute cosines and sines of A, B, theta, phi, same as before
        const cosA = Math.cos(A.current);
        const sinA = Math.sin(A.current);
        const cosB = Math.cos(B.current);
        const sinB = Math.sin(B.current);
        for(let j = 0; j < 6.28; j += 0.3) { // j <=> theta
            const ct = Math.cos(j); // cosine theta
            const st = Math.sin(j); // sine theta
            for(let i = 0; i < 6.28; i += 0.1) {   // i <=> phi
                const sp = Math.sin(i); // sine phi
                const cp = Math.cos(i); // cosine phi
                const ox = R2 + R1 * ct; // object x, y = (R2,0,0) + (R1 cos theta, R1 sin theta, 0)
                const oy = R1 * st;

                const x = ox * (cosB * cp + sinA * sinB * sp) - oy * cosA * sinB; // final 3D x coordinate
                const y = ox * (sinB * cp - sinA * cosB * sp) + oy * cosA * cosB; // final 3D y
                const ooz = 1 / (K2 + cosA * ox * sp + sinA * oy); // one over z
                const xp = (150 + K1 * ooz * x); // x' = screen space coordinate, translated and scaled to fit our 320x240 canvas element
                const yp = (75 - K1 * ooz * y); // y' (it's negative here because in our output, positive y goes down but in our 3D space, positive y goes up)

                // luminance, scaled back to 0 to 1
                const L = 0.7 * (cp * ct * sinB - cosA * ct * sp - sinA * st + cosB * (cosA * st - ct * sinA * sp));

                if(L > 0) {
                    ctx.fillStyle = 'rgba(255,255,255,' + L + ')';
                    ctx.fillRect(xp, yp, 1.5, 1.5);
                }
            }
        }
    }

    return (<div>
        <button type={'button'} onClick={() => setToggle((prev) => !prev)}>Toggle</button>
        <div>
            <canvas ref={canvasRef} className={'canvasDonut'}/>
        </div>

    </div>);
};

export default ASKIIDonut;
