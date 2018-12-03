class Profile < ApplicationRecord
  has_and_belongs_to_many :tracks
  has_and_belongs_to_many :artists

  #associate tracks and artists with profile after user input
  def save_tracks_and_artists(artist_ids, track_ids)
    if artist_ids.length > 0
      artist_ids.each do |id|
        artist = Artist.find_or_create_by(spotify_id: id)
        self.artists << artist
      end
    end
    if track_ids.length > 0
      track_ids.each do |id|
        track = Track.find_or_create_by(spotify_id: id)
        self.tracks << track
      end
    end
    self.save
  end

  def calc_features
    features = {danceability: 0, acoustic: 0, energy: 0, valence: 0}
    if @profile.tracks
      @profile.tracks.each do |track|
        track.get_features(@token)
      end
      features.keys.each do |feature|
        tracks.each do |track|
          features[feature] += track.read_attribute(feature)
        end
      end
    else
      @profile.artists.each do |artist|
        track_ids = artist.get_top_tracks
        track_ids.each do |id|
          track = Track.find_or_create_by(spotify_id: id)
        end
      end
    end
  end

  def get_genres
    genres = ''
    self.tracks.each do |track|
      genres += track.genres
    end
    return genres
  end

  def get_artists(token)
    rel_artists = []
    if self.artists
      self.artists.each do |artist|
        info = artist.get_related(token)
        rel_artists += info
      end
    else
      self.tracks.each do |track|
        info = track.get_artists(token)
        rel_artists += info
      end
    end
    return rel_artists
  end
end
