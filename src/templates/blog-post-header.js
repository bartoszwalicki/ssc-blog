import React from "react"
import styled from "@emotion/styled"
import { rhythm } from "../utils/typography"

export default function BlogPostHeader(props) {

    const Header = styled.div`
        display: flex;
        flex-direction: column;
        margin-bottom: ${rhythm(2)};
        text-align: center;
    `
    const HeaderText = styled.h1`
            border-bottom: 1px dashed;
            padding-bottom: ${rhythm(1 / 2)};
            margin-bottom: ${rhythm(1 / 2)};
            text-align: center;
    `;

    const Date = styled.span`
        font-size: 0.8rem;
        color: rgba(255,255,255,0.4);
    `;

    return (
        <Header>
            <HeaderText>{props.title}</HeaderText>
            <Date>{props.date}</Date>
        </Header>
    )
}
