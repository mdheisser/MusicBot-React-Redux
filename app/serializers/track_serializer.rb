class TrackSerializer < ActiveModel::Serializer
  attributes :id, :name, :spotify_url, :spotify_id
end
