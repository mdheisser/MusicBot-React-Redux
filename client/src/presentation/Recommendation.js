import React from 'react';
import { Col } from 'react-bootstrap'
import Like from '../presentation/Like'
import Playback from '../presentation/Playback'

const Recommendation = ({rec, iframeSRC, showNextTrack, saveLike}) => (
  <React.Fragment>
    <Col xs={6} md={4}>
      <p>{rec.name}</p>
      <p>Popularity: {rec.popularity}</p>
      <p>Artist: {rec.artists[0]['name']}</p>
    </Col>
    <Col xs={6} md={4}>
      <iframe src={iframeSRC}
        width='300' height='380' frameBorder='0'
        allowTransparency='true' allow='encrypted-media'>
      </iframe>
    </Col>
    <Col xsHidden md={4}>
      <Playback showNextTrack={showNextTrack}/>
      <Like saveLike={saveLike} />
    </Col>
  </React.Fragment>
)

export default Recommendation;
