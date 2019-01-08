class CreateLikeArtists < ActiveRecord::Migration[5.2]
  def change
    create_table :like_artists do |t|
      t.integer :artist_id
      t.integer :profile_id

      t.timestamps
    end
  end
end
