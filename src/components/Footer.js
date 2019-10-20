import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import ifa from '../images/ifa.jpg';

const Footer = props => (
  <div className="footer-strip">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="footer">
            <h3 className="footer-title">{props.data.site.siteMetadata.title}</h3>
            <ul className="footer-menu">
              <li>
                <img alt="ifa" src={ifa} /> 
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => <Footer data={data} />}
  />
);
