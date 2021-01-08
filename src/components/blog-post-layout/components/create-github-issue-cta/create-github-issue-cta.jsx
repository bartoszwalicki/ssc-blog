import React from "react"
import styled from "@emotion/styled"
import { rhythm } from "../../../../utils/typography"
import GithubLogo from "./assets/github-mark.inline.svg"

export default function CreateGithubIssueCta(props) {
  const Section = styled.section`
    padding: ${rhythm(1)} 0;
    border-top: 1px dashed rgba(255, 255, 255, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
  `

  const Text = styled.h3`
    margin: 0;
    margin-left: ${rhythm(1)};
  `

  return (
    <Section>
      <div className="github-logo">
        <GithubLogo />
      </div>
      <Text>
        Having problems with stuff above?{" "}
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://github.com/bartoszwalicki/ssc-blog/tree/master/src/pages${props.slug}index.md`}
        >
          Create issue on Github for this page
        </a>{" "}
        or{" "}
        <a target="_blank" rel="noreferrer" href="http://google.pl">
          contact me
        </a>
        !
      </Text>
    </Section>
  )
}
