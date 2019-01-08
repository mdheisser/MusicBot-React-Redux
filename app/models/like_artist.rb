class LikeArtist < ApplicationRecord
  belongs_to :artist
  belongs_to :profile
end
