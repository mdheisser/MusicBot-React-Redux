class ProfileController < ApplicationController
  before_action :get_token, only: :recommend
  before_action :get_profile, only: [:recommend, :save, :like, :sign_in]

  #when get song is clicked, create profile in db
  def create
    @profile = Profile.create
    artist_ids = params[:artists].split('%20')
    track_ids = params[:tracks].split('%20')
    @profile.save_tracks_and_artists(artist_ids, track_ids)
    render json: @profile
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

  #save liked tracks to db
  def like
    track = Track.find_by(spotify_id: params[:spotifyID])
    if track
      like = LikeTrack.create(
        profile_id: @profile.id,
        track_id: track.id
      )
    end
    render plain: 'OK'
  end

  #render liked tracks when users access profile
  def sign_in
    @profile.name = params[:name]
    @profile.email = params[:email]
    @profile.save
    render json: @profile.tracks
  end

  private

  def get_profile
    @profile = Profile.find_by(id: params[:profile_id])
  end

end
