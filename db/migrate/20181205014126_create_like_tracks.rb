class CreateLikeTracks < ActiveRecord::Migration[5.2]
  def change
    create_table :like_tracks do |t|
      t.integer :profile_id
      t.integer :track_id

      t.timestamps
    end
  end
end
