class CreateJoinTableProfilesTracks < ActiveRecord::Migration[5.2]
  def change
    create_join_table :profiles, :tracks do |t|
      # t.index [:profile_id, :track_id]
      # t.index [:track_id, :profile_id]
    end
  end
end
