import React from 'react';
import { Col } from 'react-bootstrap'
import Like from '../presentation/Like'
import Playback from '../presentation/Playback'
import '../css/Rec.css'

const Recommendation = ({rec, showNextTrack, showPreviousTrack, saveLike, iframeSRC}) => (
  <div className="rec-container">
    <div className="rec-info">
      {rec.external_urls && <p><a href={rec.external_urls.spotify}>{rec.name}</a></p>}
      <p>Popularity: {rec.popularity}</p>
      <p>Artist: {rec.artists[0]['name']}</p>
      <Like saveLike={saveLike} />
    </div>
    <div className="rec-player">
      <Playback showNextTrack={showNextTrack} showPreviousTrack={showPreviousTrack}/>
      <iframe src={iframeSRC}
        width='300' height='300' frameBorder='0'
        allowTransparency='true' allow='encrypted-media'>
      </iframe>
    </div>
  </div>
)

export default Recommendation;
