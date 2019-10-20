import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

const Call = props => (
  <div className="call">
    <div className="call-box-top">
      <div className="call-actions">
        <a href={`mailto:${props.data.site.siteMetadata.contact.email}`}>
          <i class="fas fa-2x fa-envelope"></i>
        </a>
        <a href={`${props.data.site.siteMetadata.contact.fb}`}>
          <i class="fab fa-2x fa-facebook-square"></i>
        </a>
        <a href={"skype:live:.cid.5d01f27b1750bf7b?call"}>
          <i class="fab fa-2x fa-skype"></i>
        </a>
      </div>
      {props.button && (
      <div className="call-box-bottom">
        <a href="/contact" className="button">
          Contact
        </a>
      </div>
      )}
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
            description
            contact {
              email
              phone
              fb
              skype
            }
          }
        }
      }
    `}
    render={data => <Call button={props.button} data={data} />}
  />
);
