import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import 'styles/components/shared/block-switch.scss';

class BlockSwitch extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    dirtyBlocks: PropTypes.object,
    activeBlockId: PropTypes.string,
    blocks: PropTypes.array.isRequired,
    selectBlock: PropTypes.func.isRequired
  };

  render() {
    const { className, blocks, activeBlockId, selectBlock, dirtyBlocks } = this.props;

    return (
      <div className={cx('c-block-switch', className)}>
        {blocks.map(block => {
          const isActive = block.id === activeBlockId;
          return (
            <button
              key={block.id}
              className={cx('block-switch-element', {
                '-active': isActive,
                '-dirty': dirtyBlocks && dirtyBlocks[block.id]
              })}
              onClick={() => selectBlock(block.id)}
              disabled={isActive}
            >
              <span
                className={cx('subtitle', 'block-switch-title', {
                  '-dark': !isActive,
                  '-white': isActive
                })}
              >
                {block.title}
              </span>
              <div
                className="block-switch-image"
                style={{
                  backgroundImage: !isActive
                    ? `url(${block.imageUrl})`
                    : `url(${block.whiteImageUrl})`
                }}
              />
            </button>
          );
        })}
      </div>
    );
  }
}

export default BlockSwitch;
