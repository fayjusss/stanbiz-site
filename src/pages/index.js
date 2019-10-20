import React from 'react';
import { graphql, withPrefix, Link } from 'gatsby';
import Helmet from 'react-helmet';
import SEO from '../components/SEO';
import Layout from '../layouts/index';
import Call from '../components/Call';
import logoTag from '../images/logo_tag.png';

const Home = (props) => {
  const markdown = props.data.allMarkdownRemark.edges;
  return (
    <Layout bodyClass="page-home">
      <SEO title="Home" />
      <Helmet>
        <meta
          name="description"
          content="Small Business Theme. Multiple content types using Markdown and JSON sources. Responsive design and SCSS. This is a beautiful and artfully designed starting theme."
        />
      </Helmet>
      <div className="intro pb-4">
        <div className="container">
          <img alt="logo tag" src={logoTag} className="pb-3"/>
          <blockquote><p className="quotation">I am a slow walker but I never walk backwards</p>
            <footer>- Abraham Lincoln</footer>
          </blockquote> 
          <p>
           Inspired by above statement, StanBiz, a startup team with highly ambitious attitudes, is growing from better to best with every new step it takes with vision to grow your business with StanBiz’s standardize services. 
          </p>
        </div>
      </div>

      <div className="container pt-8 pt-md-10 pb-8 pb-md-10">
        <div className="row justify-content-start">
          <div className="col-12">
            <h2 className="title-3 text-dark mb-3">Our Services</h2>
          </div>
          {markdown.map(edge => (
            <div key={edge.node.frontmatter.path} className="col-12 col-md-6 col-lg-4 mb-2">
              <div className="feature">
                {edge.node.frontmatter.image && (
                  <div className="feature-image">
                    <img src={withPrefix(edge.node.frontmatter.image)} />
                  </div>
                )}
                <Link className="feature-title" to={edge.node.frontmatter.path}>{edge.node.frontmatter.title}</Link>
                <div className="content" dangerouslySetInnerHTML={{ __html: edge.node.html }} />
              </div>
            </div>
          ))}
          <div className="col-12 text-center">
            <Link className="button button-primary mt-2" to="/services">
              View All Services
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/services/" } }
      sort: { fields: [frontmatter___order], order: ASC }
    ) {
      edges {
        node {
          id
          frontmatter {
            path
            title
            order
            image
          }
          html
        }
      }
    }
  }
`;

export default Home;
