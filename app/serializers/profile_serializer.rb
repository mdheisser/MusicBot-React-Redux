class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :spotify_id
  has_many :tracks
end
