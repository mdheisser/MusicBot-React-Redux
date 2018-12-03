class ApplicationController < ActionController::API

  private

  def get_token
    resp = Faraday.post('https://accounts.spotify.com/api/token') do |req|
      req.headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': ENV['SPOTIFY_AUTHORIZATION']
        }
      req.body = {
        'grant_type': 'client_credentials'
      }
    end
    @token = 'Bearer ' + JSON.parse(resp.body)['access_token']
  end
end
