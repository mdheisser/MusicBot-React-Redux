class AddFeaturesToArtists < ActiveRecord::Migration[5.2]
  def change
    add_column :tracks, :genres, :string
    add_column :artists, :genres, :string
    add_column :artists, :popularity, :string
  end
end
