import React, { useState, useEffect, useRef } from 'react';

const ASCIIDonut = () => {
    const [ toggle, setToggle ] = useState(false);
    const [ donut, setDonut ] = useState('');

    const A = useRef(1);
    const B = useRef(1);

    useEffect(() => {
        const intervalID = setInterval(doDonut, 50);
        if(!toggle) {
            clearInterval(intervalID)
        }
        return () => clearInterval(intervalID);
    }, [ toggle ])

    const doDonut = () => {
        let b = [];
        let z = [];
        A.current += 0.07;
        B.current += 0.03;
        const cosA = Math.cos(A.current);
        const sinA = Math.sin(A.current);
        const cosB = Math.cos(B.current);
        const sinB = Math.sin(B.current);

        for(let k = 0; k < 1760; k++) {
            b[k] = k % 80 === 79 ? '\n' : ' ';
            z[k] = 0;
        }
        for(let j = 0; j < 6.28; j += 0.07) { // j <=> theta
            const ct = Math.cos(j);
            const st = Math.sin(j);
            for(let i = 0; i < 6.28; i += 0.02) {   // i <=> phi
                const sp = Math.sin(i);
                const cp = Math.cos(i);
                const h = ct + 2; // R1 + R2*cos(theta)
                const D = 1 / (sp * h * sinA + st * cosA + 5); // this is 1/z
                const t = sp * h * cosA - st * sinA; // this is a clever factoring of some of the terms in x' and y'

                const x = 0 | (40 + 30 * D * (cp * h * cosB - t * sinB));
                const y = 0 | (12 + 15 * D * (cp * h * sinB + t * cosB));
                const o = x + 80 * y;
                const N = 0 | (8 * ((st * sinA - sp * ct * cosA) * cosB - sp * ct * sinA - st * cosA - cp * ct * sinB));

                if(y < 22 && y >= 0 && x >= 0 && x < 79 && D > z[o]) {
                    z[o] = D;
                    b[o] = '.,-~:;=!*#$@'[N > 0 ? N : 0];
                }
            }
        }
        setDonut(b.join(''));
    }

    return (<div>
        <button type={'button'} onClick={() => setToggle((prev) => !prev)}>Toggle</button>
        <pre className={'asciiPre'}>{donut}</pre>
    </div>);
};

export default ASCIIDonut;
