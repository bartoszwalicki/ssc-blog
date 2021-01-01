import React from "react"
import styled from "@emotion/styled"
import { rhythm } from "../../../../utils/typography"
import GithubLogo from "./assets/github-mark.inline.svg"

export default function CreateGithubIssueCta() {
    const Section = styled.section`
        padding: ${rhythm(1)} 0;
        border-top: 1px dashed rgba(255,255,255,0.4);
    `;

    const Link = styled.a`
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
    `;

    const Text = styled.h3`
        margin: 0;
        margin-left: ${rhythm(1)};
    `;

    return (
        <Section>
            <Link target="_blank" rel="noopener" href="http://myexternalurl.com">
                <div className="github-logo">
                    <GithubLogo />
                </div>
                <Text>Having problems with stuff above? Create issue on Github for this page!</Text>
            </Link>
        </Section>
    )
}
