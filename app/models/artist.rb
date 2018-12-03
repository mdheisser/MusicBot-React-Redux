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
  def get_related(token)
    resp = Faraday.get(
      "https://api.spotify.com/v1/artists/#{self.spotify_id}/related-artists") do |req|
        req.headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token
        }
    end
    body = JSON.parse(resp.body)
    artists = []
    body['artists'][0 ... 2].each do |artist|
      info = {
       image: artist['images'][-1],
       name: artist['name'],
       url: artist['external_urls']['spotify']
      }
      artists.push(info)
    end
    return artists
  end
end
