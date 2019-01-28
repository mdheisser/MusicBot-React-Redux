class ProfileController < ApplicationController
  before_action :get_token, only: :recommend
  before_action :get_profile, only: [:recommend, :save, :like, :update_like]

  #when get song is clicked, create profile in db
  def create
    @profile = Profile.create
    save_likes
    render json: @profile
  end

  # GET profile by email
  def show_profile
    @profile = Profile.find_by(email: params[:email])
    if @profile
      render json: @profile
    else
      render status: 404
    end
  end

  #render json object of entire spotify response
  #save recommended tracks to db and associate with profile
  #renders spotify recommendation to Profile component
  def recommend
    tracks = @profile.get_rec(@token)
    tracks.each do |track|
      t = Track.find_or_create_by(spotify_id: track['id'])
      t.name = track['name']
      t.spotify_url = track['external_urls']['spotify']
      t.save
    end
    render json: tracks
  end

  #create track in db after search and associate track like to profile
  def like
    track = Track.find_by(spotify_id: params[:spotifyID])
    if track
      like = LikeTrack.create(
        profile_id: @profile.id,
        track_id: track.id
      )
      render json: {tracks: @profile.tracks, artists: @profile.artists}
    else
      render status: 404
    end
  end

  # add like to profile after user is signed in
  def update_like
    save_likes
    render json: @profile
  end

  #render liked tracks when users access profile
  def sign_in
    @profile = Profile.find_by(email: params[:email])
    if !@profile
      get_profile
      @profile.name = params[:name]
      @profile.email = params[:email]
      @profile.save
    end
    render json: @profile
  end

  private

  def get_profile
    @profile = Profile.find_by(id: params[:profile_id])
  end

  def save_likes
    artist_ids = params[:artists].split('%20')
    track_ids = params[:tracks].split('%20')
    @profile.save_tracks_and_artists(artist_ids, track_ids)
  end

end
