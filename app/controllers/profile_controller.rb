class ProfileController < ApplicationController
  before_action :get_token, only: [:recommend]

  #when get profile is clicked, create profile in db
  def create
    @profile = Profile.create
    artist_ids = params[:artists].split('%20')
    track_ids = params[:tracks].split('%20')
    @profile.save_tracks_and_artists(artist_ids, track_ids)
    render json: @profile
  end

  def recommend
    @profile = Profile.find_by(id: params[:id])
    track = @profile.get_rec(@token)
    render json: track
  end

end
