class AddFeaturesToTracks < ActiveRecord::Migration[5.2]
  def change
    add_column :tracks, :danceability, :float
    add_column :tracks, :acoustic, :float
    add_column :tracks, :energy, :float
    add_column :tracks, :valence, :float
  end
end
