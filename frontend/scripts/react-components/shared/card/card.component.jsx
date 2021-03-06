import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Heading from 'react-components/shared/heading/heading.component';

import './card.scss';

class Card extends Component {
  static renderDashedBox() {
    const dashedBox = (
      <svg
        className="card-dashed-box"
        viewBox="0 0 300 100"
        preserveAspectRatio="none"
        shapeRendering="crispEdges"
      >
        <path
          className="dashed-line"
          d="M0,0 300,0 300,100 0,100z"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    );

    const dashedLine = (
      <svg
        className="card-dashed-line"
        viewBox="0 0 300 100"
        preserveAspectRatio="none"
        shapeRendering="crispEdges"
      >
        <path className="dashed-line" d="M0,0 300, 0" vectorEffect="non-scaling-stroke" />
      </svg>
    );

    return { dashedBox, dashedLine };
  }

  render() {
    const {
      linkUrl,
      subtitle,
      title,
      imageUrl,
      actionName,
      className,
      translateUrl,
      Link,
      variant,
      linkProps
    } = this.props;
    const { dashedBox, dashedLine } = Card.renderDashedBox();

    return (
      <div className={cx('c-card', variant, className)}>
        {variant === 'dashed' && dashedBox}
        <Link
          className="card-link"
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          tx-content={translateUrl ? 'translate_urls' : undefined}
          {...linkProps}
        >
          <figure className="card-image" style={{ backgroundImage: `url(${imageUrl})` }} />
          {variant === 'dashed' && dashedLine}
        </Link>
        <figcaption className="card-content">
          <div className="card-details-container">
            <Heading as="h4" variant="mono" color="pink" size="sm">
              {subtitle}
            </Heading>
            <p className="card-title">{title}</p>
          </div>
          <Heading variant="mono" color="grey-faded" size="sm">
            <Link
              className="card-action"
              target="_blank"
              rel="noopener noreferrer"
              href={linkUrl}
              tx-content={translateUrl ? 'translate_urls' : undefined}
              {...linkProps}
            >
              {actionName}
            </Link>
          </Heading>
        </figcaption>
      </div>
    );
  }
}

Card.defaultProps = {
  Link: 'a'
};

Card.propTypes = {
  Link: PropTypes.any,
  linkUrl: PropTypes.string,
  imageUrl: PropTypes.string,
  linkProps: PropTypes.object,
  className: PropTypes.string,
  translateUrl: PropTypes.bool,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  actionName: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['new', 'dashed'])
};

export default Card;
