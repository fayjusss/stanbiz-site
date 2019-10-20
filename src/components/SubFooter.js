import React from 'react';
import { graphql, Link, StaticQuery } from 'gatsby';


const SubFooter = props => (
  <div className="sub-footer-strip">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="sub-footer">
            <ul>
              <li>
                {' '}
                <Link to="/">Home</Link>
              </li>
              <li>
                {' '}
                <Link to="/contact">Contact</Link>
              </li>
              <li className="copyright">
                ©
              {' '}
              {new Date().getFullYear()}
              {' '}
              {props.data.site.siteMetadata.title}
              </li>
              <li>
                <strong>Email: </strong>
                {' '}
                <a href={`mailto:${props.data.site.siteMetadata.contact.email}`}>
                  {props.data.site.siteMetadata.contact.email}
                </a>
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
            contact {
              email
              phone
            }
          }
        }
      }
    `}
    render={data => <SubFooter data={data} />}
  />
);
