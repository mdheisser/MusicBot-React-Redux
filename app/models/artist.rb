class Artist < ApplicationRecord
  has_and_belongs_to_many :profiles
  validates :spotify_id, uniqueness: true

  def get_top_tracks(token)
    resp = Faraday.get(
      "https://api.spotify.com/v1/artists/#{self.spotify_id}/top-tracks") do |req|
        req.headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token
        }
    end
    body = JSON.parse(resp.body)
    toptrackIDs = body.tracks.map {|track| track.id}
    return toptrackIDs
  end

  #return related artists
  def get_detail(token)
    resp = Faraday.get(
      "https://api.spotify.com/v1/artists/#{self.spotify_id}") do |req|
        req.headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token
        }
    end
    body = JSON.parse(resp.body)
    self.name = body['name']
    self.popularity = body['popularity']
    self.image_url = body['images'][0]['url']
    return self
  end
end
