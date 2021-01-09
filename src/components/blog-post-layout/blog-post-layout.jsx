import React from "react"
import Layout from "../main-layout/main-layout"
import { graphql } from "gatsby"
import BlogContent from "./components/blog-content"
import BlogPostHeader from "./components/blog-post-header"
import CreateGithubIssueCta from "./components/create-github-issue-cta/create-github-issue-cta"
import SEO from "../seo/SEO"

export default function BlogPostLayout({ data , location}) {
  const post = data.markdownRemark

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        desc={post.frontmatter.abstract}
        pathname={location.pathname}
        article={true}
        publicationDate={post.frontmatter.publicationDate}
        updatedDate={post.frontmatter.updatedDate}
      />
      <BlogPostHeader
        title={post.frontmatter.title}
        date={post.frontmatter.date}
      />
      <BlogContent dangerouslySetInnerHTML={{ __html: post.html }} />
      <CreateGithubIssueCta slug={post.fields.slug} />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      html
      frontmatter {
        title
        date(formatString: "DD MMMM, YYYY")
        publicationDate: date(formatString: "YYYY-MM-DD")
        updatedDate(formatString: "YYYY-MM-DD")
        abstract
      }
    }
  }
`
