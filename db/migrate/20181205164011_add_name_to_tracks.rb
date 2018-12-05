class AddNameToTracks < ActiveRecord::Migration[5.2]
  def change
    add_column :tracks, :name, :string
  end
end
