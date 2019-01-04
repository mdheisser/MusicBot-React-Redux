class Profile < ApplicationRecord
  has_and_belongs_to_many :tracks
  has_and_belongs_to_many :artists
  has_many :likes

  #associate tracks and artists with profile after user input
  def save_tracks_and_artists(artist_ids, track_ids)
    if artist_ids.length > 0
      artist_ids.each do |id|
        artist = Artist.find_or_create_by(spotify_id: id)
        Like.create(profile_id: self.id, artist_id: artist.id, category: 'artist', spotify_id: artist.spotify_id)
      end
    end
    if track_ids.length > 0
      track_ids.each do |id|
        track = Track.find_or_create_by(spotify_id: id)
        Like.create(profile_id: self.id, track_id: track.id, category: 'track', spotify_id: track.spotify_id)
      end
    end
    self.save
  end

  def get_rec(token)
    track_ids = ''
    artist_ids = ''
    tracks = self.likes.select {|like| like.category === 'track'}
    artists = self.likes.select {|like| like.category === 'artist'}
    if self.likes.count > 5
      tracks = tracks.last(2)
      artists = artists.last(2)
    end
    if tracks.length > 0
      track_ids = tracks.map {|track| track.spotify_id}.join('%20')
    end
    if artists.length > 0
      artist_ids = artists.map {|artist| artist.spotify_id}.join('%20')
    end
    resp = fetch_recommend(token, track_ids, artist_ids)
    tracks = JSON.parse(resp.body)['tracks']
    return tracks
  end

  #return liked tracks when users access profile
  def get_like(token)
    binding.pry
    tracks = self.likes.select {|like| like.category == 'track'}
    if tracks.length > 0 && tracks.length <= 50
      track_ids = tracks.map {|track| track.spotify_id}.join(',')
    elsif tracks.length > 50
      track_ids = tracks.last(50).map {|track| track.spotify_id}.join(',')
    else
      track_ids = ''
    end
    spotify_data = JSON.parse(fetch_tracks(token, track_ids))['tracks']
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
