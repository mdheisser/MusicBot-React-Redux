class AddNameToArtists < ActiveRecord::Migration[5.2]
  def change
    add_column :artists, :name, :string
    add_column :artists, :liked, :boolean
    add_column :tracks, :liked, :boolean
  end
end
