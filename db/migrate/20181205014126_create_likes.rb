class CreateLikes < ActiveRecord::Migration[5.2]
  def change
    create_table :likes do |t|
      t.string :category
      t.integer :profile_id
      t.integer :artist_id
      t.integer :track_id
      t.string :spotify_id

      t.timestamps
    end
  end
end
