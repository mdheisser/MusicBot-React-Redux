class CreateTracks < ActiveRecord::Migration[5.2]
  def change
    create_table :tracks do |t|
      t.string :spotify_id
      t.string :name
      t.string :genres
      t.string :spotify_url
      t.string :artists
      t.timestamps
    end
  end
end
