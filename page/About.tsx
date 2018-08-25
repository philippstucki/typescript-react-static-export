import * as React from 'react';
import { css } from 'emotion';

interface AboutProps {
    n: number;
}
const c = css`
    color: red;
`;
export const About = (p: AboutProps) => (
    <div className={c}>Hello About {p.n}</div>
);
