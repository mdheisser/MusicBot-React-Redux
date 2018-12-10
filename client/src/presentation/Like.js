import React from 'react';
import { Button, Glyphicon, ButtonGroup } from 'react-bootstrap'

function Like(props) {
  return (
    <div className="button-container">
      <Button onClick={props.saveLike} bsSize="large">
        <Glyphicon glyph="thumbs-up" /> Save to my Profile
      </Button>
      <Button bsSize="large">
        <Glyphicon glyph="thumbs-down" /> Don't show me again
      </Button>
    </div>
  )
}

export default Like;
