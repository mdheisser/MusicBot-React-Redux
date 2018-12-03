class CreateJoinTableArtistsProfiles < ActiveRecord::Migration[5.2]
  def change
    create_join_table :artists, :profiles do |t|
      # t.index [:artist_id, :profile_id]
      # t.index [:profile_id, :artist_id]
    end
  end
end
