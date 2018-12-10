class ProfileController < ApplicationController
  before_action :get_token, only: [:recommend]
  before_action :get_profile, only: [:recommend, :save, :like]

  #when get profile is clicked, create profile in db
  def create
    @profile = Profile.create
    artist_ids = params[:artists].split('%20')
    track_ids = params[:tracks].split('%20')
    @profile.save_tracks_and_artists(artist_ids, track_ids)
    render json: @profile
  end

  #render json object of entire spotify response
  #save recommended track to db and associate with profile
  def recommend
    tracks = @profile.get_rec(@token)
    tracks.each do |track|
      t = Track.find_or_create_by(spotify_id: track['id'])
      @profile.tracks << t
    end
    binding.pry
    render json: tracks
  end

  #create a like object that associates with the track and profile
  def like
    like = Like.create(
      spotify_id: params[:spotifyID],
      profile_id: @profile.id,
      category: 'track',
    )
    likes = @profile.likes.map {|like| {type: like.category, id: like.spotify_id}}
    render json: likes
  end

  private

  def get_profile
    @profile = Profile.find_by(id: params[:profile_id])
  end

end
