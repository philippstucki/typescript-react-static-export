import * as React from 'react';

interface AboutProps {
    n: number;
}
export const About = (p: AboutProps) => (
    <div className="About">Hello About {p.n}</div>
);
