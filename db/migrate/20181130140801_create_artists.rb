class CreateArtists < ActiveRecord::Migration[5.2]
  def change
    create_table :artists do |t|
      t.string :spotify_id
      t.string :name
      t.string :spotify_url
      t.string :genres
      t.string :popularity
      
      t.timestamps
    end
  end
end
