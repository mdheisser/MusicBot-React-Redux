class Profile < ApplicationRecord
  has_and_belongs_to_many :tracks
  has_and_belongs_to_many :artists

  #associate tracks and artists with profile after user input
  def save_tracks_and_artists(artist_ids, track_ids)
    if artist_ids.length > 0
      artist_ids.each do |id|
        artist = Artist.find_or_create_by(spotify_id: id, liked: true)
        self.artists << artist
      end
    end
    if track_ids.length > 0
      track_ids.each do |id|
        track = Track.find_or_create_by(spotify_id: id, liked: true)
        self.tracks << track
      end
    end
    self.save
  end

  def get_rec(token)
    if self.tracks.length > 0
      track = self.tracks.last.spotify_id
    else
      track = ''
    end
    if self.artists.length > 0
      artist = self.artists.last.spotify_id
    else
      artist = ''
    end
    resp = Faraday.get("https://api.spotify.com/v1/recommendations") do |req|
      req.headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': token
      }
      req.params = {
        'limit': 1,
        'seed_artists': artist,
        'seed_tracks': track
      }
    end
    track = JSON.parse(resp.body)['tracks'].first
    return track
  end

end
