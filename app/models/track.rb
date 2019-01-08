class Track < ApplicationRecord
  has_many :like_tracks
  has_many :profiles, through: :like_tracks
  validates :spotify_id, uniqueness: true

  def get_features(token)
    resp = Faraday.get(
      "https://api.spotify.com/v1/audio-features/#{self.spotify_id}") do |req|
        req.headers = headers(token)
    end
    feature_names = ['danceability', 'acoustic', 'energy', 'valence']
    body = JSON.parse(resp.body)
    feature_names.each do |feature|
      self.send("#{feature}=", body[feature])
    end
    self.genres = body.genres.join(', ')
    self.save
  end

  #get profile artists if no user input of artists
  def get_artsits(token)
    resp = Faraday.get("https://api.spotify.com/v1/tracks/#{self.spotify_id}") do |req|
      req.headers = headers(token)
    end
    ids = JSON.parse(resp.body)['artists'].map {|artist| artist['id']}
    artists = []
    ids.each do |artist_id|
      artist = Artist.find_or_create_by(spotify_id: artist_id)
      artists += artist.get_related(token)
    end
    return artists
  end

  private

  def headers(token)
    {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': token
    }
  end

end
