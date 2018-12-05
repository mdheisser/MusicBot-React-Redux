class AddNameToArtists < ActiveRecord::Migration[5.2]
  def change
    add_column :artists, :name, :string
  end
end
