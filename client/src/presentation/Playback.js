import React from 'react';
import { Button, Glyphicon, ButtonGroup } from 'react-bootstrap'

function Playback(props) {
  return (
    <div className="button-container">
      <Button onClick={props.showPreviousTrack} bsSize="medium">
        <Glyphicon glyph="backward" /> Previous Song
      </Button>
      <Button onClick={props.showNextTrack} bsSize="medium">
        <Glyphicon glyph="forward" /> Next Song
      </Button>
    </div>
  )
}

export default Playback;
