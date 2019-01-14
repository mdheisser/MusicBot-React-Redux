class Profile < ApplicationRecord
  has_many :like_tracks
  has_many :like_artists
  has_many :tracks, through: :like_tracks
  has_many :artists, through: :like_artists
  validates :email, uniqueness: true, allow_blank: true

  #associate tracks and artists with profile after user input
  def save_tracks_and_artists(artist_ids, track_ids)
    if artist_ids.length > 0
      artist_ids.each do |id|
        artist = Artist.find_or_create_by(spotify_id: id)
        if !self.artists.any? { |art| art.id == artist.id }
          LikeArtist.create(profile_id: self.id, artist_id: artist.id)
        end
      end
    end
    if track_ids.length > 0
      track_ids.each do |id|
        track = Track.find_or_create_by(spotify_id: id)
        if !self.tracks.any? { |tr| tr.id == track.id }
          LikeTrack.create(profile_id: self.id, track_id: track.id)
        end
      end
    end
    self.save
  end

  def get_rec(token)
    track_ids = ''
    artist_ids = ''
    likes = self.tracks.count + self.artists.count
    binding.pry
    if likes > 5
      tracks = self.tracks.last(2)
      artists = self.artists.last(2)
    end
    if self.tracks.count > 0
      track_ids = self.tracks.map {|track| track.spotify_id}.join(',')
    end
    if self.artists.count > 0
      artist_ids = self.artists.map {|artist| artist.spotify_id}.join(',')
    end
    resp = fetch_recommend(token, track_ids, artist_ids)
    tracks = JSON.parse(resp.body)['tracks']
    return tracks
  end

  private

  def fetch_recommend(token, track_ids, artist_ids)
    resp = Faraday.get("https://api.spotify.com/v1/recommendations") do |req|
      req.headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': token
      }
      req.params = {
        'limit': 10,
        'seed_artists': artist_ids,
        'seed_tracks': track_ids
      }
    end
  end

  def fetch_tracks(token, track_ids)
    resp = Faraday.get('https://api.spotify.com/v1/tracks') do |req|
      req.headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': token
      }
      req.params = {
        'ids': track_ids
      }
    end
    return resp.body
  end

end
