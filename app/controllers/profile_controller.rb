class ProfileController < ApplicationController
  before_action :get_token, only: [:get_artists, :get_genres, :get_tracks, :get_features]

  #when get profile is clicked, create profile in db
  def create
    @profile = Profile.create
    artist_ids = params[:artists].split('%20')
    track_ids = params[:tracks].split('%20')
    @profile.save_tracks_and_artists(artist_ids, track_ids)
    render json: @profile
  end

  #return profile's fav genres
  def get_genres
    @profile = Profile.find_by(id: params[:id])
    render json: { result: @profile.get_genres }
  end

  def get_artists
    @profile = Profile.find_by(id: params[:id])
    @profile.get_artists(@token)
    render json: artists
  end

  def get_tracks
  end

  def get_features
    @profile = Profile.find_by(id: params[:id])
    features = {danceability: 0, acoustic: 0, energy: 0, valence: 0}
  end

end
