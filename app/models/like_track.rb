class LikeTrack < ApplicationRecord
  belongs_to :profile
  belongs_to :track
end
