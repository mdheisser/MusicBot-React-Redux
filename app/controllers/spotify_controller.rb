require 'base64'

class SpotifyController < ApplicationController
  def token
    resp = Faraday.post('https://accounts.spotify.com/api/token') do |req|
      req.headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic MTUzZTdiNzkzMjJiNGU3ODllZGE5YjdjMmIzZmYzMmM6MTgzZjczNjBkZDljNDU2N2I0MmY2ODQ0N2Q3YTEwN2Q='
        }
      req.body = {
        'grant_type': 'client_credentials'
      }
    end
    binding.pry
    if resp.success?
      @result = JSON.parse(resp.body)
      render json: @result
    else
      @result = resp['meta']['errorDetail']
      render json: @result
    end

  end
end
