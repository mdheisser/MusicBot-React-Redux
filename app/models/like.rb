class Like < ApplicationRecord
  belongs_to :profile
  belongs_to :track
  belongs_to :artist
end
